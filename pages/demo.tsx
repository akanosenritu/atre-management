import type { NextPage } from 'next'
import { Box, Button, Typography } from "@mui/material"
import Layout from "../components/Layout"
import SubTask from '../components/DailyTask/SubTask'
import DailyTaskWithDummyData from '../components/DailyTask/DailyTaskWithDummyData'

const Demo: NextPage = () => {
  return <Layout>
    <DailyTaskWithDummyData dayString={"2021-12-11"}/>
  </Layout>
}

export default Demo
