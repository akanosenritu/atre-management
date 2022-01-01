import { Box, Typography } from "@mui/material"
import SubTask from "./SubTask"
import { LogFileObject } from "../../types/types"

type Props = {
  logFileObject: LogFileObject | null
}

const DailyTaskIncomeData = (props: Props) => {
  const { logFileObject } = props
  return <Box sx={{ border: "1px solid black", borderRadius: 5, padding: 1, width: "48%" }}>
    <Typography variant="body1">売上情報</Typography>
    {logFileObject
      ? <Box sx={{ marginLeft: 3 }}>
          <SubTask name={"データの取得"} status={logFileObject.task.subTasks["downloadIncomeData"].status} />
          <SubTask name={"データの処理"} status={logFileObject.task.subTasks["processIncomeData"].status} />
          <SubTask name={"データの書込"} status={logFileObject.task.subTasks["writeIncomeDataToGoogleSpreadsheets"].status} />
      </Box>
      : <Box ml={3}>まだ実行されていません</Box>
    }
    
  </Box>
}

export default DailyTaskIncomeData