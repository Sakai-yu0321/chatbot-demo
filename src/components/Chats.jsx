import React from 'react'
import { Chat } from './index'

//質問のテキストとtype(質問or回答)の情報をAppコンポーネントから渡される
const Chats = (props) => {
  return (
    <div>
      {/* チャット（質問）の情報をmapメソッドで繰り返し表示 */}
      {props.chats.map((chat, index) => {
        //キーは通常ランダムな文字列で設定されていることが多いのでキーをtoStringで文字列に変換する
        return <Chat text={chat.text} type={chat.type} key={index.toString()}/>
      })}
    </div>
  )
}

export default Chats