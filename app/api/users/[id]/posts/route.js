import { connectToDB } from "@utils/database.js";
import Pun from "@models/pun.js";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    const puns = await Pun.find({creator:params.id}).populate("creator");
    return new Response(JSON.stringify(puns), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch the puns", { status: 500 });
  }
};
