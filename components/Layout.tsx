import React from "react"
import {AppBar, Box, Toolbar, Typography} from "@mui/material"
import Link from "next/link"
import {UserMenu} from "./UserMenu"

const Layout: React.FC = (props) => {
  return <>
    <AppBar position="static">
      <Toolbar variant="dense" sx={{display: "flex", justifyContent: "space-between"}}>
        <Box sx={{display: "flex", "&>.MuiTypography-root": {mx: 1}}}>
          <Typography variant="h6">
            <Link href={"/stock"}>在庫</Link>
          </Typography>
          <Typography variant="h6">
            <Link href={"/csv"}>販売数</Link>
          </Typography>
          <Typography variant="h6">
            <Link href={"/settings"}>設定</Link>
          </Typography>
        </Box>
        <Box sx={{display: "flex"}}>
          <UserMenu />
        </Box>
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