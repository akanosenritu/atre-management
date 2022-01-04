import { Box, Typography } from "@mui/material"
import SubTask from "./SubTask"
import {Task} from "../../types/types"

type Props = {
  task?: Task,
}

const DailyTaskIncomeData = (props: Props) => {
  const { task } = props
  return <Box sx={{ border: "1px solid black", borderRadius: 5, padding: 1, width: "48%" }}>
    <Typography variant="body1">売上情報</Typography>
    {task
      ? <Box sx={{ marginLeft: 3 }}>
          <SubTask name={"データの取得"} status={task.subTasks["downloadIncomeData"].status} />
          <SubTask name={"データの処理"} status={task.subTasks["processIncomeData"].status} />
          <SubTask name={"データの書込"} status={task.subTasks["writeIncomeDataToGoogleSpreadsheets"].status} />
      </Box>
      : <Box ml={3}>まだ実行されていません</Box>
    }
    
  </Box>
}

export default DailyTaskIncomeData