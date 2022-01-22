import {Box, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import Fuse from "fuse.js"

type Props = {
  searchBy: string,
  isJanCode: boolean,
  janCode?: string,
  products: Product[],
  stockData: StockDatum[],
}

type Product = {
  "商品ID": string,
  "商品名": string,
  "商品コード": string,
}

type StockDatum = {
  productId: string,
  stockAmount: string,
}

const convertStockData = (stockData: StockDatum[]) => {
  return Object.fromEntries(stockData.map(datum => [datum.productId, datum.stockAmount]))
}

export const DisplaySearchResultByItemName = (props: Props) => {
  const [fuse, setFuse] = useState<Fuse<Product>|null>(null)
  useEffect(() => {
    const options = {
      keys: ["商品名"],
      shouldSort: false,
      threshold: 0.5,
      useExtendedSearch: true,
    }
    const fuse = new Fuse(
      props.products.sort((a, b) => parseFloat(a["商品ID"]) > parseFloat(b["商品ID"])? 1: -1),
      options
    )
    setFuse(fuse)
  }, [props.products])

  const getDisplayedProducts = () => {
    if (!fuse) return []
    if (props.isJanCode) {
      const reg = new RegExp(props.searchBy)
      return props.products.filter(product => reg.test(product["商品コード"]))
    }
    return fuse.search(props.searchBy).map(result => result.item)
  }

  const displayed: Product[] = getDisplayedProducts()
  const stockDict = convertStockData(props.stockData)

  return <Box sx={{
    "&>div:nth-of-type(odd)": {
      backgroundColor: "#f2f2f2"
    }
  }}>
    {displayed.map(product => {
      return <Box key={product["商品ID"]} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Box>
          <Box><Typography variant={"caption"}>{product["商品ID"]} - {product["商品コード"]}</Typography></Box>
          <Box>{product["商品名"]}</Box>
        </Box>
        <Box sx={{width: 70, textAlign: "center"}}>
          {stockDict[product["商品ID"]] || "不明"}
        </Box>
      </Box>
    })}
  </Box>
}