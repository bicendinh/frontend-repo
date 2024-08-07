import httpProxy from "http-proxy";
import Cookies from "cookies";
import url from "url";
import { NextApiRequest, NextApiResponse } from "next";

const NEXT_PUBLIC_API_BASE_URL: string | undefined =
  process.env.NEXT_PUBLIC_API_BASE_URL;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    const cookies = new Cookies(req, res);
    const authToken = cookies.get("token");

    req.headers.cookie = "";

    if (authToken) {
      req.headers["Authorization"] = `Bearer ${authToken}`;
    }

    proxy.once("error", reject);

    proxy.web(req, res, {
      target: NEXT_PUBLIC_API_BASE_URL,
      autoRewrite: false,
    });
  });
};

export default handler;
