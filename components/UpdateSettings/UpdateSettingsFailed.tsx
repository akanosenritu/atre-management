import {Box, Button, Typography} from "@mui/material"

const UpdateSettingsFailed= () => {
  return <Box mx={2} mt={2}>
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2}}>
      <Box><Typography variant={"body2"}>更新に失敗しました。</Typography></Box>
      <Button variant={"outlined"} color={"primary"} size={"small"} disabled={true}>
        更新する
      </Button>
    </Box>
  </Box>
}

export default UpdateSettingsFailed