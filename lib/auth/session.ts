"use server";

import { createClientForServer } from "../supabase/server";


export async function getSession(){

    try {
    const supabase = await createClientForServer();
    const {data, error} = await supabase.auth.getSession();

    if (error){
        console.log("Error:", error.message);
        
    } else {
        return data.session;
    }
    
} catch (error) {
            console.log("Error:", error);
    }

};
export async function getUser(){

    try {
    const supabase = await createClientForServer();
        const { error , data: { user } } = await supabase.auth.getUser()

    if (error){
        console.log("Error:", error.message);
        
    } else {
        return user;
    }
    
} catch (error) {
            console.log("Error:", error);
    }

};


export async function getUserId(){
        const supabase = await createClientForServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
  throw new Error("User not authenticated")
};

return user.id
}