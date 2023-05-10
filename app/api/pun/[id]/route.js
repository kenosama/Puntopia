import Pun from "@models/pun";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const pun = await Pun.findById(params.id).populate("creator");
    if (!pun) return new Response("pun Not Found", { status: 404 });
    return new Response(JSON.stringify(pun), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { pun, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing pun by ID
    const existingPun = await Pun.findById(params.id);

    if (!existingPun) {
      return new Response("pun not found", { status: 404 });
    }

    // Update the pun with new data
    existingPun.pun = pun;
    existingPun.tag = tag;

    await existingPun.save();

    return new Response("Successfully updated the puns", { status: 200 });
  } catch (error) {
    return new Response("Error Updating pun", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the pun by ID and remove it
    await Pun.findByIdAndRemove(params.id);

    return new Response("pun deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting pun", { status: 500 });
  }
};
