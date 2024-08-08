'use client'
import { assets, blog_data } from '@/assets/assets';
import Comment from '@/components/Comment';
import Footer from '@/components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = ({params}) => {

    const [data, setData] = useState(null);
    const [names, setNames] = useState("");
    const [comments, setComments] = useState("");

    const fetchBlogData = async () => {
        const response = await axios.get("/api/blog", {
            params: {
                id: params.id
            }
        });
        setData(response.data);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("postId", params.id);  // Pass postId with the form data
        formData.append("name", names);
        formData.append("comment", comments);
        const response = await axios.post('/api/comment', formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setNames("");
            setComments("");
        } else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchBlogData();
    }, []);

    
    return (data ? (
        <>
            <ToastContainer />
            <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
                <div className='flex justify-between items-center'>
                    <Link href='/'><Image src={assets.logo} width={180} alt='' className='w-[130px] sm:auto' /></Link>
                    <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                        Get Started <Image src={assets.arrow} className='ml-2' alt='' width={12} />
                    </button>
                </div>
                <div className='text-center my-24'>
                    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                    <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt='' />
                    <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                </div>
            </div>
            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
                <h1 className='my-8 text-[26px] font-semibold'>{data.description}</h1>
                <p className='my-3'>{data.content}</p>
                <div className="my-24">
                    <p className='text-black font-semibold my-4'>Share this Article on Social Media</p>
                    <div className='flex'>
                        <Image src={assets.facebook_icon} width={50} alt='' />
                        <Image src={assets.googleplus_icon} width={50} alt='' />
                        <Image src={assets.twitter_icon} width={50} alt='' />
                    </div>
                </div>
                <div className='my-24'>
                    <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 mx-auto max-w-[600px] p-6 border border-black shadow-[-7px_7px_0px_#000000] bg-white'>
                        <input
                            onChange={(e) => setNames(e.target.value)}
                            value={names}
                            type="text"
                            placeholder='Enter your Name'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-black'
                            required
                        />
                        <textarea
                            onChange={(e) => setComments(e.target.value)}
                            value={comments}
                            name='content'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-black'
                            type="text"
                            placeholder='Write content here'
                            rows={6}
                            required
                        />
                        <button
                            type='submit'
                            className='w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-all'>
                            Post a Comment
                        </button>
                    </form>
                </div>
            </div>
            {/* Pass postId as prop to Comment component */}
            <Comment postId={params.id} />

            <Footer />
        </>
    ) : (
        <></>
    ))
}

export default Page
