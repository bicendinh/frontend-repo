import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    // Only allow POST requests
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // Clear the token from the HTTP-only cookie
    destroyCookie({ res }, "token", {
      path: "/",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    res.status(500).json({ error: "An error occurred during logout" });
  }
};

export default handler;
