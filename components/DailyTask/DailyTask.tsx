import { Box, Button, Typography } from "@mui/material"
import useSWR from "swr"
import DailyTaskSalesData from "./DailyTaskSalesData"
import DailyTaskIncomeData from "./DailyTaskIncomeData"

type Props = {
  dayString: string,
}


const getIncomeDataLogFileName = (dayString: string): string => {
  return `dailyTask_IncomeData_${dayString}.json`
}
const getSalesDataLogFileName = (dayString: string): string => {
  return `dailyTask_SalesData_${dayString}.json`
}

const DailyTask = (props: Props) => {
  const [year, month, day] = props.dayString.split("-").map(e => parseFloat(e))
  const {data: salesData} = useSWR(getSalesDataLogFileName(props.dayString))
  const {data: incomeData} = useSWR(getIncomeDataLogFileName(props.dayString))

  return <Box sx={{ margin: 2, marginTop: 5 }}>
    <Typography variant="h5" sx={{ borderBottom: "1px solid black" }}>
      {year}年{month}月{day}日
    </Typography>
    <Box sx={{display: "flex", justifyContent: "space-between", m: 2, alignItems: "center"}}>
      <Box>
        実行予定時刻: {year}年{month}月{day}日21時5分
      </Box>
      <Box hidden={true}>
        <Button variant="outlined" color="primary">手動で実行する</Button>
      </Box>
    </Box>
    <Box sx={{display: "flex", justifyContent: "space-between"}}>
      <DailyTaskSalesData task={salesData?.task} />
      <DailyTaskIncomeData task={incomeData?.task} />
    </Box>
  </Box >
}

export default DailyTask