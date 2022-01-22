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

  const scannerRef = useRef(null)
  const [scanning, setScanning] = useState(false)

  const [inputText, setInputText] = useState("")
  const [isJanCode, setIsJanCode] = useState(false)
  const [searchBy] = useDebounce(inputText, 1000)

  const handleSearchByChange = (event: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    setInputText(event.target.value)
    setIsJanCode(/[0-9]+/.test(event.target.value))
  }
  const onDetected = (result: string) => {
    setInputText(result)
    setIsJanCode(true)
  }
  return <Box>
    <Box sx={{display: "flex", justifyContent: "center"}}>
      <div style={{width: 300, height: 300}}>
        <div ref={scannerRef} style={{position: "relative"}}>
          <canvas className={"drawingBuffer"} style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%"
          }} width={300} height={300} />
          {scanning && <Scanner
            scannerRef={scannerRef}
            onDetected={onDetected}
          />}
        </div>
      </div>
    </Box>
    <Box sx={{
      display: "flex",
      justifyContent: "center"
    }}>
      <Button onClick={()=>setScanning(true)} disabled={scanning}>バーコードをスキャンする</Button>
    </Box>
    <hr />
    <Box sx={{
      m: 2,
      '& .MuiTextField-root': { mt: 1},
    }}>
      <TextField
        fullWidth={true}
        value={inputText}
        onChange={handleSearchByChange}
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
      <Button color="primary" variant="outlined">在庫数を更新</Button>
    </Box>
    {!productsData && <Box sx={{display: "flex", justifyContent: "center"}}><Typography variant={"body1"}>商品データを読み込み中...</Typography></Box>}
    {!stockData && <Box sx={{display: "flex", justifyContent: "center"}}><Typography variant={"body1"}>在庫データを読み込み中...</Typography></Box>}
    {productsData && stockData && inputText && <DisplaySearchResultByItemName
      searchBy={searchBy}
      isJanCode={isJanCode}
      products={productsData.data}
      stockData={stockData.result}
    />}
  </Box>
}
