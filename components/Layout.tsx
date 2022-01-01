import React from "react"
import { AppBar, Box, Toolbar, Typography } from "@mui/material"

const Layout: React.FC = (props) => {
  return <>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6">
          ホーム
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
      <Box sx={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Box sx={{
          width: 750,
          margin: 3
        }}>
          {props.children}
        </Box>
      </Box>
    </main>
  </>
}

export default Layout