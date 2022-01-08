import React from "react"
import {useUser} from "@auth0/nextjs-auth0"

export const AuthenticationRequired: React.FC = (props) => {
  const { user, isLoading, error } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return user?
    <>{props.children}</>:
    <div>
      ログインが必要です。<br />
      右上のボタンを押して、ログイン画面に進んでください。
    </div>
}