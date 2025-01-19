import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState([])
  
  const [showFinished, setshowFinished] = useState(true)

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const saveToLS = () =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto w-[40%] my-5 p-5 rounded-xl bg-violet-100 min-h-[85vh]">
      <h1 className="text-[25px] font-bold text-center my-1">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-4">
          <h2 className='text-xl font-bold mb-4'>Add a Todo</h2>
          <div className='flex gap-0'>
          <input onChange={handleChange} value={todo} type="text" className='w-[90%] rounded-2xl px-3 py-1 pb-1 ' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-600 hover:bg-violet-800 disabled:bg-violet-500 px-3 py-1 text-sm mx-4 text-white rounded-xl'>Save</button>

          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label className='my-2 ml-2'>Show Finished</label>
        <div className='flex items-center justify-center'>
        <div className='h-[1px] bg-black opacity-20 w-[90%] my-4'></div>

        </div>
        <h2 className="font-bold text-xl items-center flex">
          Your Todos
        </h2>
        <div className="todos">
          {todos.length === 0 && <div className='my-5'>No Todos to display</div>}
          {todos.map(item => {

            return (!item.isCompleted || showFinished) && <div key={item.id} className="todo flex w-full justify-between my-3">
              <div className='flex gap-2 '>
                <input name={item.id} id="" onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through text-wrap w-1/2 px-4" : "w-1/2 text-wrap px-4"}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button  onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-600 hover:bg-violet-800 p-2 py-1 text-sm mx-2 text-white rounded-md'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 p-2 py-1 text-sm mx-1 text-white rounded-md'><MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
