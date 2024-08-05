"use client"
import { logout } from "@/components/actions"
import { useEffect } from "react"


const LogoutPage = () => {

    useEffect(() => {
        const logoutUser = async () => {
            await logout()
        }
        logoutUser()

    }, [])

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    )
}

export default LogoutPage