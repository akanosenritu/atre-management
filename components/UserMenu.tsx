import {Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material"
import React, {useState, MouseEvent} from "react"
import {useUser} from "@auth0/nextjs-auth0"
import Logout from '@mui/icons-material/Logout'
import {useRouter} from "next/router"

export const UserAvatar = () => {
  const {user} = useUser()
  if (!user) return <Avatar />
  return <Avatar>{user?.name && user.name[0] || ""}</Avatar>
}

export const UserMenu: React.VFC = () => {
  const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const {user} = useUser()
  const router = useRouter()
  const onClickLogOut = () => router.push("/api/auth/logout")
  const onClickLogIn = () => router.push("/api/auth/login")
  return <>
    <IconButton onClick={handleClick}><UserAvatar /></IconButton>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{horizontal: "right", vertical: "top"}}
      anchorOrigin={{horizontal: "right", vertical: "bottom"}}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          }
        }
      }}
    >
      {user && <MenuItem>
        <UserAvatar />{user.name}
      </MenuItem>}
      <Divider />
      {user && <MenuItem onClick={onClickLogOut}>
        <ListItemIcon>
          <Logout fontSize={"small"} />
        </ListItemIcon>
        ログアウト
      </MenuItem>}
      {!user && <MenuItem onClick={onClickLogIn}>
        <ListItemIcon>
          <Logout fontSize={"small"} />
        </ListItemIcon>
        ログイン
      </MenuItem>}
    </Menu>
  </>
}