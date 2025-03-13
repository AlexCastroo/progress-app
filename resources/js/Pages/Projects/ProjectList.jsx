import React from 'react'
import { useState, useEffect } from 'react';
import { CgAddR } from "react-icons/cg";
import { Inertia } from '@inertiajs/inertia';
// Stylesheets
import '../../../css/ProjectList.css';
import axios from 'axios';

function ProjectList( props ) {

    console.log(props);

    const handleProjectClick = (project) => {
        console.log(project);
        Inertia.visit(`/projects/${project.id}`);
    }

    return (
        <>
            <div class="motivational-quote">
                <h1>{props.motivationalQuote}</h1>
            </div>
            <div class="container-projects">
                <div class="project-list">
                    {props.projects.map((project) => (
                        <div class="card" key={project.id} onClick={() => handleProjectClick(project)}>
                            <h5 class="card-title">{project.name}</h5>
                            <p class="card-text">{project.description}</p>
                        </div>
                    ))}
                </div>

                <button class="icon-btn">
                    <CgAddR class="react-icon" />Añadir nuevo proyecto
                    </button>
            </div>
        </>

    )
}

export default ProjectList
