import { Box, Typography } from "@mui/material"
import { getColor } from "./common"

type TaskStatus = "done" | "executing" | "failed" | "waiting" | "skipped" | "overwritten" | "noData"

type Props = {
  name: string,
  status: TaskStatus
}

const SubTask = (props: Props) => {
  const getStatusDisplayName = (status: TaskStatus): string => {
    switch (status) {
      case "done":
        return "完了"
      case "executing":
        return "実行中"
      case "failed":
        return "失敗"
      case "waiting":
        return "待機中"
      case "skipped":
        return "スキップ"
      case "overwritten":
        return "上書き"
      case "noData":
        return "データ無し"
      default:
        return "(設定無し)"
    }
  }
  return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Box>{props.name}</Box>
    <Box><Typography variant="body2" sx={{color: getColor(props.status)}}>{getStatusDisplayName(props.status)}</Typography></Box>
  </Box>
}

export default SubTask