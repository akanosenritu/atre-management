import { Box, Typography } from "@mui/material"
import SubTask from "./SubTask"
import {Task} from "../../types/types"
import {getTimeString} from "../../common/datetime"
import { getColor } from "./common"

type Props = {
  task?: Task,
}

const DailyTaskIncomeData = (props: Props) => {
  const { task } = props
  return <Box sx={{ padding: 1, paddingRight: 3, borderLeft: `3px solid ${getColor(task ? task.status : "waiting")}` }}>
    <Typography variant="body1"><b>売上情報データ</b></Typography>
    {task
      ? <Box sx={{ marginLeft: 3 }}>
          <SubTask name={"取得"} status={task.subTasks["downloadIncomeData"].status} />
          <SubTask name={"処理"} status={task.subTasks["processIncomeData"].status} />
          <SubTask name={"書込"} status={task.subTasks["writeIncomeDataToGoogleSpreadsheets"].status} />
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

export default DailyTaskIncomeData