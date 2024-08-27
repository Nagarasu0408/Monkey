import "../CSS/Common.css"

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";

const Post = ({ post }) => {
    const [comment, setComment] = useState("");
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const queryClient = useQueryClient();
    const postOwner = post.user;
    const isLiked = post.likes.includes(authUser._id);
    const description = post.text.length > 300 ? post.text.slice(0, 300) + "..." : post.text;

    const isMyPost = authUser._id === post.user._id;

    const formattedDate = formatPostDate(post.createdAt);

    const { mutate: deletePost, isPending: isDeleting } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/posts/${post._id}`, {
                    method: "DELETE",
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Post deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    const { mutate: likePost, isPending: isLiking } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/posts/like/${post._id}`, {
                    method: "POST",
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: (updatedLikes) => {
            // this is not the best UX, bc it will refetch all posts
            // queryClient.invalidateQueries({ queryKey: ["posts"] });

            // instead, update the cache directly for that post
            queryClient.setQueryData(["posts"], (oldData) => {
                return oldData.map((p) => {
                    if (p._id === post._id) {
                        return { ...p, likes: updatedLikes };
                    }
                    return p;
                });
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { mutate: commentPost, isPending: isCommenting } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/posts/comment/${post._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: comment }),
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Comment posted successfully");
            setComment("");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeletePost = () => {
        deletePost();
    };

    const handlePostComment = (e) => {
        e.preventDefault();
        if (isCommenting) return;
        commentPost();
    };

    const handleLikePost = () => {
        if (isLiking) return;
        likePost();
    };

    return (
        <>
            <div className='flex gap-2 items-start p-4 border-b border-gray-700 Card'>
                <div className='avatar'>
                    <Link to={`/profile/${postOwner.username}`} className='w-10 h-10 rounded-full overflow-hidden'>
                        <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
                    </Link>
                </div>
                <div className='flex flex-col flex-1 Card-Image'>
                    <div className='flex gap-0 flex-col  items-start '>
                        <Link to={`/profile/${postOwner.username}`} className='font-bold'>
                            {postOwner.fullname}
                        </Link>
                        <span className='text-gray-700 flex gap-1 text-sm'>
                            <Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
                            <span>·</span>
                            <span>{formattedDate}</span>
                        </span>
                    </div>
                    <div className='flex justify-end flex-1 w-9/12 '>
                        <div className='flex gap-5 items-center w-1 justify-start'>
                            <div
                                className='flex gap-1 items-center cursor-pointer group'
                                onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                    <path fill="#5c5c5c" d="M6.667 3.287v2.38H8.66V4.333h9.787l-2.153 2H2.947c-.534 0-.947.314-.947.84v13.534c0 .533.413.96.947.96H16.9l4.827-4.447c.567-.52.193-1.553-.587-1.553H8.66V9h-2v7.72c0 .534.227.947.76.947h11.114l-2.26 2H4V8.333h12.9L21.727 3.8c.567-.52.193-1.467-.587-1.467H7.42c-.533 0-.76.427-.76.954z"></path>
                                </svg>
                                <span className='text-sm text-slate-500 group-hover:text-sky-400'>
                                    {post.comments.length}
                                </span>
                            </div>
                            {/* Using Modal Component from DaisyUI */}
                            <dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
                                <div className='modal-box rounded border border-gray-600'>
                                    <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                                    <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                                        {post.comments.length === 0 && (
                                            <p className='text-sm text-slate-500'>
                                                🤔 Be the first one 😉
                                            </p>
                                        )}
                                        {post.comments.map((comment) => (
                                            <div key={comment._id} className='flex gap-2 items-start'>
                                                <div className='avatar'>
                                                    <div className='w-8 rounded-full'>
                                                        <img
                                                            src={comment.user.profileImg || "/avatar-placeholder.png"}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='flex items-center gap-1'>
                                                        <span className='font-bold'>{comment.user.fullName}</span>
                                                        <span className='text-gray-700 text-sm'>
                                                            @{comment.user.username}
                                                        </span>
                                                    </div>
                                                    <div className='text-sm'>{comment.text}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <form
                                        className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                                        onSubmit={handlePostComment}
                                    >
                                        <textarea
                                            className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
                                            placeholder='Add a comment...'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                                            {isCommenting ? <LoadingSpinner size='md' /> : "Post"}
                                        </button>
                                    </form>
                                </div>
                                <form method='dialog' className='modal-backdrop'>
                                    <button className='outline-none'>close</button>
                                </form>
                            </dialog>
                            <div className='flex gap-1 items-center group cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20"><path fill="#A7A7A7A7" d="M5 4a2 2 0 0 0-2 2v6H0l4 4l4-4H5V6h7l2-2zm10 4h-3l4-4l4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7z"></path></svg>
                                <span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
                            </div>
                            <div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
                                {isLiking && <LoadingSpinner size='sm' />}
                                {!isLiked && !isLiking && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48">
                                        <path fill="none" stroke="#696969" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"></path>
                                    </svg>
                                )}
                                {isLiked && !isLiking && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48">
                                        <path fill="#ff0000" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"></path>
                                    </svg>
                                )}

                                <span
                                    className={`text-sm  group-hover:text-red ${isLiked ? "text-red-500" : "text-slate-500"
                                        }`}
                                >
                                    {post.likes.length}
                                </span>
                            </div>
                            <div className='flex w-1/1 justify-end gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    <path fill="#9c53ff" d="m7.135 19.077l1-4H4.518l.25-1h3.616l1.038-4.154H5.808l.25-1h3.615l1-4h.962l-1 4h4.269l1-4h.962l-1 4h3.615l-.25 1h-3.616l-1.038 4.154h3.615l-.25 1h-3.615l-1 4h-.961l1-4h-4.27l-1 4zm2.211-5h4.27l1.038-4.154h-4.27z"></path>
                                </svg>
                            </div>
                            {isMyPost && (
                                <span className='flex justify-end flex-1'>
                                    {!isDeleting && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                            <path fill="none" stroke="#5c5c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75"></path>
                                        </svg>
                                    )}

                                    {isDeleting && <LoadingSpinner size='sm' />}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 overflow-hidden'>

                        {post.img && (
                            <img
                                src={post.img}
                                className='h-auto w-full  object-contain rounded-lg mt-5 border border-gray-700'
                                alt=''
                            />
                        )}
                        <span>{description}</span>
                    </div>

                </div>
            </div>
        </>
    );
};
export default Post;
