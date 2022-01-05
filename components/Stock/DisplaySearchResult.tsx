import {Box, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import Fuse from "fuse.js"
import FuseResult = Fuse.FuseResult

type Props = {
  searchBy: string,
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

export const DisplaySearchResult = (props: Props) => {
  const [fuse, setFuse] = useState<Fuse<Product>|null>(null)
  useEffect(() => {
    const options = {
      keys: ["商品名", "商品コード"],
      shouldSort: false,
      threshold: 0.4
    }
    const fuse = new Fuse(props.products.sort((a, b) => parseFloat(a["商品ID"]) > parseFloat(b["商品ID"])? 1: -1), options)
    setFuse(fuse)
  }, [props.products])

  const displayed: FuseResult<Product>[] = fuse? fuse.search(props.searchBy): []
  const stockDict = convertStockData(props.stockData)

  return <Box sx={{
    "&>div:nth-of-type(odd)": {
      backgroundColor: "#f2f2f2"
    }
  }}>
    {displayed.map(product => {
      return <Box key={product.item["商品ID"]} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Box>
          <Box><Typography variant={"caption"}>{product.item["商品ID"]} - {product.item["商品コード"]}</Typography></Box>
          <Box>{product.item["商品名"]}</Box>
        </Box>
        <Box sx={{width: 70, textAlign: "center"}}>
          {stockDict[product.item["商品ID"]] || "不明"}
        </Box>
      </Box>
    })}
  </Box>
}