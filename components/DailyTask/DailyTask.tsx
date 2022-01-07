import {Box, Button, Grid, Typography} from "@mui/material"
import useSWR from "swr"
import DailyTaskSalesData from "./DailyTaskSalesData"
import DailyTaskIncomeData from "./DailyTaskIncomeData"
import {isPastDue} from "../../common/datetime"

type Props = {
  dayString: string,
}


const getIncomeDataLogFileName = (dayString: string): string => {
  return `dailyTask_IncomeData_${dayString}.json`
}
const getSalesDataLogFileName = (dayString: string): string => {
  return `dailyTask_SalesData_${dayString}.json`
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

const DailyTask = (props: Props) => {
  const [year, month, day] = props.dayString.split("-").map(e => parseFloat(e))
  const {data: salesData} = useSWR(
    isPastDue(props.dayString)
      ? "https://atre.blob.core.windows.net/logs/" + getSalesDataLogFileName(props.dayString)
      : null,
    fetcher)
  const {data: incomeData} = useSWR(
    isPastDue(props.dayString)
      ? "https://atre.blob.core.windows.net/logs/" + getIncomeDataLogFileName(props.dayString)
      : null,
    fetcher)

  return <Box sx={{ margin: 2, marginTop: 5 }}>
    <Typography variant="h5" sx={{ borderBottom: "1px solid black" }}>
      {year}年{month}月{day}日
    </Typography>
    <Box sx={{display: "flex", justifyContent: "space-between", m: 2, alignItems: "center"}}>
      <Box>
        実行予定時刻: {year}年{month}月{day}日21時4分
      </Box>
      <Box hidden={true}>
        <Button variant="outlined" color="primary">手動で実行する</Button>
      </Box>
    </Box>
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <DailyTaskSalesData task={salesData} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DailyTaskIncomeData task={incomeData} />
      </Grid>
    </Grid>
  </Box >
}

export default DailyTask