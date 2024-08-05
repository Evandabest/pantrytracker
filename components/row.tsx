"use client"
import { useState } from "react"
import { Update } from "@/components/actions"
import { Delete } from "@/components/actions"
import { getData } from "@/components/actions"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const Row = ({ key, item }: any) => {
    const [amount, setAmount] = useState<Number>(item.amount)
    const [units, setUnits] = useState(item.units)
    const [visible, setVisible] = useState(true)

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
        if (Number(amount) > 0) {
            setAmount(Number(amount) - 1)
        }
    }

    const incrementAmount = (e: any) => {
        e.preventDefault()
        setAmount(Number(amount) + 1)
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
        setVisible(false)
    }

    return (
        <>
            {visible ? (

            <TableRow key={key}>
                <TableCell className="font-medium text-white text-center">{item.name}</TableCell>
                <TableCell className='flex flex-row '>
                <button onClick={decrementAmount} className="text-white p-2 mx-2 bg-red-400 rounded-md">
                    -
                </button>
                <input name="amount" onChange={handleChange} className='w-[4rem]' value={amount.toLocaleString()}></input>
                <button onClick={incrementAmount} className="text-white p-2 mx-2 bg-green-400 rounded-md" >
                    +
                </button> 
                </TableCell>
                <TableCell>
                    <input onChange={handleUnits}  name="units" value={units}></input>
                    <button onClick={handleDelete} className="text-white p-2 mx-3  bg-red-400 rounded-md">Delete</button>
                    <button onClick={handleUpdate} className="text-white p-2 mx-3 bg-green-400 rounded-md">Update</button>
                </TableCell>
            </TableRow> 
            )  : (null)}
            {
          //  <div className="flex flex-row items-center">
          //      <p>{item.name}</p>
          //      <form>
          //          <button onClick={decrementAmount}>
          //              -
          //          </button>
          //          <input name="amount" onChange={handleChange} value={amount.toString()}></input>
          //          <button onClick={incrementAmount}>
          //              +
          //          </button>
          //          <input name="units" value={units} onChange={handleUnits}></input>
          //          <button onClick={handleDelete}>Delete</button>
          //          <button onClick={handleUpdate}>Update</button>
          //      </form>
          //  </div>)}
          //  :(null)
            }
        </>
    )
}

export default Row