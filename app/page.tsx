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


export const getData = async () => {
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

  return (
    <>
    <Table className="bg-black w-[90%] m-auto">
      <TableCaption className="text-black">Make sure to update your pantry when you are hungry</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">Name</TableHead>
          <TableHead className="text-white" >Amount</TableHead>
          <TableHead className="text-white">Units</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      <div className="flex flex-col">
        {items?(
          items.map((item) => {
            return (
                <Row key={item.id} item={item}></Row>
            )
          })
        ):(
          null
        )}
      </div>
        </TableBody>
      </Table>

    </>
  );
}
