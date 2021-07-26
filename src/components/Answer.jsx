import React from 'react'

const Answer = (props) => {
  return (
    <button className="font-bold w-full rounded-md py-1 mb-2 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500" onClick={() => props.select(props.content, props.nextId)}>
      {props.content}
    </button>
  )
}

export default Answer