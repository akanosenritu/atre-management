import {Box} from "@mui/system"
import {SectionTitle} from "../ui/SectionTitle"
import {SectionDescription} from "../ui/SectionDescription"
import useSWR from "swr"
import {getTodayString} from "../../common/datetime"

const fetcher = (url: string) => fetch(url).then(res => res.json())

const createTodaysSalesDataFileUrl = () => `https://atre.blob.core.windows.net/sales-data/${getTodayString()}.json`

export const Converter = () => {
  const {data: autoDownloadedData} = useSWR(createTodaysSalesDataFileUrl(), fetcher)


  return <Box>
    <Box id={"useAutoDownloadedData"}>
      <SectionTitle>自動ダウンロードされたデータを使用する</SectionTitle>
      <SectionDescription>
        スマレジ上から自動的にダウンロードされたデータを使用します。データは10時から21時の間、1時間おきに自動的にダウンロードされ、クラウド上に保存されています。保存されているデータのうち、最新のデータが使用されます。<br />
      </SectionDescription>
      <Box sx={{display: "flex", justifyContent: "center", m: 1}}>

      </Box>
    </Box>
  </Box>
}