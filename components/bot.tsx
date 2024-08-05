"use client"
import { generateRecipe } from "./actions"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { createClient } from "@/utils/supabase/client"

const Bot = () => {
    const [recipe, setRecipe] = useState<string | null>(null)
    const [id, setId] = useState<string | undefined>(undefined)
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            const id = user?.id
            if (!id) {
                console.error('Error fetching user id');
                return;
            }
            setId(id)
        }
        getData()
    }, [supabase])
    
    const makeRecipe = async () => { 
        const data = await generateRecipe()
        setRecipe(data)
    }

    const addToVault = async () => {
        const { data: {user}} = await supabase.auth.getUser()

        const s = {
            recipe: recipe,
            owner: user?.id
        }

        const { data, error } = await supabase.from("vault").insert(s)
        if (error) {
            console.error(error)
        }
        console.log
    }

    return (
        <>  
            <Dialog>
                <DialogTrigger className=""><i className='bx bx-sm bxs-bot' ></i></DialogTrigger>
                <DialogContent className="h-[60%] bg-black border-white rounded-md">
                    <DialogHeader>
                    <DialogTitle className="text-white">Recipe generator</DialogTitle>
                    <div className=" overflow-x-scroll">
                    <p className="text-white">Click the button to generate a recipe</p>
                        {recipe?(
                            <div className="overflow-scroll max-h-[50%]">
                                <p className="text-white">{recipe}</p>
                            </div>
                            
                        ):(null)}
                        <form>
                            <button className="p-2 bg-green-400 text-white absolute left-10 bottom-5" formAction={makeRecipe}> Generate Recipe</button>
                            <button className="p-2 bg-green-400 text-white absolute right-10 bottom-5" formAction={addToVault}> Add to vault</button>
                        </form>
                    </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Bot