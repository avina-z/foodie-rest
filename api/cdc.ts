import { VercelRequest, VercelResponse } from '@vercel/node';
import { processRecords } from './_writeToDatabase';

//const writeToDatabase = require("./_writeToDatabase.ts");

export default (req: VercelRequest, res: VercelResponse) => {
  const { body } = req;
  console.log(body); 
  if (req.method === 'POST') {
    processRecords(body);
    return res.json({ message: "POST: Success" });
  } else {
    return res.json({ message: "GET method not supported!" });
  }
}
