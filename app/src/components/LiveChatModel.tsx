import React from 'react';

export interface TaskModelProps {
    id: number;
    task: string;
}

declare const LiveChatModel: React.SFC<TaskModelProps>

export default LiveChatModel