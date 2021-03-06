import { Box, Typography } from "@mui/material"
import SubTask from "./SubTask"
import { Task } from "../../types/types"
import {getTimeString} from "../../common/datetime"

type Props = {
  task?: Task
}

const DailyTaskSalesData = (props: Props) => {
  const { task } = props
  return <Box sx={{ padding: 1, paddingRight: 3, borderLeft: "3px solid darkgray" }}>
    <Typography variant="body1"><b>販売数データ</b></Typography>
    {task
      ? <Box sx={{ marginLeft: 3 }}>
        <SubTask name={"データの取得"} status={task.subTasks["downloadSalesData"].status} />
        <SubTask name={"データの処理"} status={task.subTasks["processSalesData"].status} />
        <SubTask name={"データの書込"} status={task.subTasks["writeSalesDataToGoogleSpreadsheets"].status} />
      </Box>
      : <Box ml={3}>まだ実行されていません</Box>
    }
    {task && task.startedAt && task.endedAt &&
      <Box sx={{textAlign: "right"}}>
        <Typography variant={"caption"} sx={{color: "darkgray"}}>
          実行時刻: {getTimeString(task.startedAt)} - {getTimeString(task.endedAt)}
        </Typography>
      </Box>
    }
  </Box>
}

export default DailyTaskSalesData