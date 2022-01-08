import type {GetStaticProps, NextPage} from 'next'
import Layout from "../components/Layout"
import DailyTask from "../components/DailyTask/DailyTask"
import {AuthenticationRequired} from "../components/functional/AuthenticationRequired"

export const getStaticProps: GetStaticProps = () => {
  const dayStrings = [
    "2022-01-04",
    "2022-01-05",
    "2022-01-06",
    "2022-01-07",
    "2022-01-08",
    "2022-01-09",
    "2022-01-10",
    "2022-01-11",
    "2022-01-12",
    "2022-01-13",
    "2022-01-14",
    "2022-01-15",
    "2022-01-16",
    "2022-01-17",
    "2022-01-18"
  ]
  return {
    props: { dayStrings }
  }
}

type Props = {
  dayStrings: string[]
}

const Home: NextPage<Props> = (props: Props) => {
  return <Layout>
    <AuthenticationRequired>
      {props.dayStrings.map(dayString => (<DailyTask key={dayString} dayString={dayString} />))}
    </AuthenticationRequired>
  </Layout>
}

export default Home
