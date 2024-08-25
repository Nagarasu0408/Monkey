// import XSvg from "../svgs/X";

import Logo from "../../Logo/logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/logout", {
                    method: "POST",
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: () => {
            toast.error("Logout failed");
        },
    });
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    return (
        <div className='md:flex-[2_2_0] w-18 max-w-52'>
            <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
                <Link to='/' className='flex justify-center md:justify-start border-b border-gray-700 my-3'>
                    <img className='mt-2 px-3 w-15 h-11  hover:bg-stone-900 mb-5' src={Logo} alt="Logo" />
                    <span className='text-lg hidden md:block '>Monkey</span>
                </Link>
                <ul className='flex flex-col gap-3 mt-4'>
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 10a.5.5 0 0 0-1 0zm-14 0a.5.5 0 0 0-1 0zm15.146 2.354a.5.5 0 0 0 .708-.708zM12 3l.354-.354a.5.5 0 0 0-.708 0zm-9.354 8.646a.5.5 0 0 0 .708.708zM7 21.5h10v-1H7zM19.5 19v-9h-1v9zm-14 0v-9h-1v9zm15.854-7.354l-9-9l-.708.708l9 9zm-9.708-9l-9 9l.708.708l9-9zM17 21.5a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5zm-10-1A1.5 1.5 0 0 1 5.5 19h-1A2.5 2.5 0 0 0 7 21.5z"></path></svg>
                            <span className='text-lg hidden md:block'>Home</span>
                        </Link>
                    </li>

                    <li className='flex justify-center md:justify-start'>
                        <Link
                            // to='/notifications'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="currentColor" d="M16 20a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2M5 20a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m5 17a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m12 6a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m5-5a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m-5-5a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2M10 9a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2"></path></svg>
                            <span className='text-lg hidden md:block'>Collaboration</span>
                        </Link>
                    </li>

                    <li className='flex justify-center md:justify-start'>
                        <Link
                            // to='/notifications'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m31 21l4-3l9 6v10l-10 6l-10-6V13L13 7l-9 6v11l9 6l4-3"></path></svg>
                            <span className='text-lg hidden md:block'>Projects</span>
                        </Link>
                    </li>

                    <li className='flex justify-center md:justify-start'>
                        <Link
                            // to='/notifications'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m24 2.5l3.571 17.929L45.5 24l-17.929 3.571L24 45.5l-3.571-17.929L2.5 24l17.929-3.571z"></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M34.488 13.512L29.062 24l5.426 10.488L24 29.062l-10.488 5.426L18.938 24l-5.426-10.488L24 18.938zm-13.046 9.055l.563-1.687m-.827 3.915l-.795-1.59m2.184 3.353l-1.687-.563m3.915.827l-1.59.795m3.353-2.184l-.563 1.687m.827-3.915l.795 1.59m-2.184-3.353l1.687.563m-3.915-.827l1.59-.795"></path></svg>
                            <span className='text-lg hidden md:block'>Completed</span>
                        </Link>
                    </li>

                    <li className='flex justify-center md:justify-start'>
                        <Link
                            // to='/notifications'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.189 9.52a1.7 1.7 0 0 1-.22-.825c0-.926.751-1.677 1.677-1.677c.34 0 .66.1.926.284a3.5 3.5 0 0 0-.311 1.457c0 .092.009.193.009.285c-.065 0-.129-.01-.202-.01a3.7 3.7 0 0 0-1.88.486zm-.367 6.518a3.89 3.89 0 0 1-1.613-3.144c0-.33.045-.651.119-.954h-.101A3.23 3.23 0 0 0 0 15.167a3.232 3.232 0 0 0 5.06 2.659a2.16 2.16 0 0 1-.339-1.155c0-.22.037-.431.101-.633m.138-.348a2.11 2.11 0 0 1 1.448-1.1c.055-.01.12-.019.183-.028c.065-.009.12-.009.184-.018h.082c.101 0 .193.01.294.018a4.92 4.92 0 0 1 .908-3.575a3 3 0 0 1-.358-.54l-.083-.166c-.027-.055-.055-.11-.073-.165a4 4 0 0 1-.211-.715c-.082-.01-.165-.01-.247-.01c-.605 0-1.183.157-1.678.432c-.055.027-.11.064-.165.091c-.055.037-.101.065-.156.101a3.54 3.54 0 0 0-1.274 1.605c-.018.055-.046.119-.064.174l-.055.174a3.4 3.4 0 0 0-.129.926A3.57 3.57 0 0 0 4.96 15.69m11.321-4.135c.468-.247.99-.394 1.55-.43a3.24 3.24 0 0 0-3.218-2.952c-.064 0-.129 0-.193.009c.028.183.046.376.046.568q0 .457-.11.871a4.9 4.9 0 0 1 1.925 1.934m-8.608-2.3c.01.064.028.128.037.192c.036.147.073.293.128.43c.028.065.046.12.073.184c.028.055.055.12.083.174c.082.165.183.321.293.468c.23-.257.477-.495.752-.706c.055-.037.1-.073.156-.11l.165-.11a4.8 4.8 0 0 1 2.558-.761h.064c.064 0 .119 0 .183.01q.124.002.248.018a4.7 4.7 0 0 1 1.595.421c.045-.229.073-.458.073-.706a3.2 3.2 0 0 0-.083-.706c-.009-.064-.027-.119-.045-.174a3.19 3.19 0 0 0-3.09-2.365a3.24 3.24 0 0 0-2.832 1.669c-.028.055-.065.11-.092.165l-.083.183c-.146.376-.238.78-.238 1.21c0 .11.01.21.018.32c.019.065.028.13.037.193zm14.558 5.463a1.4 1.4 0 0 0-.284.028c.009.082.009.165.009.238a3.85 3.85 0 0 1-1.064 2.659c.321.375.807.614 1.339.614c.971 0 1.769-.798 1.769-1.77c0-.971-.798-1.769-1.77-1.769zm-.651.12c0-.065-.01-.13-.01-.193c-.008-.064-.008-.129-.017-.184a3.5 3.5 0 0 0-3.337-2.979h-.184c-.064 0-.119 0-.183.01a3.55 3.55 0 0 0-1.393.393c.256.56.403 1.174.43 1.816c0 .064.01.128.01.192v.055c0 .083 0 .165-.01.248a4.85 4.85 0 0 1-1.402 3.126a3.5 3.5 0 0 0 2.613 1.164c.889 0 1.705-.34 2.328-.89c.046-.045.092-.082.138-.128c.045-.045.091-.091.128-.137a3.48 3.48 0 0 0 .908-2.356a.6.6 0 0 1-.019-.138zM7.866 16.505c-.037-.055-.065-.11-.101-.165a5 5 0 0 1-.541-1.394a1.6 1.6 0 0 0-.358-.036H6.83c-.064 0-.12.009-.184.009a1 1 0 0 0-.183.037a1.76 1.76 0 0 0-1.183.944c-.027.055-.055.11-.073.174l-.055.174a1.7 1.7 0 0 0-.055.43c0 .34.101.66.266.927c.037.055.064.1.11.156c.037.046.073.091.12.137a1.76 1.76 0 0 0 1.283.55a1.77 1.77 0 0 0 1.65-1.127a4.6 4.6 0 0 1-.532-.651a.5.5 0 0 1-.128-.165M16.5 14.24c.01-.073.01-.155.01-.238v-.12c0-.65-.138-1.264-.386-1.823l-.082-.165l-.083-.165a4.54 4.54 0 0 0-1.723-1.76c-.055-.028-.11-.065-.165-.092l-.165-.083a4.5 4.5 0 0 0-1.825-.43h-.229c-.082 0-.156.009-.229.009a4.4 4.4 0 0 0-1.962.632c-.055.037-.11.064-.156.101c-.055.037-.1.073-.155.11c-.303.22-.578.468-.816.752c-.037.046-.083.091-.12.146c-.036.046-.073.101-.11.147a4.47 4.47 0 0 0-.843 2.622c0 .257.018.513.064.752c.01.073.028.137.037.21c.018.074.037.147.055.23c.11.412.284.797.504 1.155c.037.055.064.11.101.156c.037.055.073.1.11.155q.126.18.266.33c.055.055.1.12.156.175c.045.055.1.1.156.146a4.53 4.53 0 0 0 6.05.083c.046-.037.092-.083.138-.12c.045-.045.091-.082.137-.128a4.55 4.55 0 0 0 1.238-2.567z"></path></svg>

                            <span className='text-lg hidden md:block'>possess</span>
                        </Link>
                    </li>


                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/notifications'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z"></path><path strokeLinecap="round" d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"></path></g></svg>
                            <span className='text-lg hidden md:block'>Notifications</span>
                        </Link>
                    </li>

                    {/* <li className='flex justify-center md:justify-start'>
                        <Link
                            to={`/profile/${authUser?.username}`}
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2a7 7 0 1 0 0 14a7 7 0 0 0 0-14m-6 7a6 6 0 1 1 12 0a6 6 0 0 1-12 0m-2.5 9A3.5 3.5 0 0 0 4 21.5v.667C4 24.317 6.766 30 16 30s12-5.684 12-7.833V21.5a3.5 3.5 0 0 0-3.5-3.5zM5 21.5A2.5 2.5 0 0 1 7.5 19h17a2.5 2.5 0 0 1 2.5 2.5v.667C27 23.684 24.765 29 16 29S5 23.684 5 22.167z"></path></svg>
                            <span className='text-lg hidden md:block'>Profile</span>
                        </Link>
                    </li> */}
                </ul>

                {authUser && (
                    <Link
                        to={`/profile/${authUser.username}`}
                        className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
                    >
                        <div className='avatar hidden md:inline-flex'>
                            <div className='w-8 rounded-full'>
                                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
                            </div>
                        </div>
                        <div className='flex justify-between flex-1'>
                            <div className='hidden md:block'>
                                <p className='text-white font-bold text-sm w-20 truncate'>{authUser?.fullName}</p>
                                <p className='text-slate-500 text-sm'>@{authUser?.username}</p>
                            </div>
                            <Link to={'/login'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}><path d="M12 20a8 8 0 1 1 0-16" opacity={0.5}></path><path strokeLinejoin="round" d="M10 12h10m0 0l-3-3m3 3l-3 3"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                        navigate('/login', { replace: true });
                                        console.log("logout");
                                    }}
                                ></path></g></svg>
                            </Link>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Sidebar;
