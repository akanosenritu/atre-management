import {NextApiRequest, NextApiResponse} from "next"
import httpProxyMiddleware from "next-http-proxy-middleware"
import * as https from "https"

const handler = (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  return httpProxyMiddleware(req, res, {
    target: "https://atre.azurewebsites.net",
    changeOrigin: true,
    headers: {
      "X-functions-key": process.env["Azure_functions_atre_functions_master_key"] || ""
    },
    pathRewrite: [{
      patternStr: "^/api/azure",
      replaceStr: "/api"
    }],
    agent: new https.Agent({
      rejectUnauthorized: false
    })
  })
}

export default handler