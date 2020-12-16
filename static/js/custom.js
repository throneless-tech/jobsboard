import dotenv from 'dotenv';
import Airtable from 'airtable';

dotenv.config();

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const jobs = [];

const checkStatus = (record) => {
  const status = record.get("Status");
  return status == "Ready to publish";
};

const findImageInfo = (record) => {
    const attachments = record.get("Logo") || [];
    return attachments.find(({ type }) => type && type.startsWith("image/"));
};

const extractJob = (record) => {
    const title = record.get('Job Title') || '';
    const organization = record.get('Organization') || '';
    const description = record.get('Description') || '';
    let link = record.get('Link') || '';
    link = (!link || isValidURL(link)) ? link : `https://${link}`;
    const location = record.get('Location') || '';
    const type = record.get('Job Type') || '';
    const benefits = record.get('Benefits') || [];
    const rating = record.get('Rating') || '';

    return {
      title,
      organization,
      description,
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
        const logoPath = escapeFileName('img', ext, [basename], bytes);
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

base('Submitted Jobs').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      const publishable = checkStatus(record);
      if (publishable) {
        let job = extractJob(record);
        job && jobs.push(job);
      }
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

  }, function done(err) {
    if (err) { console.error(err); return; }
    console.log(jobs);
  });
