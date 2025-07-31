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
    // console.log(e.target.value); // デバック用
    e.preventDefault();
    // 状態管理の更新を呼出す
    setInputValue(e.target.value);
    
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // inputValue: "" が空文字だと処理しない
    if (inputValue) {
    // リロード防止忘れずに
    e.preventDefault();
     // console.log()
    // 新しいTodo を作成する変数
    const  newTodo: Todo = {
      inputValue: inputValue, // useStateの変数
      id: todos.length, // ユニークIDは使用しない
      checked: false,  //初期設定
    };

    // 更新用関数に新しいTodoと配列の変数をセット, 
    setTodos([newTodo, ...todos])
   //  console.log(...todos); //スプレッド構文で取得するとtodosはオブジェクトになる
    // 文字列を空の状態に更新する
    setInputValue("");
    }
  }

  // 関数の引数にタイプを付与、イベント、ID、状態管理変数受取り
  const handleEdit = ( id: number, inputValue: string ) => {
    // 左辺と右辺のタイプアンマッチでエラーがでる
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        // 現在のTODOとIDが同じならば処理をする
        todo.inputValue = inputValue;
      }
      // アンマッチには返したいタイプを明示する
      return todo;
    });

    // 更新用関数にconst  newTodo をセットする
    setTodos(newTodos);
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    // フィルターの中、.idは展開されているid全部と現在のIDを比べる条件
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <div>
        <h2>TodoリストTS</h2>
        {/* 空の関数をセット onChangeを採用する */}
        <form onSubmit={(e) => handleSubmit(e)}>
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
        <ul>
          {/* エラー文 hook.js:608 Each child in a list should have a unique "key" prop. */}
          {todos.map(todo => (
            <li key={todo.id}>
              {/* 要素の中にインプット要素を追加する */}
              <input type="text" 
              onChange={(e) => {handleEdit(todo.id, e.target.value)}}
              className="inputText"
              value={todo.inputValue}
              // disabledを活用し、入力欄の制御実装する,タイプTODOから参照する
              disabled={todo.checked}
            />
            <input type="checkbox"
              onChange={() => handleChecked(todo.id, todo.checked)}
            />
            <button onClick={() => handleDelete(todo.id)}>
              削除
            </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
