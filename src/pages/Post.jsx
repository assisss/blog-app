import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";
import parse from "html-react-parser";
import { FaRegHeart } from "react-icons/fa";

export default function Post() {
    const [like, setLike] = useState(false);
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const { slug } = useParams();
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    if (!Array.isArray(post.like)) {
                        post.like = [];
                    }
                    setPost(post);
                    if (post.like.includes(userData.$id)) {
                        setLike(true);
                    }
                } else {
                    navigate("/");
                }
            });
        }
    }, [slug, navigate, userData]);

    const likePost = () => {
        if (!like) {
            const updatedLikes = [...post.like, userData.$id];
            setLike(true);
            appwriteService.updatePost(post.$id, {
                ...post,
                like: updatedLikes,
            }).then(updatedPost => {
                setPost(updatedPost);
            });
        } else {
            const updatedLikes = post.like.filter((id) => id !== userData.$id);
            setLike(false);
            appwriteService.updatePost(post.$id, {
                ...post,
                like: updatedLikes,
            }).then(updatedPost => {
                setPost(updatedPost);
            });
        }
    };

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/My-post");
            }
        });
    };

    return post ? (
        <div className="py-4 bg-[#28786C] h-auto w-auto">
            <div className="flex flex-col md:flex-row md:justify-between items-start rounded-xl p-4 relative">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full h-full"
                    />
                </div>
                <div className="w-full md:w-2/3 md:pl-4">
                    <div className="mb-2">
                        <h2 className="text-3xl text-white font-bold">Title: {post.title}</h2>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-base font-bold text-white">Posted on: {post.date}, {post.time}</h3>
                    </div>
                    <div className="mb-2 flex items-center">
                    {like ? (
                        <FcLike
                            className={`cursor-pointer text-2xl ${like ? 'text-red-600' : 'text-gray-600'}`}
                            onClick={likePost}
                        />
                    ) : (
                        <FaRegHeart
                            className={`cursor-pointer text-2xl ${!like ? 'text-black' : 'text-gray-600'}`}
                            onClick={likePost}
                        />
                    )}

                        <span className="text-white text-lg ml-2">{post.like.length} {post.like.length === 1 ? 'Like' : 'Likes'}</span>
                    </div>
                    <div className="mb-2">
                        <p className="text-white text-lg text-justify">{parse(post.content)}</p>
                    </div>
                </div>
                {isAuthor && (
                    <div className="absolute right-6 top-6 flex space-x-3">
                        <Link to={`/edit-post/${post.$id}`}>
                            <button className="bg-green-800 text-white px-3 py-2 rounded hover:bg-green-600 transition duration-200">
                                Edit
                            </button>
                        </Link>
                        <button
                            className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-800 transition duration-200"
                            onClick={deletePost}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    ) : null;
}
