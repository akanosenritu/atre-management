import React from "react"
import {Typography} from "@mui/material"

export const SectionDescription: React.FC = props => {
  return <Typography variant={"body1"} sx={{pl: 1}}>
    {props.children}
  </Typography>
}