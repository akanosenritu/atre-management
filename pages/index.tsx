import type {NextPage} from 'next'
import Layout from "../components/Layout"

import {StockPage} from "../components/pages/stock"

const Home: NextPage = () => {
  return <Layout>
    <StockPage />
  </Layout>
}

export default Home
