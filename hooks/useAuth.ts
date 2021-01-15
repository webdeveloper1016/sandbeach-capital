import React from "react"
import { AuthContextModel, AuthContext } from "../components/Auth"

const useAuth = (): AuthContextModel => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider")
  }

  return context
}

export default useAuth