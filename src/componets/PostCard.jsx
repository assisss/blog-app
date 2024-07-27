import React from "react";
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { FcLike } from "react-icons/fc";

function PostCard({ $id, title, featuredImage, author, date, time, content, like }) {
    return (
        <Link to={`/post/${$id}`} className="block w-full">
            <div className="bg-gray-600 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 relative">
                <img
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl text-white font-bold mb-2">{title}</h2>
                    <div className="text-white">
                        Posted By: {author}
                    </div>
                    <div className="flex items-center mt-2">
                        <h2 className="text-base text-white">Posted on: {date}, {time}</h2>
                    </div>
                    <div className="mt-4">
                        <span className="text-green-500 hover:underline">
                            Read more
                        </span>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center">
                    <FcLike className="text-3xl text-red-600" />
                    <span className="text-white ml-2">{like.length}</span>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
