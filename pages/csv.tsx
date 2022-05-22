import {NextPage} from "next"
import {Typography} from "@mui/material"
import {useEffect, useState} from "react"
import Layout from "../components/Layout"
import {getTodayString} from "../common/datetime"

type Datum = {
  "返品数": string,
  "販売点数": string,
  "商品コード": string,
  "商品番号"?: string,
  "販売点数 (net)"?: string,
}
type LatestSalesDataInitial = {
  status: "initial"
}
type LatestSalesDataDownloading = {
  status: "downloading"
}
type LatestSalesDataRetrieved = {
  status: "retrieved",
  createdAt: string,
  data: Datum[]
}
type LatestSalesDataNoData = {
  status: "noData"
}
type LatestSalesDataRetrievalFailed = {
  status: "failed"
}
type LatestSalesData = LatestSalesDataDownloading | LatestSalesDataInitial | LatestSalesDataRetrieved | LatestSalesDataNoData | LatestSalesDataRetrievalFailed

const retrieveTodaysSalesData = async (): Promise<LatestSalesData> => {
  // get information of the latest data
  const todayString = getTodayString()
  const res = await fetch(`https://atre.blob.core.windows.net/sales-data/${todayString}.json`)
  if (!res.ok) {
    if (res.status === 400) return {status: "noData"}
    return {status: "failed"}
  }
  const data = await res.json()
  return {
    status: "retrieved",
    createdAt: data.createdAt,
    data: data.data
  }
}

const retrieveLatestSalesData = async (): Promise<LatestSalesData> => {
  const res = await fetch("/api/azure/downloadSalesData")
  if (!res.ok) {
    if (res.status === 400) return {status: "noData"}
    return {status: "failed"}
  }
  return {
    status: "retrieved",
    createdAt: new Date().toISOString(),
    data: (await res.json()).data
  }
}


const Page: NextPage = () => {
  const [autoDownloadedLatestSalesData, setAutoDownloadedLatestSalesData] = useState<LatestSalesData>({status: "initial"})
  const onClickCopyButton = () => {
    if (autoDownloadedLatestSalesData.status === "retrieved") {
      const salesData = autoDownloadedLatestSalesData.data.map(datum => datum["販売点数 (net)"])
      navigator.clipboard.writeText(salesData.join("\n"))
    }
  }

  // load the latest file from azure storage
  // only run it initially
  const onClickDownload = () => {
    setAutoDownloadedLatestSalesData({status: "downloading"})
    retrieveLatestSalesData()
      .then(result => setAutoDownloadedLatestSalesData(result))
  }

  return <Layout>
    <Typography variant={"h6"} sx={{borderBottom: "1px solid darkgray"}}>ダウンロードされたデータを使用する</Typography>
    <div style={{display: "flex", justifyContent: "center"}}>
      <button onClick={onClickDownload}>データをダウンロードする</button>
    </div>
    <div style={{display: "flex", margin: 5, justifyContent: "center"}}>
      <div>
        {autoDownloadedLatestSalesData.status === "initial" && "データがダウンロードされていません"}
        {autoDownloadedLatestSalesData.status === "downloading" && "データをダウンロード中です"}
        {autoDownloadedLatestSalesData.status === "noData" && "データが見つかりませんでした"}
        {autoDownloadedLatestSalesData.status === "retrieved" && `データの作成時刻: ${autoDownloadedLatestSalesData.createdAt}`}
        {autoDownloadedLatestSalesData.status === "failed" && "データのダウンロードに失敗しました"}
      </div>
    </div>
    <div style={{display: "flex", margin: 5}}>
      <div style={{width: "50%", textAlign: "center"}}>売上管理表用</div>
      <div style={{display: "flex", justifyContent: "space-around", width: "50%"}}>
        <button onClick={onClickCopyButton} disabled={!(autoDownloadedLatestSalesData.status==="retrieved")}>クリップボードにコピー</button>
      </div>
    </div>
    <div style={{width: "90%", margin: "auto", textAlign:"left", fontSize: 12}}>
      <ul>
        <li>
          クリップボードにコピーをクリックすると、販売点数の列だけがクリップボードにコピーされます。
          Excel上にそのまま貼り付けることができます。
        </li>
      </ul>
    </div>
  </Layout>
}

export default Page