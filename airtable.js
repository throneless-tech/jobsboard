const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');
const path = require('path');
const Airtable = require('airtable');
const hash = require('object-hash');

dotenv.config();

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const allRecords = [];

const checkStatus = (record) => {
  const status = record.get("Status");
  return status == "Ready to publish";
};

const createPost = async (job) => {
  const timeOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();

  let postingDate, closingDate;

  if (job.postingDate) {
    const date = Date.parse(job.postingDate);
    postingDate = new Date(date).toLocaleDateString("en-US", timeOptions);
  } else {
    postingDate = new Date().toLocaleDateString("en-US", timeOptions);
  }

  if (job.closingDate) {
    const date = Date.parse(job.closingDate);
    closingDate = new Date(date).toLocaleDateString("en-US", timeOptions);
  } else {
    closingDate = '-';
  }

  let benefits = [];

  job.benefits.forEach(benefit => {
    benefits.push(`"${benefit}"`);
  });

  let types = [];

  job.type.forEach(jobType => {
    types.push(`"${jobType}"`);
  });

  const locations = job.location.join(', ');

  const content = `+++\nauthor = "None"\ntitle = "${job.title}"\norganization = "${job.organization}"\nlocation = "${locations}"\nlink = "${job.link}"\ncreated_at = "${postingDate}"\nclosing_date = "${closingDate}"\na_job_type = [${types}]\nb_benefits = [${benefits}]\nc_feedback = "${job.rating}"\nthumbnail = "${job.logo ? `../../${job.logo}` : ""}"\n+++\n${job.description}`

  const basename = path.basename(`${job.organization.replace(/\s/g, '-')}_${job.title.replace(/\s/g, '-')}.md`);
  const contentPath = path.join('content/post', basename);

  await fs.writeFile(contentPath, content, err => {if (err) throw err});
};

const downloadToBuffer = async (url) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    https.get(url, (response) => {
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', (reason) => reject(reason));
    });
  });
};

const findImageInfo = (record) => {
  const attachments = record.get("Logo") || [];
  return attachments.find(({ type }) => type && type.startsWith("image/"));
};

const sanitizeForFilename = (str) => {
  return str && (str
    .normalize('NFD') // Normalize to normalized functional decomposition, ensuring each diacritic is a separate character code.
    .replace(/[\u0300-\u036f]/g, '') // Then replace any combining diacritical marks with nothing. https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
    .replace(/\p{P}/gu, '') // Remove any punctuation
    .replace(/\s+/g, '-') // Replace any whitespace with dashes.
  );
}

/**
 * @param {*} prefix The directory prefix for the file
 * @param {*} extension The file extension
 * @param {*} readableComponents String components to be sanitized and included in the file name.
 * @param {*} content Content, to be hashed.  8 characters of the hex-encoded hash will become an additional readable component.
 */
const escapeFileName = (prefix, extension, readableComponents, content) => {
  extension = extension.replace(/^\.+/, '');
  const hashText = hash.sha1(content).slice(0, 8);
  const components = [...readableComponents, hashText];
  const baseName = components.map(sanitizeForFilename).filter(x => x).join('_');
  return path.join(prefix, `${baseName}.${extension}`);
};


const extractJob = async (record) => {
  const title = record.get('Job Title') || '';
  const organization = record.get('Organization') || '';
  const description = record.get('Description') || '';
  let link = record.get('Link') || '';
  link = (!link || isValidURL(link)) ? link : `https://${link}`;
  const location = record.get('Location') || '';
  const type = record.get('Job Type') || [];
  const benefits = record.get('Benefits') || [];
  const rating = record.get('Rating') || '';
  const postingDate = record.get('Posting Date');
  const closingDate = record.get('Closing Date');
  const logo = await extractLogo(record);

  return {
    title,
    organization,
    description,
    logo,
    link,
    location,
    type,
    benefits,
    rating,
    postingDate,
    closingDate,
  };
}

const extractLogo = async (record) => {
  const logo = findImageInfo(record);
  if (logo) {
    const bytes = await downloadToBuffer(logo.url);
    const ext = path.extname(logo.filename) || logo.type.replace(/^image\//, '').replace(/;.*/, '');
    const basename = path.basename(logo.filename, ext);
    const logoPath = escapeFileName('images', ext, [basename], bytes);
    const staticPath = path.join('static', logoPath);
    await fs.writeFile(staticPath, bytes, (err) => { if (err) throw err;});
    return logoPath;
  } else {
    return undefined;
  }
};

const isValidURL = string => {
    var res = string.match(/(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

(async () => {
  console.log('Initiating...');
  base('Submitted Jobs')
    .select()
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(async (record) => {
        const publishable = checkStatus(record);
        if (publishable) {
          console.log(`Found publishable record ${record.id}`);
          allRecords.push(record);
          let job = await extractJob(record);
          let post = await createPost(job);
          base('Submitted Jobs').update(record.id, {
            "Status": "Published",
          }, function(err, record) {
            if (err) {
              console.error(err);
              return;
            }
          })
        }
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, function done(err) {
      if (err) {console.error(err);}
      console.log('Process complete.');
      if (allRecords.length) {
        // allRecords.forEach(record => {
        //   base('Submitted Jobs').update(record.id, {
        //     "Status": "In progress",
        //   }, function(err, record) {
        //     if (err) {
        //       console.error(err);
        //       return;
        //     }
        //   })
        // })
      }
    });
})()
