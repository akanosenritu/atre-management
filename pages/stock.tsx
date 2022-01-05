import {NextPage} from "next"
import Layout from "../components/Layout"
import {StockPage} from "../components/pages/stock"

const Page: NextPage = () => {
  return <Layout>
    <StockPage />
  </Layout>
}

export default Page