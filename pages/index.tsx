import type { NextPage } from 'next'
import { Box, Typography } from "@mui/material"
import WarningIcon from "@mui/icons-material/Warning"
import Layout from "../components/Layout"
import TaskExecutionLogEntry from '../components/TaskExecutionLogEntry'

const Home: NextPage = () => {
  return <Layout>
    <Box id="status-box">
      <Box sx={{
        minHeight: 50,
        display: "flex",
        backgroundColor: "lightgray",
        borderRadius: 5,
        alignItems: "center",
        padding: 2
      }}>
        <Box sx={{
          width: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <WarningIcon color="warning" sx={{fontSize: 40}}/>
        </Box>
        <Box>
          未設定なデータが10件あります
        </Box>
      </Box>  
    </Box>
    <Box id="execution-status-2021-12-27" sx={{margin: 2, marginTop: 5}}>
      <Typography variant="h5" sx={{borderBottom: "1px solid black"}}>
        2021-12-27 のタスクの実行状況
      </Typography>
      <Box id="execution-status-detailed-2021-12-27" mt={2} ml={2}>
        <TaskExecutionLogEntry taskName="1. スマレジからの商品別売上数の取得" executionStatus="succeeded" />
        <TaskExecutionLogEntry taskName="2. スマレジからの日報の取得" executionStatus="executing" />
        <TaskExecutionLogEntry taskName="3. Google Spreadsheet への書き込み" executionStatus="waiting" />
      </Box>
    </Box>
  </Layout>
}

export default Home
