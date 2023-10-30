import React from 'react'

const UserAccount = ({user}) => {
  return (
    <div>
      <div className="flex items-center justify-center mb-2">
        <img className='h-32 w-32 rounded-full border-2 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnaxjoallAAP3ck08McWslpXzF5qufHA6SWw&usqp=CAU" alt='Profile' />
      </div>
      <div className="text-lg font-semibold mb-4 text-center text-secondary-dark">User Profile</div>
      <div className="text-gray-600 mb-2">
        <div className="mb-2 text-center text-sm font-bold">User Id : <span className='text-sm font-bold text-secondary-dark'>{user?._id.slice(0,10)}</span></div>
        <div className="mb-2 text-center text-sm font-bold">Email Id : <span className='text-sm font-extrabold text-secondary-dark'>{user?.email}</span></div>
        <div className='text-center text-sm font-bold'>Vote : <span className='text-sm font-extrabold text-primary-dark'>{user?.vote}</span></div>
      </div>
    </div>
  )
}

export default UserAccount