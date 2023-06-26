
import React from 'react'
import ProjectRow from '../../../components/project/ProjectRow'

export default function ListOfProject({ userProjects }) {
    return (
        <div>
            {
                userProjects.map((project) => {
                    return <ProjectRow project={project} key={project.projectId} />
                })
            }
        </div>
    )
}
