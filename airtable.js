const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const path = require("path");
const Airtable = require("airtable");
const hash = require("object-hash");

dotenv.config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const allRecords = [];

const checkStatus = (record) => {
  const status = record.get("Status");
  return status === "Ready to publish" || status === "Published";
};

const createPost = async (job) => {
  if (!job.title && !job.organization) {
    return false;
  }

  const timeOptions = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date();

  let postingDate, closingDate, sortDate;

  if (job.postingDate) {
    const date = Date.parse(job.postingDate);
    postingDate = new Date(date).toLocaleDateString("en-US", timeOptions);
    sortDate = job.postingDate;
  } else {
    console.log(today.getDate().length);
    postingDate = today.toLocaleDateString("en-US", timeOptions);
    sortDate = `${today.getFullYear()}-${
      today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
    }-${today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`}`;
  }

  if (job.closingDate) {
    const date = Date.parse(job.closingDate);
    closingDate = new Date(date).toLocaleDateString("en-US", timeOptions);
  } else {
    closingDate = "-";
  }

  let benefits = [];

  job.benefits.forEach((benefit) => {
    benefits.push(`"${benefit}"`);
  });

  let locations;

  if (job.location.length > 1) {
    locations = job.location.join(", ");
  } else {
    locations = job.location;
  }

  let types = [];

  job.type.forEach((jobType) => {
    types.push(`"${jobType}"`);
  });

  const content = `+++\nauthor = "None"\ntitle = "${
    job.title
  }"\norganization = "${
    job.organization
  }"\nlocation = "${locations}"\nsalary = "${job.salary}"\nlink = "${
    job.link
  }"\nsort_date = "${sortDate}"\ncreated_at = "${postingDate}"\nclosing_date = "${closingDate}"\na_job_type = [${types}]\nb_benefits = [${benefits}]\nc_feedback = "${
    job.rating
  }"\naa_degrees_required = "${job.degrees}"\nthumbnail = "${
    job.logo ? `../../${job.logo}` : ""
  }"\n+++\n${job.description}`;

  const basename = path.basename(
    `${job.organization.replace(/\s/g, "-")}_${job.title.replace(
      /\s/g,
      "-"
    )}.md`
  );
  const contentPath = path.join("content/post", basename);

  await fs.writeFile(contentPath, content, (err) => {
    if (err) throw err;
  });

  if (job.closingDate && new Date(job.closingDate) <= today) {
    return "Expired";
  } else if (!job.closingDate) {
    let expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() - 3);
    if (job.postingDate && new Date(job.postingDate) <= expirationDate) {
      return "Expired";
    } else {
      return "Published";
    }
  } else {
    return "Published";
  }
};

const downloadToBuffer = async (url) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    https.get(url, (response) => {
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", (reason) => reject(reason));
    });
  });
};

const findImageInfo = (record) => {
  const attachments = record.get("Logo") || [];
  return attachments.find(({ type }) => type && type.startsWith("image/"));
};

const sanitizeForFilename = (str) => {
  return (
    str &&
    str
      .normalize("NFD") // Normalize to normalized functional decomposition, ensuring each diacritic is a separate character code.
      .replace(/[\u0300-\u036f]/g, "") // Then replace any combining diacritical marks with nothing. https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
      .replace(/\p{P}/gu, "") // Remove any punctuation
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Failsafe for removing punctuation
      .replace(/\s{2,}/g, " ") // Remove extra spaces from weird punctuation
      .replace(/\s+/g, "-") // Replace any whitespace with dashes.
  );
};

/**
 * @param {*} prefix The directory prefix for the file
 * @param {*} extension The file extension
 * @param {*} readableComponents String components to be sanitized and included in the file name.
 * @param {*} content Content, to be hashed.  8 characters of the hex-encoded hash will become an additional readable component.
 */
const escapeFileName = (prefix, extension, readableComponents, content) => {
  extension = extension.replace(/^\.+/, "");
  const hashText = hash.sha1(content).slice(0, 8);
  const components = [...readableComponents, hashText];
  const baseName = components
    .map(sanitizeForFilename)
    .filter((x) => x)
    .join("_");
  return path.join(prefix, `${baseName}.${extension}`);
};

const extractJob = async (record) => {
  const title = record.get("Job Title") || "";
  const organization = record.get("Organization") || "";
  const description = record.get("Description") || "";
  let link = record.get("Link") || "";
  link = !link || isValidURL(link) ? link : `https://${link}`;
  const location = record.get("Location") || "";
  const type = record.get("Job Type") || [];
  const salary = record.get("Salary") || "";
  const benefits = record.get("Benefits") || [];
  const rating = record.get("Rating") || "";
  const postingDate = record.get("Posting Date");
  const closingDate = record.get("Closing Date");
  const degrees = record.get("Is a degree required?");
  const logo = await extractLogo(record);

  return {
    title,
    organization,
    description,
    logo,
    link,
    location,
    type,
    degrees,
    salary,
    benefits,
    rating,
    postingDate,
    closingDate,
  };
};

const extractLogo = async (record) => {
  const logo = findImageInfo(record);
  if (logo) {
    const bytes = await downloadToBuffer(logo.url);
    const ext =
      path.extname(logo.filename) ||
      logo.type.replace(/^image\//, "").replace(/;.*/, "");
    const basename = path.basename(logo.filename, ext);
    const logoPath = escapeFileName("images", ext, [basename], bytes);
    const staticPath = path.join("static", logoPath);
    await fs.writeFile(staticPath, bytes, (err) => {
      if (err) throw err;
    });
    return logoPath;
  } else {
    return undefined;
  }
};

const isValidURL = (string) => {
  var res = string.match(
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};

(async () => {
  console.log("Initiating...");
  base("Submitted Jobs")
    .select()
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(async (record) => {
          const publishable = checkStatus(record);
          if (publishable) {
            console.log(`Found publishable record ${record.id}`);
            allRecords.push(record);
            let job = await extractJob(record);
            let post = await createPost(job);

            if (!post) {
              console.log(`Found an empty row; not publishing.`);
              return false;
            } else {
              base("Submitted Jobs").update(
                record.id,
                {
                  Status: post,
                },
                function (err, record) {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );
            }
          }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
        }
        console.log("Process complete.");
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
      }
    );
})();
