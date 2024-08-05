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
        <form className="bg-black flex flex-col p-10 rounded-md m-auto space-y-4">
            <h1 className="text-white m-auto">Add to Pantry</h1>
            <input name="name" required placeholder="name"></input>
            <input name="amount" required placeholder="amount"></input>
            <input name="units" required placeholder="units"></input>
            <button className="bg-green-400 text-white rounded-md" formAction={submit}>Submit</button>
        </form>
        </>
    )
}

export default Add

