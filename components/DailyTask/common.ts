import { useTheme } from "@mui/material/styles"

type TaskStatus = "done" | "executing" | "failed" | "waiting" | "skipped" | "overwritten" | "noData"

export const getColor = (status: TaskStatus): string => {
  const theme = useTheme()
  switch (status) {
    case "done":
    case "overwritten":
      return theme.palette.success.main
    case "executing":
      return theme.palette.primary.main
    case "failed":
      return theme.palette.error.main
    case "waiting":
    case "skipped":
    case "noData":
      return "darkgray"
    default:
      return "black"
  }
}
