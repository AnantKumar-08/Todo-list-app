import { useState, useRef, useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const inputBlock = useRef(null)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const handleAdd = (e) => {
      if (input.length > 3){
        const newTodos = [...todos, { id: uuidv4(), text: input, isCompleted: false }]
        setTodos(newTodos)
        setInput('')
      }
  }

  const handleDone = (e) => {
    const doneId = e.currentTarget.name;
    const newTodos = todos.map(e =>
      e.id === doneId ? { ...e, isCompleted: true } : e
    );
    setTodos(newTodos);
  }

  const handleEdit = (e) => {
    const editId = e.currentTarget.name;
    let inp = '';
    todos.map(obj => { obj.id === editId ? inp = obj.text : obj })
    setInput(inp)
    const newTodos = todos.filter(todo => todo.id !== editId)
    setTodos(newTodos)
    inputBlock.current.focus()
  }

  const handleDelete = (e) => {
    const deleteId = e.currentTarget.name
    const newTodos = todos.filter(todo => todo.id !== deleteId)
    setTodos(newTodos)
  }



  return (
    <>
      <div className='bg-gradient-to-br from-black via-gray-900 to-gray-950 h-[100vh] text-white flex flex-col items-center'>
        <h1 className='text-3xl font-bold py-8'>iTask - Manage Your Tasks</h1>
        <div className='bg-gray-800 border-gray-700 border-2 w-[40%] h-[8%] rounded-xl flex items-center justify-between'>
          <input ref={inputBlock} value={input} onChange={(e) => { setInput(e.target.value) }} type="text" placeholder='Add a new task...' className='rounded-[8px] bg-gray-700 text-white placeholder-gray-400 ml-2 h-[75%] w-[85%] pl-4' />
          <button onClick={handleAdd} className='bg-purple-600 w-[13%] h-[75%] rounded-[8px] font-bold mx-2 hover:cursor-pointer hover:bg-purple-700'>Add</button>
        </div>

        {todos.length > 0 && todos.map((item) => {
          const isDone = item.isCompleted;

          return (<div key={item.id} className={`border-2 w-[40%] min-h-[8%] rounded-xl flex items-center mt-6 justify-between ${isDone ? "bg-gradient-to-r from-green-700 to-green-900 border-green-600 text-green-200" : "bg-gray-900 border-gray-600 text-white"}`}>
            <div className='flex gap-2 ml-2'>
              <button name={item.id} onClick={handleDone}><IoCheckmarkDoneCircle className={`${isDone? 'text-green-300': 'text-purple-400 hover:text-purple-500'} hover:cursor-pointer text-3xl`} /></button>
              <h2 className={`${isDone?"line-through":""}`}>{item.text}</h2>
            </div>
            <div className="buttons flex gap-2 mr-2">
              <button name={item.id} onClick={handleEdit}><FaRegEdit className='text-red-400 hover:text-red-500 hover:cursor-pointer text-3xl' /></button>
              <button name={item.id} onClick={handleDelete}><MdDeleteForever className='text-red-400 hover:text-red-500 hover:cursor-pointer text-3xl' /></button>
            </div>
          </div>)
        })}

      </div>
    </>
  )
}

export default App
