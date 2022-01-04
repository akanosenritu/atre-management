import { Box, Button, Typography } from "@mui/material"
import useSWR from "swr"
import DailyTaskIncomeData from "./DailyTaskIncomeData"
import DailyTaskSalesData from "./DailyTaskSalesData"
import dummyData from "../../data/dummyData.json"
import {useEffect, useState} from "react"

type Props = {
  dayString: string,
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

const DailyTaskWithDummyData = (props: Props) => {
  const [urls, setUrls] = useState<{salesData?: string, incomeData?: string}>({})
  const { data: taskIncomeData } = useSWR(
    urls.incomeData,
    fetcher,
    {refreshInterval: 5000}
  )
  const { data: taskSalesData } = useSWR(
    urls.salesData,
    fetcher,
    {refreshInterval: 5000}
  )
  const [completedTasks, setCompletedTasks] = useState<any>({})
  const setCompletedTask = (taskName: string, completedTask: any) => {
    setCompletedTasks((old: any) => ({...old, [taskName]: completedTask}))
    setUrls(old => ({...old, [taskName]: undefined}))
  }
  useEffect(() => {
    if (taskSalesData?.runtimeStatus === "Completed") {
      setCompletedTask("salesData", taskSalesData.customStatus)
    }
    if (taskIncomeData?.runtimeStatus === "Completed") {
      setCompletedTask("incomeData", taskIncomeData.customStatus)
    }
  })
  const [isRunManuallyButtonAvailable, setIsRunManuallyButtonAvailable] = useState(true)
  const onClickRunManually = async () => {
    setIsRunManuallyButtonAvailable(false)
    if (props.dayString in dummyData) {
      // @ts-ignore
      const {salesData, incomeData} = dummyData[props.dayString]

      // dispatch request regarding to incomeData
      fetch(
      "https://atre.azurewebsites.net/api/orchestrators/DFOrchestratorIncomeData?code=JtxCJDTypZveKOfUFNkQ4Lu2eTKur4s8gyWTFISqVEWSDjmDasplbQ==", {
        method: "POST",
        body: JSON.stringify({
          dummyData: {
            dummyDayString: props.dayString,
            dummyIncomeData: {
              csvText: incomeData
            }
          }
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => data.statusQueryGetUri)
        .then(url => {
          setUrls(old => ({...old, incomeData: url}))
        })

      // dispatch request regarding to salesData
      fetch(
      "https://atre.azurewebsites.net/api/orchestrators/DFOrchestratorSalesData?code=JtxCJDTypZveKOfUFNkQ4Lu2eTKur4s8gyWTFISqVEWSDjmDasplbQ==", {
        method: "POST",
        body: JSON.stringify({
          dummyData: {
            dummyDayString: props.dayString,
            dummySalesData: {
              csvText: salesData
            }
          }
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => data.statusQueryGetUri)
        .then(url => setUrls(old => ({...old, salesData: url})))
    }
  }

  return <Box sx={{ margin: 2, marginTop: 5 }}>
    <Typography variant="h5" sx={{ borderBottom: "1px solid black" }}>
      {props.dayString} のタスクの実行状況
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "space-between", m: 2, alignItems: "center" }}>
      <Box>
        実行予定時刻: 実行予定はありません。
      </Box>
      <Box>
        <Button variant="outlined" color="primary" onClick={onClickRunManually} disabled={!isRunManuallyButtonAvailable}>
          {isRunManuallyButtonAvailable? "手動で実行する": "実行リクエストを送信済み"}
        </Button>
      </Box>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {completedTasks.salesData
        ? <DailyTaskSalesData task={completedTasks.salesData} />
        : <DailyTaskSalesData task={taskSalesData? taskSalesData.customStatus: undefined} /> }
      {completedTasks.incomeData
        ? <DailyTaskIncomeData task={completedTasks.incomeData} />
        : <DailyTaskIncomeData task={taskIncomeData? taskIncomeData.customStatus: undefined}/> }
    </Box>
  </Box >
}

export default DailyTaskWithDummyData