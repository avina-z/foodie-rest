import { VercelRequest, VercelResponse } from "@vercel/node";

const writeToDatabase = require("./_writeToDatabase.ts");

export default (req: VercelRequest, res: VercelResponse) => {
  const { body } = req;
  console.log(body); 
  if (req.method === 'POST') {
    writeToDatabase._writeToDatabase(body);
    return res.json({ message: "POST: Hello World!" });
  } else {
    return res.json({ message: "GET method not supported!" });
  }
}
