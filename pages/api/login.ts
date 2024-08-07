import { auth } from "@/config/firebaseConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "nookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    // Set token in HTTP-only cookie
    setCookie({ res }, "token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export default handler;
