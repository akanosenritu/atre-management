import {Box, Button, Typography} from "@mui/material"
import {useTheme} from "@mui/material/styles"

type Props = {
  warnings: string[],
  onClickUpdate: () => void,
}

const UpdateSettingsRetrievedWarning = (props: Props) => {
  const theme = useTheme()
  const {warnings} = props
  return <Box mx={2} mt={2}>
    <Typography variant={"body1"}>警告が{warnings.length}件あります。</Typography>
    <Box mx={2} sx={{lineHeight: 2}}>
      {warnings.map(warning => <Typography sx={{color: theme.palette.warning.main}} key={warning} variant={"body2"}>[警告]: {warning}</Typography>)}
    </Box>
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2}}>
      <Box><Typography variant={"body2"}>警告を理解した上で更新することが可能です。</Typography></Box>
      <Button variant={"outlined"} color={"primary"} size={"small"} onClick={props.onClickUpdate}>
        更新する
      </Button>
    </Box>
  </Box>
}

export default UpdateSettingsRetrievedWarning