'use client'
import CommentTableItem from '@/components/AdminComponents/CommentTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Page = () => {

  const [comments,setComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get('/api/comment')
    setComments(response.data.comments)
  }

  useEffect(() => {
    fetchComments();
  },[])




  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Comments</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-small text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Comments
              </th>
              <th scope='col' className='px-6 py-3'>
                BlogID
              </th>
              <th scope='col' className='px-6 py-3 hidden sm:block'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item,index)=>{
              return <CommentTableItem key={index} name={item.name} comment={item.comment} blogId={item._id} date={item.date} />
            })}
          </tbody>

        </table>

      </div>
      
    </div>
  )
}

export default Page
