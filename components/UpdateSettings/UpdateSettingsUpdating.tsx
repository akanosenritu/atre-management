import {Box, Button, Typography} from "@mui/material"

const UpdateSettingsUpdating= () => {
  return <Box mx={2} mt={2}>
    <Typography variant={"body1"}>設定に問題は見つかりませんでした。</Typography>
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2}}>
      <Box><Typography variant={"body2"}>更新中です</Typography></Box>
      <Button variant={"outlined"} color={"primary"} size={"small"} disabled={true}>
        更新する
      </Button>
    </Box>
  </Box>
}

export default UpdateSettingsUpdating