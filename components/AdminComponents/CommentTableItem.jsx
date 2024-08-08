import React from 'react'

const CommentTableItem = ({name,comment,blogId,date}) => {
    const commentDate = new Date(date);

  return (
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            {name?name:"No Name"}
        </th>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            {comment?comment:"No Comment"}
        </th>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            {blogId?blogId:"No blogId"}
        </th>
        <td className='px-6 py-4 hidden sm:block'>
            {commentDate.toDateString()}
        </td>
        <td className='px-6 py-4'>
            X
        </td>
    </tr>
  )
}

export default CommentTableItem
