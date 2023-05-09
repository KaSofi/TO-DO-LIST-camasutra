
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistsId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}
export function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id); 
            setNewTaskTitle('');
        } else {
            setError('field is required');
        }
    } 

    const onNewTitleChangeHandler  = (e:
        //  { currentTarget: { value: React.SetStateAction<string>; }; }
        ChangeEvent<HTMLInputElement>
        ) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHendler = (e: 
        // { ctrlKey: any; key: string; }
        KeyboardEvent<HTMLInputElement>
        ) => {
        setError(null);
        if (e.key === 'Enter') {
            // props.addTask(newTaskTitle);
            // setNewTaskTitle('');
            addTask();
        }
    }


    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => {
        props.removeTodoList(props.id);
    }
    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>X</button> </h3>
            <div>
                <input value={newTaskTitle} 
                        onChange={onNewTitleChangeHandler}
                        onKeyDown={onKeyPressHendler}
                        // className={"error" ? 'error' : ''}
                        />
                <button onClick={addTask}>+</button>
                {error && <div className="arror-message">{error}</div>}
            </div>
            <ul>
            {
                props.tasks.map( taska => {

                    const onRemoveHandler = () => {
                        props.removeTask(taska.id, props.id);
                    }
                    const onChangeHendler = (e: ChangeEvent<HTMLInputElement>) => { 
                        props.changeTaskStatus(taska.id, e.currentTarget.checked, props.id );
                        }
                        
                    return <li key={taska.id} className={taska.isDone ? "is-done" : ''}>
                            <input type="checkbox" 
                                    checked={taska.isDone}
                                    onChange={onChangeHendler}
                            />
                            <span>{taska.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                    </li>
            })
            }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ''} 
                        onClick={onAllClickHandler}>ALL</button>
                <button className={props.filter === 'active' ? "active-filter" : ''}
                        onClick={onActiveClickHandler}>ACTIVE</button>
                <button className={props.filter === 'completed' ? "active-filter" : ''}
                        onClick={onCompletedClickHandler}>COMPLETED</button>
            </div>
        </div>
    )
};

