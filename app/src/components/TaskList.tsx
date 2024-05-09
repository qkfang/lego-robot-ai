import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.css";
import TaskModel, { TaskModelProps } from './TaskModel';
import Pusher from 'pusher-js';
import TaskItem from "./TaskItem";

const API_URL = 'http://localhost:4242/api/task/';
const PUSHER_APP_KEY = 'f1586bf9908b2073cda6';
const PUSHER_APP_CLUSTER = 'us2';

const TaskList = () => {

  const [task, setTask] = useState<string>();
  const [tasks, setTasks] = useState<TaskModelProps[]>([]);

  // updateText(e) {
  //   this.setState({ task: e.target.value });
  // }

  // postTask(e) {
  //   e.preventDefault();
  //   if (!this.state.task.length) {
  //     return;
  //   }
  // }
  
  useEffect(() => {
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER
    })
    console.log('useEffect')
    const channel = pusher.subscribe('tasks');
    // You can bind more channels here like this
    // const channel2 = pusher.subscribe('channel_name2')
    channel.bind('inserted',addTask);
    
    // return (() => {
    //   pusher.unsubscribe('tasks')
    // })
  }, []);

  
  const addTask = (newTask : TaskModel) => {
    console.log('addTask')
    console.log(newTask)
    // setTasks([...tasks, newTask]);
    setTasks(ptasks => ([...ptasks, ...[newTask]]));
  }

  const postTask = (event?: React.SyntheticEvent | Event, reason?: string) => {
    const newTask = {
      task: task
    };
    fetch(API_URL + 'new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    }).then(console.log);
  };

  const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    console.log('edit->'+task)
  };



  return (
    <div className={styles.todowrapper}>
      <form>
        <input type="text" className={styles['input-todo']} placeholder="New task" onChange={updateText} value={task} />
        <div className={styles['btn-add']} onClick={postTask}>+</div>
      </form>

      <ul>
        {tasks.map((x, i) => {
          return (
            <TaskItem id={x.id} task={x.task} />
          )
        })
        }
      </ul>
    </div>
  );
}

export default TaskList;