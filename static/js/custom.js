import dotenv from 'dotenv';
import * as fs from 'fs';
import https from 'https';
import path from 'path';
import Airtable from 'airtable';
import hash from 'object-hash';

dotenv.config();

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const jobs = [];

const checkStatus = (record) => {
  const status = record.get("Status");
  return status == "Ready to publish";
};

const createPosts = (jobs) => {
  console.log('creating...');
  return jobs.forEach(job => {
    const content = ```
        +++
        author = "None"
        title = ${job.title}
        organization = ${job.organization}
        location = ${job.location}
        link = ${job.link}
        date = ${ new Date()}
        categories = ${job.type}
        tags = ${job.benefits}
        series = ${job.rating}
        thumbnail = ${job.logo}
        +++
        ${job.description}
      ```
    fs.writeFile(`${job.organization}-${job.title}.md`, content, err => {if (err) throw err})
  })
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
  const type = record.get('Job Type') || '';
  const benefits = record.get('Benefits') || [];
  const rating = record.get('Rating') || '';
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
    rating
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
        await new Promise((resolve, reject) => fs.writeFile(staticPath, bytes, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve()
            };
        }));
        return logoPath;
    } else {
        return undefined;
    }
};

const isValidURL = string => {
    var res = string.match(/(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

base('Submitted Jobs').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(async function(record) {
      const publishable = checkStatus(record);
      if (publishable) {
        let job = await extractJob(record);
        job && jobs.push(job);
        base('Submitted Jobs').update(record.id, {
          "Status": "In progress",
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
    if (err) { console.error(err); return; }
    console.log(jobs);
    createPosts(jobs);
  })
