import React from "react"
import { Box, Typography } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { useTheme } from "@mui/material/styles"

type Props = {
  taskName: string,
  executionStatus: "succeeded" | "failed" | "executing" | "waiting",
}

const TaskExecutionLogEntry: React.FC<Props> = (props) => {
  const theme = useTheme()

  return <Box sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}>
    <Box>
      <Typography variant="h6">{props.taskName}</Typography>
    </Box>
    <Box sx={{
      width: 100,
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {props.executionStatus === "succeeded" && <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#2e7d32", color: "white", p: 1, borderRadius: 3, width: 70, justifyContent: "center"}}><Typography>完了</Typography></Box>}
      {props.executionStatus === "executing" && <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#0288d1", color: "white", p: 1, borderRadius: 3, width: 70, justifyContent: "center"}}><Typography>実行中</Typography></Box>}
      {props.executionStatus === "waiting" && <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "darkgray", color: "white", p: 1, borderRadius: 3, width: 70, justifyContent: "center"}}><Typography>待機中</Typography></Box>}
    </Box>
  </Box>
}

export default TaskExecutionLogEntry