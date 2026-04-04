import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { Pool } from "pg";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: new Pool({
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  }),
  emailAndPassword:{
    enabled: true
  },
      socialProviders: {
        google: { 
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
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