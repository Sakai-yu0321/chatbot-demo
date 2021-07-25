import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    //stateを定義
    this.state = {
      //お客さんの回答の情報
      answers: [],
      //chatのテキスト、とtype（質問なのか回答なのか）の情報
      chats: [],
      //現在表示されているchat全体のIdの情報
      currentId: "init",
      //デフォルトのデータセットを取得
      dataset: defaultDataset,
      //モーダルが閉じているのか開いているのか
      open: false
    }
  }

  displayNextQuestion = (nextQuestionId) => {
    //現在のchat情報を取得
    const chats = this.state.chats
    //chatsに次の質問の情報をpush
    chats.push({
      //textに次の質問をpush
      text: this.state.dataset[nextQuestionId].question,
      //typeは質問
      type: 'question'
    })

    this.setState({
      //次の質問を取得しsetState
      answers : this.dataset.NextQuestionId.answers,
      //新しいチャットの情報をsetState
      chats: chats,
      //Idに次のチャット全体の情報をsetState
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId === 'init'):
        break;
      default:
        const chat = {
          //回答の情報を取得
          text: selectedAnswer,
          //typeは回答
          type: 'answer'
        }
    
        //変数chatsに現在のchatsの情報を代入（空）
        const chats = this.state.chats;
        //chatsに質問のテキストとtypeをpush
        chats.push(chat)
    
        //空のstate、chatsに質問のテキストとtypeをsetState
        this.setState({
          chats: chats
        })
        break;
    }
  }

  //initのanswersという連想配列を初期化する関数
  initAnswer = () => {
    //datasetからanswerとquestionが入ったオブジェクトを取得
    const initDataset = this.state.dataset[this.state.currentId]
    //↑で取得したオブジェクトからanswer(回答)の連想配列を取得
    const initAnswers = initDataset.answers
    this.setState({
      //answersの連想配列を初期化
      answers: initAnswers
    })
  }

  initChats = () => {
    //initオブジェクトを取得
    const initDataset = this.state.dataset[this.state.currentId]
  }

  //マウント時に呼び出す関数を定義
  componentDidMount() {
    //質問の情報を取得しsetState
    this.initChats()
    //回答の連想配列を取得初期化
    this.initAnswer()
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          {/* 質問のテキストとtypeをChatsコンポーネントに渡す */}
          <Chats chats={this.state.chats}/>
          {/* 初期化された回答の情報をAnswersListに渡す */}
          <AnswersList answers={this.state.answers}/>
        </div>
      </section>
    );
  }
}

