"use server"
import { createClient } from "@/utils/supabase/server";
import Row from "@/components/row";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { redirect } from "next/navigation";


 const getData = async () => {
  "use server"
  const supabase = createClient()
  const {data: {user}} = await supabase.auth.getUser()
  const {data, error} = await supabase.from("pantry").select("*").eq("owner", user?.id)
  if (error) {
    console.log(error)
  }

  if (data) {
    return data;
  }
  return null; 

  
}

export default async function Home() {

  const items = await getData()

  const gotoAdd = () => {
    "use server"
    redirect("/add")
  }

  return (
    <>
   <Table className=' w-[60%] m-auto bg-black rounded-md'>
      <TableCaption className='text-black'>Make sure to update your pantry when you are hungry</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[8rem] text-center text-white">Name</TableHead>
          <TableHead className='w-[10rem] text-center text-white'>Amount</TableHead>
          <TableHead className="text-white flex items-center">
            Units
            <form className="ml-[60%]"><button formAction={gotoAdd} className="bg-green-400 text-white p-2 rounded-md">Add</button></form>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?(
          items.map((item) => {
            return (
                <Row key={item.id} item={item}></Row>
            )
          })
        ):(
          null
        )}
        </TableBody>
      </Table>

    </>
  );
}
