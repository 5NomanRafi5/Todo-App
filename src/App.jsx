import { useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import { useState,useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

const toggleFinished = () => {
  setshowFinished(!showFinished)
}


useEffect(() => {
let todostring = localStorage.getItem("todos")
console.log("Loaded from localStorage:", todostring);
if (todostring) {
  let newTodos = JSON.parse(todostring)
  setTodos(newTodos)
 }  
}, []);
const saveToLS = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

useEffect(() => {
  if (todos.length > 0)
{localStorage.setItem("todos", JSON.stringify(todos))}
  else {
    localStorage.removeItem("todos");
  }
}, [todos])




const handleEdit = (e,id) =>{
let t = todos.filter((item)=>{
  return item.id === id 
})
setTodo(t[0].todo)
let newTodos = todos.filter((item)=>{
  return item.id !== id
})
setTodos(newTodos)
saveToLS()
}

const handledelete = (id) => {
let newTodos = todos.filter(item=> {
  return item.id !== id
})
setTodos(newTodos)
saveToLS()
};


  const handleadd =() => {
if (todo.trim() !== ""){
setTodos([...todos,{id: uuidv4(),todo,isCompleted:false}])
}
setTodo("")
saveToLS()
}
  const handlechange = (e) => {
    setTodo(e.target.value)
  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-cyan-100">
      <div className="mx-3 md:container bg-cyan-200 rounded-md py-4 px-5 min-h-[90vh] md:w-1/2 ">
      <h1 className='font-bold text-center text-3xl py-4'>iTask - Manage your todos at one place</h1>
          <h2 className="font-bold text-xl my-5">Add a Todo</h2>
        <div className="Add Todo my-5 flex  gap-4">
          <input onChange={handlechange} value={todo} type="text" className="w-full rounded-lg px-4 py-0.5" />
          <button onClick={handleadd}  className="bg-cyan-500 hover:bg-cyan-700 py-1 px-2 text-white font-bold text-sm  rounded-md">
            Save
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="font-bold text-xl pt-3">Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
         {todos.map(item=>{
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between  md:w-full my-3">
            <div className='flex gap-5'> 
            <input  name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-cyan-500 hover:bg-cyan-700 py-1 px-2 text-white font-bold text-sm mx-1 rounded-md"> <FaEdit/>  </button>
              <button onClick={()=>{handledelete(item.id)}} className="bg-cyan-500 hover:bg-cyan-700 py-1 px-2 text-white font-bold text-sm mx-1 rounded-md"> <MdDelete /> </button>
            </div>
          </div>
          })}
        </div>
      </div> 
        </div>
    </>
  );
}

export default App;
