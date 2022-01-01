import { Box, Typography } from "@mui/material"
import SubTask from "./SubTask"
import { LogFileObject } from "../../types/types"

type Props = {
  logFileObject: LogFileObject | null
}

const DailyTaskSalesData = (props: Props) => {
  const { logFileObject } = props
  return <Box sx={{ border: "1px solid black", borderRadius: 5, padding: 1, width: "48%" }}>
    <Typography variant="body1">商品別販売数</Typography>
    {logFileObject
      ? <Box sx={{ marginLeft: 3 }}>
        <SubTask name={"データの取得"} status={logFileObject.task.subTasks["downloadSalesData"].status} />
        <SubTask name={"データの処理"} status={logFileObject.task.subTasks["processSalesData"].status} />
        <SubTask name={"データの書込"} status={logFileObject.task.subTasks["writeSalesDataToGoogleSpreadsheets"].status} />
      </Box>
      : <Box ml={3}>まだ実行されていません</Box>
    }

  </Box>
}

export default DailyTaskSalesData