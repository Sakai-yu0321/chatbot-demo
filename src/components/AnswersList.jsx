import React from 'react'
import { Answer } from './index'

//初期化された回答の情報がAppコンポーネントから渡される
const AnswersList = (props) => {
  return (
    <div className="c-grid__answer">
      {/*回答の情報をmapメソッドで繰り返し表示*/}
      {props.answers.map((value, index) => {
        //回答のテキストを出力
        return <Answer content={value.content} key={index.toString()}/>
      })}
    </div>
  )
}

export default AnswersList