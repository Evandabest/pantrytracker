"use server"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

const Add = () => {
    
    const submit = async (formData: FormData) => {
        "use server"
        const supabase = createClient()
        const form = {
            name: formData.get("name"),
            amount: formData.get("amount"),
            units: formData.get("units"),
        }

        const { data, error } = await supabase.from("pantry").insert(form)
        if (error) {
            console.error("Supabase Error:", error)
            return
        }

        redirect("/")

    } 

    return (
        <>
        <form>
            <input name="name" required placeholder="name"></input>
            <input name="amount" required placeholder="amount"></input>
            <input name="units" required placeholder="units"></input>
            <button formAction={submit}>Submit</button>
        </form>
        </>
    )
}

export default Add

