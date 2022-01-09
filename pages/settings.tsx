import type { NextPage } from 'next'
import { Box, Typography } from "@mui/material"
import Layout from "../components/Layout"
import UpdateSettings from "../components/UpdateSettings/UpdateSettings"
import {
  getJanDictionaryFromGoogleSpreadsheetsUrl, getWriteInConfigurationsFromGoogleSpreadsheetsUrl,
  janCodesDictionaryFileUrl,
  updateJanDictionaryUrl, updateWriteInConfigurationsUrl, writeInConfigurationsFileUrl
} from "../settings"
import {AuthenticationRequired} from "../components/functional/AuthenticationRequired"

const Settings: NextPage = () => {
  return <Layout>
    <AuthenticationRequired>
      <Box sx={{margin: 2, marginTop: 5}}>
        <Typography variant={"h5"} sx={{borderBottom: "1px solid black"}}>設定</Typography>
        <UpdateSettings
          key={"JANコード設定"}
          settingName={"JANコード設定"}
          fileUrl={janCodesDictionaryFileUrl}
          getDataUrl={getJanDictionaryFromGoogleSpreadsheetsUrl}
          updateDataUrl={updateJanDictionaryUrl}
        />
        <UpdateSettings
          key={"書き込み設定"}
          settingName={"書き込み設定"}
          fileUrl={writeInConfigurationsFileUrl}
          getDataUrl={getWriteInConfigurationsFromGoogleSpreadsheetsUrl}
          updateDataUrl={updateWriteInConfigurationsUrl}
        />
      </Box>
    </AuthenticationRequired>
  </Layout>
}

export default Settings
