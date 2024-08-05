
import { createClient } from "@/utils/supabase/server"

const Vault = async () => {
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    const {data, error} = await supabase.from("vault").select("*").eq("owner", user?.id)
    if (error) {
        console.log(error)
    }

    console.log(data)

    return (
        <div className="w-[80%] h-[80%] overflow-scroll bg-black rounded-md flex flex-col m-auto">
            <h1 className="m-auto text-white">Vault of Recipes</h1>
            <ul>
                {data?.map((recipe) => {
                    return (
                        <li key={recipe.id}>{recipe.recipe}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Vault;