import React from 'react';

export interface TaskModelProps {
    id: number;
    task: string;
}

declare const TaskModel: React.SFC<TaskModelProps>

export default TaskModel