import dotenv from 'dotenv';
import Airtable from 'airtable';

dotenv.config();

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

console.log('boop');
