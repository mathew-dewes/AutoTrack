import { prisma } from "@/lib/db"

export default async function page(){

const users = await prisma.user.findUnique({
  where: {id: "cmedrw5ly0000uhfgosukjm4x"}
});

console.log(users);


  return(


    <div>
      <h1>Home</h1>
    </div>
  )
}