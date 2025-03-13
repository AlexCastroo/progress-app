import React from 'react'
import AppLayout from '@/Layouts/AppLayout'

export default function Project( props ) {
    const project = props.project;

  return (
    <AppLayout project={project}>
        <div>Project Summary - Coming soon...</div>
    </AppLayout>
  )
}
