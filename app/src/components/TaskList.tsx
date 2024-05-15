import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.css";
import TaskModel, { TaskModelProps } from './TaskModel';
import Pusher from 'pusher-js';
import TaskItem from "./TaskItem";

const API_URL = 'http://localhost:4242/api/task/';
const PUSHER_APP_KEY = 'f1586bf9908b2073cda6';
const PUSHER_APP_CLUSTER = 'us2';


interface taskListProps {
  userId: string,
}

const TaskList = (props: taskListProps) => {

  const [task, setTask] = useState<string>();
  const [tasks, setTasks] = useState<TaskModelProps[]>([]);
  const [userId, setUserId] = useState<string>();

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
    // console.log('useEffect')
    const channel = pusher.subscribe('tasks');
    // You can bind more channels here like this
    // const channel2 = pusher.subscribe('channel_name2')
    channel.bind('inserted', addTask);
    // console.log(props);
    setUserId(props.userId);

    return (() => {
      pusher.unsubscribe('tasks')
    })
  }, []);


  const addTask = (newTask: TaskModel) => {
    console.log('addTask')
    console.log(newTask)
    // setTasks([...tasks, newTask]);
    setTasks(ptasks => ([...ptasks, ...[newTask]]));
  }

  const postTask = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (task != '') {
      const newTask = {
        task: "User-" + userId + " said : " + task
      };
      fetch(API_URL + 'new', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      }).then(console.log);
      setTask('');
    }
  };

  const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    // console.log('edit->' + task)
  };



  return (
    <div className={styles.todowrapper}>
      <b>Your name is [User-{userId}]</b>
      <p>Note: Open 2 windows to simulate a chat using mongodb change stream.</p>
      <form>
        <input type="text" className={styles['input-todo']} placeholder="Say something." onChange={updateText} value={task} />
        <div className={styles['btn-add']} onClick={postTask}>Send</div>
      </form>

      <ul className="ultask">
        {tasks.map((x, i) => {
          return (
            <li className="litask" key={x.id}>
              <div className="text">{x.task}</div>
              {/* <div className="delete" onClick={this._onClick}>-</div> */}
            </li>
          )
        })
        }
      </ul>
    </div>
  );
}

export default TaskList;