
import React from 'react'
import ProjectRow from '../../../components/project/ProjectRow'
import { motion } from 'framer-motion'

export default function ListOfProject({ userProjects }) {
    return (
        <div>
            {
                userProjects.map((project, idx) => {
                    return <motion.div
                        key={project.projectId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}>
                        <ProjectRow project={project} />
                    </motion.div>
                })
            }
        </div>
    )
}
