import {Box, Button, TextField, Typography} from "@mui/material"
import {useRef, useState, ChangeEvent} from "react"
import { useDebounce } from "use-debounce"
import Scanner from "../Stock/Scanner"
import useSWR from "swr"
import {DisplaySearchResultByItemName} from "../Stock/DisplaySearchResult"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const StockPage = () => {
  const {data: productsData} = useSWR("https://atre.blob.core.windows.net/products-data/productsData.json", fetcher)
  const {data: stockData} = useSWR("/api/azure/getStock", fetcher)

  const [inputText, setInputText] = useState("")
  const [isJanCode, setIsJanCode] = useState(false)
  const [searchBy] = useDebounce(inputText, 1000)

  const handleSearchByChange = (event: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    setInputText(event.target.value)
    setIsJanCode(/[0-9]+/.test(event.target.value))
  }
  const onClickClear = () => {
    setInputText("")
  }

  return <Box>
    <Typography variant={"h6"} sx={{ borderBottom: "1px solid darkgray" }}>在庫数を検索する</Typography>
    <Box sx={{
        m: 2,
        '& .MuiTextField-root': { mt: 1},
      }}>
        <TextField
          fullWidth={true}
          value={inputText}
          onChange={handleSearchByChange}
          placeholder={"商品名、JANコードを入力"}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-around",
        m: 1,
      }}>
        <Button color="secondary" variant="outlined" onClick={onClickClear}>クリア</Button>
      </Box>
      {!productsData && <Box sx={{display: "flex", justifyContent: "center"}}><Typography variant={"body1"}>商品データを読み込み中...</Typography></Box>}
      {!stockData && <Box sx={{display: "flex", justifyContent: "center"}}><Typography variant={"body1"}>在庫データを読み込み中...</Typography></Box>}
      {productsData && stockData && !inputText && <Box sx={{display: "flex", justifyContent: "center", mt: 1}}>
        <Typography variant="body1">検索ワード (商品名、JANコード) を入力してください。</Typography>
        </Box>}
      {productsData && stockData && inputText && <DisplaySearchResultByItemName
        searchBy={searchBy}
        isJanCode={isJanCode}
        products={productsData.data}
        stockData={stockData.result}
      />}
    </Box>
}
