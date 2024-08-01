"use client"
import { generateRecipe } from "./actions"
import { useState } from "react"

const Bot = () => {
    const [recipe, setRecipe] = useState<string | null>(null)
    
    const makeRecipe = async () => { 
        const data = await generateRecipe()
        setRecipe(data)
    }
    return (
        <>  

            {recipe?(<p>{recipe}</p>):(<p>Click the button to generate a recipe</p>)}
            <form>

                <button className="p-2 bg-red-500" formAction={makeRecipe}></button>

            </form>
        </>
    )
}

export default Bot