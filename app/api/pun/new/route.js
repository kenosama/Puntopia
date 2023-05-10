import { connectToDB } from "@utils/database.js";
import Pun from "@models/pun.js";
export const POST = async (req, res)=> {
    const {userId , pun, tag} = await req.json();
    try {
        await connectToDB();
        const newPun = new Pun({
            creator: userId, 
            pun,
            tag});
        await newPun.save();
        return new Response(JSON.stringify(newPun, {status: 201}))
    } catch (error) {
        return new Response("Failed to create a new Pun", {status:500});
    }
}; 