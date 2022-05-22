import {NextApiRequest, NextApiResponse} from "next"
import fetch from "cross-fetch"

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const key = process.env["Azure_functions_atre2_functions_master_key"]
  const response1 = await fetch(`https://atre2.azurewebsites.net/api/downloadSalesData?code=${key}`)
  const response2 = await fetch("https://atre.azurewebsites.net/api/processSalesDataCSV", {
    method: "POST",
    body: JSON.stringify((await response1.json()).data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  res.status(200).json(await response2.json())
}

export default handler