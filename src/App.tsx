import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index';
import { default as FormDialog } from './components/forms/FormDialog';

export default class App extends React.Component {
  // @ts-ignore
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
    //this.selectAnswerと言う変数が、bindされたbindされたコールバック関数になった
    this.selectAnswer = this.selectAnswer.bind(this)

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  

  //次の質問を表示する関数
  displayNextQuestion = (nextQuestionId: string) => {
    // @ts-ignore
    const chats = this.state.chats //現在のチャット情報を取得
    
    chats.push({
      // @ts-ignore
      text: this.state.dataset[nextQuestionId].question, //次の質問をpush
      type: 'question' //typeはquestion
    })

    this.setState({
      //次の質問を取得しsetState
      // @ts-ignore
      answers: this.state.dataset[nextQuestionId].answers,
      //新しいチャットの情報をsetState
      chats: chats,
      //Idに次のチャット全体の情報をsetState
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer: string, nextQuestionId: string) => {
    switch(true) {
      case (nextQuestionId === "init"): //変数の値がinitの時実行される
        setTimeout (() => this.displayNextQuestion(nextQuestionId), 500);//("init")で呼ばれる
        break; //上記の処理が完了したらswitchぶんを抜ける

      case (/^https:*/.test(nextQuestionId)): //nextQuestionIdがhttpsから始まる場合
        const a = document.createElement('a'); //aと言うdom要素を作り
        a.href = nextQuestionId; //そのようそのリンク先にnextId(リンク)を指定
        a.target = '_blank'; //新規タブでリンクを開く
        a.click();
        break;

      case (nextQuestionId === 'contact'):
        this.handleClickOpen()
        break;
      
      default: //変数の値が上記の条件に当てはまらない時実行される

        // @ts-ignore
        const chats = this.state.chats; //現在のchatsの情報を取得

        chats.push({
          text: selectedAnswer, //回答の文字列をpush
          type: 'answer' //type回答
        })
    
        this.setState({
          chats: chats //選択されたchatをsetState
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000); //次の質問を表示
        break; //上記の処理が完了したらswitch文を抜ける
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  //マウント時に呼び出す関数を定義
  componentDidMount() {
    const initAnswer= ""
    // @ts-ignore
    this.selectAnswer(initAnswer, this.state.currentId) //("", "init")でselectAnswerを呼び出し
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area')
    if(scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  render() {
    return (
      <div>
      <section className="c-section">
        <div className="c-box">
          {/* 質問のテキストとtypeをChatsコンポーネントに渡す */}
          {/*@ts-ignore*/}
          <Chats chats={this.state.chats}/>
          {/* 初期化された回答の情報をAnswersListに渡す */}
          {/*@ts-ignore*/}
          <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
        </div>
      </section>
      {/*@ts-ignore*/}
      {(this.state.open === true) && (
        // @ts-ignore
        <FormDialog open={this.state.open} handleClose={this.handleClose}/>
      )}
      </div>
    );
  }
}

