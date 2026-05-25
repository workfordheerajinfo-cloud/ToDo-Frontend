//Naming convention : component will be always in capital letter...

import React, { useEffect, useState } from 'react'
import Create from './Create.jsx'
import axios from 'axios'
import { BsCheckCircleFill, BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

function Home() {
    const [todos, setTodos] = useState([]) // why empty array as initial value because multiple todo list will come from backend so we need to store in an array..

    async function fetchTodos(){ // this function(fetchtodos) brings the data from the backened to the React app and update the UI, why async because because fetching the data from API takes time.
        try{
          const result =   await axios.get("https://todo-backened-4.onrender.com/get")  //sending a get request to backened Api.. wait until the response comes from the server, store the full response in result
        
            console.log(result.data) // prints backend data on console...
            setTodos(result.data) //this update React state with backend datait connects backened with frontend UI and update states with the fetch data., why .data because axios response object contains many things, actual backend data is inside .data
        
        } catch(error){
            console.log(error)

        }
        
        //if request fails, log the error on console..
    }
    // useEffect runs after component renders
// useEffect runs only once when component loads..
    useEffect(() => {
        async function fetchData () { // created another async function inside useEffect. why not directly async function has been created because react does not allows async directly inside the useEffect, that's why we create inner async..
            await fetchTodos(); // call the fetchtodos and wait unitl it completely finishes
        };
        fetchData();  // calling the fetchData, then only fetchdata will run inside the useEffect.
    }, []); // [] this empty array dependencies ensures useEffect runs only once, without this [] , useEffect will run again and again infinitely.

     async function handleEdit(id){  // this runs when user clicks checkBox 
        try{
            await axios.put("https://todo-backened-4.onrender.com/update/"+id)  // update the todo in backened
            
            await fetchTodos(); //  and fetches the latest updated data again in the browser, this refreshes the UI

        } catch(error){
            console.log(error)

        }

    }
    async function handleDelete(id){  // this runs when user clicks the delete icon
        try{
            await axios.delete("https://todo-backened-4.onrender.com/delete/"+id)  // delete the todo from backened
            await fetchTodos();  // and fetches the latest updated data again
        } catch(error){
            console.log(error)
        }

    }


    return (
        <div className="home">
            <h2>Todo List</h2>
            {/* When you add a todo → call fetchTodos() again → refresh list */}
            {/* when new todo added create component calls refreshTodos which is fetchtodos, so UI refreshes automatically */}
            <Create refreshTodos={fetchTodos} />  

            {todos.length === 0 ? ( // if no todo exist is or no todo exist in the backend is or if array is empty is true then show No Record
                <div><h2>No Record</h2></div>
            ) : ( // if false, map means Loop through every item and create JSX for each item.

                todos.map(todo => (
                    // react uses key to identify the unique identity
                    <div className="task" key={todo._id}> 
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? // if todo is completed is true
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill> // checked the icon
                            : <BsCircleFill className='icon' />  // if false show empty circle
                            }
                            {/* if todo is completed is true then pass a line through task if false nothing */}
                            {/* todo.task means display the actual task */}

                        <p className={todo.done ? "line_through": ""}>{todo.task}</p>  
                        </div>
                        <div>
                            {/* when trash icon clicked runs handleDelete */}
                            <span><BsFillTrashFill className='icon' onClick={()=> handleDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Home
 