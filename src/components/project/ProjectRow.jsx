import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { TimeStampToDate } from '../../utils/Helper';
import Text from '@mui/material/Typography';
import './projectRow.css'
import LabelIcon from '@mui/icons-material/Label';
import { Tooltip } from '@mui/material';

export default function ProjectRow({ project }) {

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');


    const navigateToProjectDetails = () => {
        navigate(`/project/${project.projectId}`);
    }


    return (
        <div className="project-card" onClick={navigateToProjectDetails}>
            <div className='d-flex justify-content-between'>
                <div className="project-card-header">
                    <h5>
                        #{project.projectId} {project.projectName}
                    </h5>
                </div>
                {
                    project.projectCreator.userId == userId &&
                    <Tooltip title="You are the creator of this project">
                        <LabelIcon color='success' />
                    </Tooltip>
                }
            </div>


            <div className="card-body">
                <p className="card-text">{
                    project.projectDetails
                }</p>
                <p className="card-text">
                    <b>Duration: </b>
                    <Text component="span" variant="body2" color="text.primary" >
                        {TimeStampToDate(project.startDate)}
                    </Text>
                    <Text component="span" variant="body2" color="text.primary">
                        {" to "}
                    </Text>
                    <Text component="span" variant="body2" color="text.primary">
                        {TimeStampToDate(project.endDate)}
                    </Text>
                </p>
            </div>
        </div>
    );
}


// {
//     "projectId": 1,
//     "projectName": "Skill Connect",
//     "projectDetails": "Help connect specific skilled people within organisation",
//     "startDate": "2023-06-10",
//     "endDate": "2023-06-10",
//     "isFinished": false,
//     "departmentName": "IT",
//     "usersAssignedProjectList": [
//         {
//             "userId": 1,
//             "name": "test",
//             "email": "test@gmail.com",
//             "password": "$2a$10$yHIALhRu4KU7fpgiiWua4OMhXwDbnJX3pTF6AE25SB83h7ylPrpOu",
//             "departmentName": "IT",
//             "joiningDate": "2023-06-15",
//             "role": "USER",
//             "enabled": true,
//             "accountNonLocked": true,
//             "authorities": [
//                 {
//                     "authority": "USER"
//                 }
//             ],
//             "username": "test@gmail.com",
//             "credentialsNonExpired": true,
//             "accountNonExpired": true
//         }
//     ]
// }
