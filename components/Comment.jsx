import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comment = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const response = await axios.get(`/api/comment?postId=${postId}`);
        setComments(response.data.comments);
    }

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="my-12 px-5 max-w-[800px] mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Comments</h2>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className="bg-white p-4 border border-gray-300 rounded-lg mb-6 shadow-md">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold">{comment.name}</h3>
                            <span className="text-sm text-gray-500">
                                {new Date(comment.date).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-base text-gray-700 mb-3">{comment.comment}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default Comment;
