import CommentModel from "@/lib/models/CommentModel";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

// API Endpoint to get comments for a specific post
export async function GET(request) {
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');

    const comments = await CommentModel.find({ postId });
    return NextResponse.json({ comments });
}

// API Endpoint to post a comment for a specific post
export async function POST(request) {
    const formData = await request.formData();
    const commentData = {
        postId: formData.get("postId"),  // Get the postId from the formData
        name: formData.get("name"),
        comment: formData.get("comment"),
    };
    await CommentModel.create(commentData);
    return NextResponse.json({ success: true, msg: "Comment Added Successfully" });
}
