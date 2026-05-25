import React, { useState } from 'react'
import axios from 'axios'

function Create({ refreshTodos }) { //create is a child component and received refreshTodos props from parent component, parent componet says after adding the task, call me to refresh the list
  const [task, settask] = useState("");  // "" it means initial value with empty string, why state has been written on top becaue many function below will use it.

   async function handleAdd(){// this function runs when user clicks the add button, create a varibale handleAdd and store a function inside it, when you use const you must assign the value , so you must use =
    try{
      if (!task.trim()) return; // Prevent empty tasks and exit the function
    await axios.post("https://todo-backened-4.onrender.com/add", { task }) // sends posts requests to the server and it waits until the request is completed. if await is not written then immediately next line runs and if await is written then until and unless request is finished next line does not run...
       
        settask("") // Clears input box so that the user can type the task again
        if (typeof refreshTodos === 'function') {  // check whether refreshTodos is acutally a function or not, 
          refreshTodos(); // if yes then  call the parent function to refresh the task list, typeof means tells the datatype of something,,, refreshtodos() means calls the parent function and Parent component will re-fetch all todos from database/backend. So newly added task appears immediately on screen.


        
        }
      
    } catch(error){// if request fails, log the error
      console.log(error)
    }
    
       
  };
 
  

  return (  // this is what user sees in the browser, jsx is crated in last becaue it uses evertything written above.
    //onsubmit prevent page reload
    <form className="create_form" onSubmit={e => e.preventDefault()}> 
      <input
        type="text"
        placeholder="Enter task"
        value={task} // this means input value will always come from react state. react is controlling the input.. so this is called the controlled input..
        onChange={e=>settask(e.target.value)}  // updates the states on typing, this lines runs every time when user type something, this line runs when input value changes..onChange is an event handler
      />
      {/* on click the Add button, run the handleAdd function */}
      <button type="button" onClick={handleAdd}>Add</button>  
    </form>
  );
}

export default Create;
