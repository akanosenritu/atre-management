import React from "react"
import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import Link from "next/link"

const Layout: React.FC = (props) => {
  return <>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" mx={1}>
          <Link href={"/"}>ホーム</Link>
        </Typography>
        <Typography variant="h6" mx={1}>
          <Link href={"/demo"}>デモ</Link>
        </Typography>
        <Typography variant="h6" mx={1}>
          <Link href={"/settings"}>設定</Link>
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