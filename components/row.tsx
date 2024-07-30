"use client"
import { useState } from "react"
import { Update } from "@/components/actions"
import { Delete } from "@/components/actions"

const Row = ({ key, item }: any) => {
    const [amount, setAmount] = useState(item.amount)
    const [units, setUnits] = useState(item.units)

    const handleChange = (e: any) => {
        e.preventDefault()
        setAmount(e.target.value)
    }

    const handleUnits = (e: any) => {
        e.preventDefault()
        setUnits(e.target.value)
    }

    const decrementAmount = (e: any) => {
        e.preventDefault()
        if (amount > 0) {
            setAmount(amount - 1)
        }
    }

    const incrementAmount = (e: any) => {
        e.preventDefault()
        setAmount(amount + 1)
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault()
        const formData = {
            amount: amount,
            units: units,
            name: item.name
        }
        await Update(formData, item)
    }

    const handleDelete = async (e: any) => {
        e.preventDefault()
        await Delete(item)
    }

    return (
        <>
            <div className="flex flex-row items-center">
                <p>{item.name}</p>
                <form>
                    <button onClick={decrementAmount}>
                        -
                    </button>
                    <input name="amount" onChange={handleChange} value={amount}></input>
                    <button onClick={incrementAmount}>
                        +
                    </button>
                    <input name="units" value={units} onChange={handleUnits}></input>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleUpdate}>Update</button>
                </form>
            </div>
        </>
    )
}

export default Row