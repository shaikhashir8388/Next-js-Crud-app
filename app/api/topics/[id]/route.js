import connectMongoDb from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

// PUT request to update a topic
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    // Extract title and description from the request body
    const { title, discription } = await request.json();

    // Connect to MongoDB
    await connectMongoDb();

    // Update the topic based on the provided id
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, discription }, // Update with title and discription
      { new: true } // Return the updated document
    );

    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    // Return success response with the updated topic
    return NextResponse.json({ message: "Topic updated", updatedTopic }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error updating topic", error: error.message }, { status: 500 });
  }
}

// GET request to fetch a single topic by id
export async function GET(request, { params }) {
  const { id } = params;

  try {
    // Connect to MongoDB
    await connectMongoDb();

    // Find the topic by id
    const topic = await Topic.findOne({ _id: id });

    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    // Return the found topic
    return NextResponse.json({ topic }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error fetching topic", error: error.message }, { status: 500 });
  }
}
