import React from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: ""
    }
    // this.inputName = this.inputName.bind(this)
    // this.inputEmail = this.inputEmail.bind(this)
    // this.inputDescription = this.inputDescription.bind(this)

  }

  //nameの入力値をsetStateする関数
  inputName = (event) => {
    this.setState({name: event.target.value})
  }

  //emailの入力値をsetStateする関数
  inputEmail = (event) => {
    this.setState({email: event.target.value})
  }

  //descriptionの入力値をsetStateする関数
  inputDescription = (event) => {
    this.setState({description: event.target.value})
  }

  //フォーム送信時にスラックに通知を送る関数
  submitForm = () => {
    const name = this.state.name
    const email = this.state.email
    const description = this.state.description

    const payload = {
      text: 'お問い合わせがありました\n' +
            'お名前:' + name + '\n' +
            'Email:' + email + '\n' +
            '問い合わせ内容:\n' + description
    }

    const url = 'https://hooks.slack.com/services/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'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(() => {
      alert('送信が完了しました。追ってご連絡します！')
      this.setState({
        name: "",
        email: "",
        description: ""
      })
      return this.props.handleClose()
    })
  }

  render (props) {
    return (
      <div className="z-10
                      absolute
                      top-0
                      left-0
                      w-screen
                      h-screen
                      bg-black
                      bg-opacity-60
                      flex
                      justify-center
                      items-center">
        <form className="bg-white w-2/5 h-1/2 p-10 rounded-md shadow-3xl flex flex-col">
          <h1>お問い合わせフォーム</h1>
          <input type="text"
            placeholder="お名前（必須）"
            onChange={this.inputName}
            value={this.state.name}
            className="focus:outline-none mt-10 border-b-2 hover:border-gray-500"
          />
          <input type="email"
            placeholder="メールアドレス（必須）"
            onChange={this.inputEmail}
            value={this.state.email}
            className="focus:outline-none mt-6 border-b-2 hover:border-gray-500"
          />
          <textarea rows="5"
            placeholder="お問い合わせ内容を入力してください"
            onChange={this.inputDescription}
            value={this.state.description}
            className="focus:outline-none mt-6 border-b-2 hover:border-gray-500"
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              onClick={this.props.handleClose}
              className="border border-gray-400 text-gray-400 hover:text-white hover:bg-gray-400 rounded-md p-1"
            >キャンセル</button>
            <button
              onClick={this.submitForm}
              className="ml-2 border border-gray-400 text-gray-400 hover:text-white hover:bg-gray-400 rounded-md p-1"
            >送信する</button>
          </div>
        </form>
      </div>
    )
  }
}