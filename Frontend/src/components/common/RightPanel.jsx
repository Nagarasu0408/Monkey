import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import '../CSS/Scroll.css'


import useFollow from "../../hooks/useFollow";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import Timer from "./Timer";

const RightPanel = () => {
    const { data: suggestedUsers, isLoading } = useQuery({
        queryKey: ["suggestedUsers"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/users/suggested");
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    });

    const { follow, isPending } = useFollow();

    if (suggestedUsers?.length === 0) return <div className='md:w-60 w-10 scroll-container'></div>;

    return (
        <div className='hidden lg:block my-20 mx-2 scroll-container'>
            <div className='bg-[#16181C] p-4 rounded-md sticky top-2 scroll-container'>
                <p className='font-bold mb-6'>Timer</p>
                <Timer />
                <p className='font-bold mb-4 mt-20'>Who to follow</p>
                <div className='flex flex-col gap-3' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {isLoading && (
                        <>
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                        </>
                    )}
                    <div className=" flex-col gap-3 flex-1">
                        {!isLoading &&
                            suggestedUsers?.slice(0, 30).map((user) => (
                                <Link
                                    to={`/profile/${user.username}`}
                                    className='flex mt-3 items-center justify-between gap-4 mb-6 '
                                    key={user._id}
                                >
                                    <div className='flex gap-2 items-center'>
                                        <div className='avatar'>
                                            <div className='w-8 rounded-full'>
                                                <img src={user.profileImg || "/avatar-placeholder.png"} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='font-semibold tracking-tight truncate w-28'>
                                                {user.fullname}
                                            </span>
                                            <span className='text-sm text-slate-500'>@{user.username}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                follow(user._id);
                                            }}
                                        >
                                            {isPending ? <LoadingSpinner size='sm' /> : "Follow"}
                                        </button>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightPanel;
