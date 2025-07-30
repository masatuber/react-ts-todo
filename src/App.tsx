// App.tsx 入力のデータ 文字列, ID number, 完了、未完了の状態管理
import { useState } from 'react';
import './App.css'

function App() {
  // 型定義する
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  // React の状態管理 状態に型定義を使用する<Todo[]>のみ許可
  const [todos, setTodos] = useState<Todo[]>([]);
  // onChangeの状態管理
  const [inputValue, setInputValue] = useState("");

  //パラメーター 'e' の型は暗黙的に 'any' になります。ts(7006)
  // (parameter) e: any, React.ChangeEventの型注釈が必要
  // React.ChangeEventとは、フォームの値が変更された時に発生するイベントに関連するオブジェクトです。
  // HTMLInputElementとは、input要素に関するプロパティやメソッドを提供するHTML DOM API
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  return (
    <>
    <div>
      <h2>TodoリストTS</h2>
       {/* 空の関数をセット onChangeを採用する */}
      <form onSubmit={() => {}}>
          <input type="text" 
            onChange={(e) => {handleChange(e)}}
            className="inputText"
          />
          <input
          type="submit"
          value="作成"
          className="inputButton"
          />
      </form>
    </div>
    </>
  )
}

export default App
