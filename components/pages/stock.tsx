import {Box, Button, TextField} from "@mui/material"
import {useRef, useState, ChangeEvent} from "react"
import Scanner from "../Stock/Scanner"
import useSWR from "swr"
import {DisplaySearchResult} from "../Stock/DisplaySearchResult"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const StockPage = () => {
  const {data: productsData} = useSWR("https://atre.blob.core.windows.net/products-data/productsData.json", fetcher)
  const {data: stockData} = useSWR("/api/azure/getStock", fetcher)

  const scannerRef = useRef(null)
  const [scanning, setScanning] = useState(false)

  const [searchBy, setSearchBy] = useState<string>("")
  const handleSearchByChange = (event: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    setSearchBy(event.target.value)
  }
  const onDetected = (result: string) => {
    setSearchBy(result)
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
      m: 3,
      '& .MuiTextField-root': { mt: 1},
    }}>
      <TextField
        fullWidth={true}
        value={searchBy}
        onChange={handleSearchByChange}
        InputLabelProps={{
          shrink: true
        }}
      />
    </Box>
    <Box sx={{
      display: "flex",
      justifyContent: "space-around",
    }}>
      <Button color="primary" variant="outlined">在庫数を更新</Button>
    </Box>
    {productsData && stockData && <DisplaySearchResult searchBy={searchBy} products={productsData.data} stockData={stockData.result} />}
  </Box>
}
