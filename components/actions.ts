"use server"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function Update(formData: any, item: any) {
    const supabase = createClient()
    const form = {
        id: item.id,
        owner: item.owner,
        name: formData["name"],
        amount: formData["amount"],
        units: formData["units"],
    }

    console.log("Form Data:", form)

    const { data, error } = await supabase.from("pantry").update(form).eq("id", item.id)

    if (error) {
        console.error("Supabase Error:", error)
        return
    }
    if (!data) {
        console.error("No data returned from update")
        return
    }

    console.log("Update Successful:", data)
    redirect("/")
}

export async function Delete(item: any) {
    const supabase = createClient()

    const { data, error } = await supabase.from("pantry").delete().eq("id", item.id)

    if (error) {
        console.error("Supabase Error:", error)
        return
    }
    if (!data) {
        console.error("No data returned from delete")
        return
    }

    console.log("Delete Successful:", data)
    redirect("/")
}