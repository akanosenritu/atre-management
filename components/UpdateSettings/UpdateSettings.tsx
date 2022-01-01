import {Box, Button, Typography} from "@mui/material"
import {useCallback, useEffect, useState} from "react"
import UpdateSettingsRetrievedError from "./UpdateSettingsRetrievedError"
import UpdateSettingsRetrievedWarning from "./UpdateSettingsRetrievedWarning"
import UpdateSettingsUpdating from "./UpdateSettingsUpdating"
import UpdateSettingsUpdated from "./UpdateSettingsUpdated"
import UpdateSettingsRetrievedNoWarning from "./UpdateSettingsRetrievedNoWarning"

type RetrievedDataSuccess = {
  ok: true,
  errors: [],
  warnings: string[],
  data: {
    count: number,
    janCodes: {
      [itemNumber: string]: string
    }
  }
}
type RetrievedDataFailure = {
  ok: false,
  errors: string[],
  warnings: string[]
}

type Status = "initial" | "retrieving" | "retrieved" | "improperlyConfigured" | "updating" | "updated" | "failed"

type Props = {
  settingName: string,
  fileUrl: string,
  getDataUrl: string,
  updateDataUrl: string,
}

const UpdateSettings = (props: Props) => {
  const [currentData, setCurrentData] = useState<null|any>(null)
  const loadJanCodesDictionary = useCallback(() => {
    fetch(props.fileUrl, {cache: "no-cache"})
      .then(res => res.json())
      .then(data => setCurrentData(data))
  }, [props.fileUrl])
  useEffect(() => {
    loadJanCodesDictionary()
  }, [loadJanCodesDictionary])

  const [status, setStatus] = useState<Status>("initial")
  const [retrievedData, setRetrievedData] = useState<RetrievedDataSuccess|RetrievedDataFailure|null>(null)
  const onClickStartUpdate = async () => {
    setStatus("retrieving")
    const res = await fetch(props.getDataUrl)
    const data = await res.json()
    setRetrievedData(data)
    setStatus("retrieved")
  }
  const onClickFinishUpdate = async () => {
    if (retrievedData?.ok) {
      setStatus("updating")
      const res = await fetch(props.updateDataUrl, {
        method: "POST",
        body: JSON.stringify(retrievedData.data)
      })
      if (res.ok) {
        setStatus("updated")
        setTimeout(() => loadJanCodesDictionary(), 1000)
      } else {
        setStatus("failed")
      }
    }
  }
  return <Box sx={{margin: 2}} >
    <Box sx={{border: "1px solid black", borderRadius: 5, padding: 1}}>
      <Box>
        <Typography variant={"h6"}>
          {props.settingName}
        </Typography>
        <Box mx={2} sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Box>
            {currentData? `最終更新: ${currentData.createdAt}`: "データを取得中"}
            {currentData && <a href={props.fileUrl} rel={"noreferrer"} target={"_blank"}><span style={{verticalAlign: "text-bottom", fontSize: 8}}>[開く]</span></a>}
          </Box>
          <Box>
            <Button color={"primary"} variant={"outlined"} disabled={status !== "initial"} onClick={onClickStartUpdate} size={"small"}>更新を開始</Button>
          </Box>
        </Box>
      </Box>
      {status === "retrieved" && retrievedData && <Box sx={{margin: 1, borderTop: "1px solid black"}}>
        {!retrievedData.ok && <UpdateSettingsRetrievedError errors={retrievedData.errors} warnings={retrievedData.warnings} />}
        {retrievedData.ok && retrievedData.warnings.length > 0 && <UpdateSettingsRetrievedWarning warnings={retrievedData.warnings} onClickUpdate={onClickFinishUpdate}/>}
        {retrievedData.ok && retrievedData.warnings.length === 0 && <UpdateSettingsRetrievedNoWarning onClickUpdate={onClickFinishUpdate} />}
      </Box>}
      {status === "updating" && <Box sx={{margin: 1, borderTop: "1px solid black"}}>
        <UpdateSettingsUpdating />
      </Box>}
      {status === "updated" && <Box sx={{margin: 1, borderTop: "1px solid black"}}>
        <UpdateSettingsUpdated />
      </Box>}
    </Box>
  </Box>
}

export default UpdateSettings