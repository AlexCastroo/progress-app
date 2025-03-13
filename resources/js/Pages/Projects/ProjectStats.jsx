import React from 'react'
import AppLayout from '@/Layouts/AppLayout'

export default function ProjectStats( props ) {
    const project = props.project;

    console.log("Project => ", project);

  return (
    <AppLayout project={project}>
        <div>This module active soon...</div>
        <h1>{project.name}</h1>
        <p>Total tasks: {props.totalTasks}</p>
        <p>Completed Task: {props.completedTasks}</p>
        <p>Pending Tasks: {props.pendingTasks}</p>
    </AppLayout>
  )
}
