import React from 'react'

const Answer = (props) => {
  return (
  <button className="font-bold w-full text-white bg-blue-800 hover:bg-blue-900 rounded-md py-2">
      {props.content}
    </button>
  )
}

export default Answer