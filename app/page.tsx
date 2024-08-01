import { createClient } from "@/utils/supabase/server";
import Row from "@/components/row";

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
    </>
  );
}
