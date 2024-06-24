import { useEffect, useRef, useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [taskInput, setTaskInput] = useState('');
  const [taskArr, setTaskArr] = useState([]);
  const [margin, setMargin] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [indexOfUpdate, setIndexOfUpdate] = useState(null);
  const [searchingTask, setSearchingTask] = useState(false);
  const [searchResults, setSearchResults] = useState([]);



// a function to select task for update:
const inputElement = useRef();
let finalTaskArr = taskArr;

const selectEditTask = (index) => {
  if(!searchingTask){
  inputElement.current.focus();
  setIndexOfUpdate(index);
  setUpdateTask(true);
  setTaskInput(finalTaskArr[index]);
  }
}


// A function to add or update task in a task row:
  const addOrUpdate = () => {
    if(taskInput !== ''){
      if(!updateTask){
        finalTaskArr.push(taskInput);
        setTaskArr(finalTaskArr);
        setTaskInput('');
        toast.success('Task added!', {theme : 'dark'});
      }
      else{
      finalTaskArr[indexOfUpdate] = taskInput;
      setTaskInput('');
      setUpdateTask(false);
      toast.success('Task updated!', {theme : 'dark'});
      }
  }
  else{
    toast.error('Oops! Add a task.', {theme : 'dark'});  
  }
  }

// a function to delete task:

  const deleteTask = (indexNumber) => {
      let otherTask = taskArr.filter((task, i) => i != indexNumber);  
      setTaskArr(otherTask);
      setUpdateTask(false);
      setTaskInput('');
      toast.success('Task deleted!', {theme : 'dark'});
  }

  // a function to search given task:
  let matchingTask;
  const searchtask = () => {
   if(!searchingTask){
    setSearchingTask(true);
    matchingTask = taskArr.filter(task => task.toLowerCase().includes(taskInput.toLowerCase()));
    if(matchingTask.length > 0){
      setSearchResults(matchingTask);
    }
    else{
      toast.error('No task found!', {theme : 'dark'})
    }
    // console.log('Searching task is set to True');
    // console.log(matchingTask)
   }
   else{
    setSearchingTask(false);
    setSearchResults([]);
    // console.log('Searching task is set to False');
   }
  }


  // setting margin top for the task row:
  useEffect(() => {
    if(taskArr.length > 0){
      setMargin(true);
    }
    else{
      setMargin(false);
    }
  },[taskArr.length])

  return (
    <div className="bg-slate-900 w-full h-screen p-10">
      <ToastContainer />
      <h1 className='text-white text-5xl font-bold text-center '>To Do List</h1>
      <div className='app-box bg-slate-700 w-[700px] h-auto mx-auto my-10 p-6 rounded-xl shadow-md'>
        <div className="first-row flex justify-center items-center gap-5">
          <div className="input-div flex items-center basis-[70%]">
              <input type="text" spellCheck="false" value={taskInput} onChange={(e)=>{setTaskInput(e.target.value); setSearchingTask(false);}} name="input" className='rounded-tl-lg rounded-bl-lg p-2 w-full outline-none ' ref={inputElement}/>
              <button type='button' onClick={searchtask} className='searchBtn hover:bg-slate-950 transition-all duration-400 cursor-pointer bg-slate-900 w-20 h-10 rounded-tr-lg rounded-br-lg flex justify-center items-center text-white text-lg'>
                {
                  searchingTask ? <FontAwesomeIcon icon={faXmark}/> : <FontAwesomeIcon icon={faMagnifyingGlass}/>
                }
              
              </button>
            </div>
          <div className="add-task basis-[30%] flex justify-center gap-3">

            <button onClick={addOrUpdate} className='bg-slate-900 text-white p-2 rounded-lg w-full hover:bg-slate-950 transition-all duration-400'>{updateTask ? 'Update task' : 'Add task'}</button>
            
            {
              updateTask ? <button className='bg-slate-900 text-white px-5 rounded-lg text-lg hover:bg-slate-950 transition-all duration-400' onClick={()=>{setUpdateTask(false); setTaskInput('')}}><FontAwesomeIcon icon={faXmark} /></button> : ''
            }
          </div>
        </div>


        <div className={`task-row ${margin ? 'mt-10' : ''}`}>
{

 searchingTask ?  searchResults.map((value,index) => {
    return <div className="task bg-slate-900 p-5 rounded-md text-white mt-3 flex justify-between items-center gap-3" key={index}>
    <div className="task-text">
      <p className='text-justify task-para'>{value}</p>
    </div>
    <div className="task-opr flex items-center gap-3">
  {/* <button className='updateBtn bg-slate-800 w-8 h-8 rounded-full hover:bg-slate-950 transition-all duration-400' onClick={()=>selectEditTask(index)}><FontAwesomeIcon icon={faPencil} /></button>
  <button className='deleteBtn bg-slate-800 w-8 h-8 rounded-full hover:bg-slate-950 transition-all duration-400' onClick={()=>deleteTask(index)}><FontAwesomeIcon icon={faTrash}/></button> */}
    </div>
  </div>
  })
:
taskArr.map((value,index) => {
  return <div className="task bg-slate-900 p-5 rounded-md text-white mt-3 flex justify-between items-center gap-3" key={index}>
  <div className="task-text">
    <p className='text-justify task-para'>{value}</p>
  </div>
  <div className="task-opr flex items-center gap-3">
<button className='updateBtn bg-slate-800 w-8 h-8 rounded-full hover:bg-slate-950 transition-all duration-400' onClick={()=>selectEditTask(index)}><FontAwesomeIcon icon={faPencil} /></button>
<button className='deleteBtn bg-slate-800 w-8 h-8 rounded-full hover:bg-slate-950 transition-all duration-400' onClick={()=>deleteTask(index)}><FontAwesomeIcon icon={faTrash}/></button>
  </div>
</div>
})

}

        </div>
      </div>
    </div>
  )
}

export default App
