import { useState, useEffect, useCallback } from "react"
import { Box, Button, Typography } from "@mui/material"
import SubTask from './SubTask'
import DailyTaskIncomeData from "./DailyTaskIncomeData"
import { LogFileObject } from "../../types/types"
import { getTodayString } from "../../common/datetime"
import DailyTaskSalesData from "./DailyTaskSalesData"

type Props = {
  dayString: string,
}

const getIncomeDataLogFileName = (dummyDayString: string): string => {
  return `dailyTask_IncomeData_${getTodayString()}_withDummyData_${dummyDayString}.json`
}

const getSalesDataLogFileName = (dummyDayString: string): string => {
  return `dailyTask_SalesData_${getTodayString()}_withDummyData_${dummyDayString}.json`
}

const DailyTaskWithDummyData = (props: Props) => {
  const [incomeDataLogFile, setIncomeDataLogFile] = useState<LogFileObject | null>(null)
  const loadIncomeDataLogFile = () => {
    fetch(`https://atre.blob.core.windows.net/logs/${getIncomeDataLogFileName(props.dayString)}`)
      .then(res => res.json())
      .then(data => setIncomeDataLogFile(data))
      .catch(e => console.log(e))
  }
  useEffect(() => {
    loadIncomeDataLogFile()
  }, [])
  const [salesDataLogFile, setSalesDataLogFile] = useState<LogFileObject | null>(null)
  const loadSalesDataLogFile = async () => {
    const res = await fetch(`https://atre.blob.core.windows.net/logs/${getSalesDataLogFileName(props.dayString)}`)
    if (res.ok) {
      const data = await res.json()
      setSalesDataLogFile(data)
    }
  }
  useEffect(() => {
    loadSalesDataLogFile()
  }, [])

  return <Box sx={{ margin: 2, marginTop: 5 }}>
    <Typography variant="h5" sx={{ borderBottom: "1px solid black" }}>
      {props.dayString} のタスクの実行状況
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "space-between", m: 2, alignItems: "center" }}>
      <Box>
        実行予定時刻: 実行予定はありません。
      </Box>
      <Box>
        <Button variant="outlined" color="primary">手動で実行する</Button>
      </Box>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <DailyTaskSalesData logFileObject={salesDataLogFile} />
      <DailyTaskIncomeData logFileObject={incomeDataLogFile}/>
    </Box>
  </Box >
}

export default DailyTaskWithDummyData