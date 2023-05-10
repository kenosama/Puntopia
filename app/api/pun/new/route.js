import { connectToDB } from "@utils/database.js";
export const POST = async (req, res)=> {
    const {userId , pun, tag} = await req.json();
    try {
        await connectToDB();
    } catch (error) {
        console.log(error);
        
    }
};