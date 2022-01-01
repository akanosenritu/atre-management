import {Box, Button, Typography} from "@mui/material"
import {useTheme} from "@mui/material/styles"

type Props = {
  errors: string[],
  warnings: string[]
}
const UpdateSettingsRetrievedError = (props: Props) => {
  const theme = useTheme()
  const {errors, warnings} = props
  return <Box mx={2} mt={2}>
    <Typography variant={"body1"}>エラーが{errors.length}件、警告が{warnings.length}件あります。</Typography>
    <Box mx={2} sx={{lineHeight: 2}}>
      {errors.map(error => <Typography sx={{color: theme.palette.error.main}} key={error} variant={"body2"}>[エラー]: {error}</Typography>)}
      {warnings.map(warning => <Typography sx={{color: theme.palette.warning.main}} key={warning} variant={"body2"}>[警告]: {warning}</Typography>)}
    </Box>
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2}}>
      <Box><Typography variant={"body2"}>設定にエラーがあるため更新できません。</Typography></Box>
      <Button variant={"outlined"} color={"primary"} size={"small"} disabled={true}>
        更新する
      </Button>
    </Box>
  </Box>
}

export default UpdateSettingsRetrievedError