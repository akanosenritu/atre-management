import { Box, Typography } from "@mui/material"
import SubTask from "./SubTask"
import { Task } from "../../types/types"

type Props = {
  task?: Task
}

const DailyTaskSalesData = (props: Props) => {
  const { task } = props
  return <Box sx={{ border: "1px solid black", borderRadius: 5, padding: 1, width: "48%" }}>
    <Typography variant="body1">商品別販売数</Typography>
    {task
      ? <Box sx={{ marginLeft: 3 }}>
        <SubTask name={"データの取得"} status={task.subTasks["downloadSalesData"].status} />
        <SubTask name={"データの処理"} status={task.subTasks["processSalesData"].status} />
        <SubTask name={"データの書込"} status={task.subTasks["writeSalesDataToGoogleSpreadsheets"].status} />
      </Box>
      : <Box ml={3}>まだ実行されていません</Box>
    }

  </Box>
}

export default DailyTaskSalesData