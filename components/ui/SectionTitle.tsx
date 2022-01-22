import React from "react"
import {Typography} from "@mui/material"

export const SectionTitle: React.FC = props => {
  return <Typography variant={"h6"} sx={{borderBottom: "1px solid darkgray"}}>
    {props.children}
  </Typography>
}