import { VercelRequest, VercelResponse } from '@vercel/node';
import { processRecords } from './_writeToDatabase';
import type { Readable } from 'node:stream';

//const writeToDatabase = require("./_writeToDatabase.ts");
async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function (req: VercelRequest, res: VercelResponse) { 
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const body = buf.toString('utf8');
    console.log(body);
    processRecords(body);
    return res.json({ message: "POST: Success" });
  } else {
    return res.json({ message: "GET method not supported!" });
  }
}
