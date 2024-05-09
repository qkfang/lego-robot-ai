import * as React from 'react';
import { TaskModel } from './TaskModel';


export default function TaskItem(props: TaskModel) {
    
  return (
    <li key={props.task}>
      <div className="text">{props.task}</div>
      {/* <div className="delete" onClick={this._onClick}>-</div> */}
    </li>
  );
}
