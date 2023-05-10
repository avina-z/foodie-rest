import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'POST') {
    return res.json({ message: "POST: Hello World!" });
  } else {
    return res.json({ message: "GET: Hello World!" });
  }
}
