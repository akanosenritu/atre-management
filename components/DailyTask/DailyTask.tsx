import { useState, useEffect } from "react"
import { Box, Button, Typography } from "@mui/material"
import SubTask from './SubTask'
import { LogFileObject } from "../../types/types"

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
  const [incomeDataLogFile, setIncomeDataLogFile] = useState<LogFileObject|null>(null)
  useEffect(() => {
    fetch(`https://atre.blob.core.windows.net/logs/${getIncomeDataLogFileName(props.dayString)}`)
      .then(res => res.json())
      .then(data => setIncomeDataLogFile(data))
  }, [])
  const [salesDataLogFile, setSalesDataLogFile] = useState<LogFileObject|null>(null)
  useEffect(() => {
    fetch(`https://atre.blob.core.windows.net/logs/${getSalesDataLogFileName(props.dayString)}`)
      .then(res => res.json())
      .then(data => setSalesDataLogFile(data))
  })

  return <Box sx={{ margin: 2, marginTop: 5 }}>
    <Typography variant="h5" sx={{ borderBottom: "1px solid black" }}>
      {props.dayString} のタスクの実行状況
    </Typography>
    <Box sx={{display: "flex", justifyContent: "space-between", m: 2, alignItems: "center"}}>
      <Box>
        実行予定時刻: 
      </Box>
      <Box>
        <Button variant="outlined" color="primary">手動で実行する</Button>
      </Box>
    </Box>
    <Box sx={{display: "flex", justifyContent: "space-between"}}>
      <Box sx={{ border: "1px solid black", borderRadius: 5, padding: 1, width: "48%"}}>
        <Typography variant="body1">商品別販売数</Typography>
        <Box sx={{marginLeft: 3}}>
          <SubTask name={"データの取得"} status={"done"}/>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>データの処理</Box>
            <Box><Typography variant="body2">完了</Typography></Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>データの書き込み</Box>
            <Box><Typography variant="body2">完了</Typography></Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ border: "1px solid black", borderRadius: 5, padding: 1, width: "48%" }}>
        <Typography variant="body1">売上金</Typography>
      </Box>
    </Box>
  </Box >
}

export default DailyTask