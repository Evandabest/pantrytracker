"use server"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { GoogleGenerativeAI } from "@google/generative-ai"


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

export const logout = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error("Supabase Error:", error)
        return
    }

    redirect("/")
}


export const generateRecipe = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    const {data, error} = await supabase.from("pantry").select("*").eq("owner", user?.id)
    if (error) {
        console.error("Supabase Error:", error)
        return "Error"
    }
    const prompt = "Make a step by step recipe using the following ingredients: " + data.map((item: any) => {
        console.log(item)
        return item.name + item.amount + item.units
    }).join(", ") + "it does not have to include all of the ingredients. Return the recipe in a step by step format."

    console.log(prompt)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
}