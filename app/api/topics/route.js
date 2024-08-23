// app/api/topics/route.js
import connectMongoDb from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, discription } = await request.json();
    await connectMongoDb();
    await Topic.create({ title, discription });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json({ message: "Error creating topic" }, { status: 500 });
  }
}

export async function GET(){
await connectMongoDb();
 const topics = await Topic.find();
 return NextResponse.json({topics})

}

export async function DELETE(request){
const id = request.nextUrl.searchParams.get("id");
await connectMongoDb();
await Topic.findByIdAndDelete(id);
return NextResponse.json({message: "Topic Deleted"}, {status: 200});
}