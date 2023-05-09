import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';





// let tasks2: Array<TaskType> = [
//   { id: 1, title: 'Terminator', isDone: true },

//   { id: 3, title: 'Extra', isDone: false}
// ];

// let tasks3: Array<TaskType> = [
//   { id: 1, title: 'Apples', isDone: true },
//   { id: 2, title: 'Ice Cream', isDone: true },
//   { id: 3, title: 'Milk', isDone: false }
// ];

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

//   let [tasks, setTasks] = useState([
//   { id: v1(), title: 'CSS', isDone: true },
//   { id: v1(), title: 'HTML', isDone: true },
//   { id: v1(), title: 'JavaScript', isDone: true },
//   { id: v1(), title: 'React', isDone: false },
//   { id: v1(), title: 'Redux', isDone: false },
// ]);


function removeTask(id: string, todolistId1: string) {
  let tasks = tasksObj[todolistId1];
  let filteredTasks = tasks.filter( taska => taska.id !== id) 
  tasksObj[todolistId1] = filteredTasks;
  setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let task = { 
      id: v1(), 
      title: title, 
      isDone: false 
    };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task =  tasks.find( taska => taska.id ===taskId);
    if (task) {
      task.isDone = isDone;

      setTasks({...tasksObj});
    }
  }

function changeFilter(value: FilterValuesType, todolistsId: string) {
  let todolist = todolists.find(tl => tl.id === todolistsId);
  if (todolist) {
    todolist.filter = value;
    setTodolists([...todolists])
  }
}


let todolistId1 = v1();
let todolistId2 = v1();


let [todolists, setTodolists] = useState<Array<TodolistType>> ( [
  {
    id: todolistId1, title: 'What to learn', filter: 'active'
  },
  {
    id: todolistId2, title: 'What to buy', filter: 'completed'
  },
]);

let removeTodoList = (todolistId: string) => {
  let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
  setTodolists(filteredTodolist);
  delete tasksObj [todolistId];
  setTasks({...tasksObj});
}
let [tasksObj, setTasks] = useState({
    [todolistId1]: [  
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'JavaScript', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },],
    [todolistId2]: [  
    { id: v1(), title: 'book', isDone: true },
    { id: v1(), title: 'milk', isDone: true },]
})

  return (
    <div className="App">
      {
        todolists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id];

          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(taska => taska.isDone === true);
          }
          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(taska => taska.isDone === false);
          }
          return      <Todolist 
                                key={tl.id}
                                id={tl.id}
                                title={tl.title} 
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodoList={removeTodoList}
          />
        })
      }
    </div>
  );
}



export default App;
