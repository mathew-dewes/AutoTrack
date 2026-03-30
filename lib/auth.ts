import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  }),
  emailAndPassword:{
    enabled: true
  }
});

export async function getUserId(){

  try {
          const session = await auth.api.getSession(
       { headers: await headers()});
        return session?.user.id
  } catch (error) {
    console.error(error)
  }
  




      
  
 
}