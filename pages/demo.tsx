import type { NextPage } from 'next'
import Layout from "../components/Layout"
import DailyTaskWithDummyData from '../components/DailyTask/DailyTaskWithDummyData'

const Demo: NextPage = () => {
  const dayStrings = [
    "2021-12-11",
    "2021-12-12",
    "2021-12-13",
    "2021-12-14",
    "2021-12-15",
    "2021-12-16",
    "2021-12-17",
    "2021-12-18",
    "2021-12-19",
    "2021-12-20",
    "2021-12-21",
    "2021-12-22",
    "2021-12-23",
    "2021-12-24",
    "2021-12-25",
  ]
  return <Layout>
    {dayStrings.map(dayString => <DailyTaskWithDummyData key={dayString} dayString={dayString}/>)}
  </Layout>
}

export default Demo
