import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getApi, getAuthApi } from '../../utils/axiosConfig';
import CreateProjectForm from '../../components/project/CreateProjectForm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CustomButtonGroup from '../../components/general/buttonGroup/CustomButtonGroup';
import { IoAddCircleOutline } from "react-icons/io5"
import { Alert } from '@mui/material';
import ProjectRow from '../../components/project/ProjectRow';
import Spinner from '../../components/general/spinner/Spinner';
import ListOfProject from './ListOfProject/ListOfProject';


export default function MyProjects() {

  const api = getApi();
  const authApi = getAuthApi();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userProjects, setUserProjects] = useState([]);
  const [projectType, setProjectType] = useState('user');
  const [projectTypeToggleState, setProjectTypeToggleState] = useState('My');
  const [open, setOpen] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);

  const navigate = useNavigate();

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const handleNavigateToLogin = () => {
    //send alert to login page to show alert
    navigate('/login', { replace: true, state: { alert: 'You need to login first' } });
  }


  useEffect(() => {

    const fetchUserProjects = async () => {

      setIsLoading(true);

      api.get(`api/v1/project/${projectType}`)
        .then(function (response) {
          setUserProjects(response.data);
        })
        .catch(function (error) {
          if (error.response && error.response.status == 403) {
            handleNavigateToLogin()
            return;
          }
          setError(error.response.data.message);
        })
        .finally(function () {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          // setIsLoading(false);
        });

      authApi.get('api/v1/department/get-all')
        .then(function (response) {
          setDepartmentList(response.data);
        })
        .catch(function (error) {
          if (error.response && error.response.status == 403) {
            handleNavigateToLogin()
            return;
          }
          setError(error.response.data.message);
        });

    }

    fetchUserProjects();

  }, [projectType, projectCreated]);

  const changeProjectToggle = (event) => {
    setProjectTypeToggleState(event.target.name);
    if (event.target.name === 'My') {
      setProjectType('user')
    } else if (event.target.name === 'All') {
      setProjectType('all');
    }
  };


  return (
    <>
      {
        !error &&
        <div className="d-flex justify-content-between mb-3">
          <CustomButtonGroup
            buttons={["My", "All"]}
            changeProjectToggle={changeProjectToggle}
            projectTypeToggleState={projectTypeToggleState}
          />

          <Button
            className="btn btn-outline-dark"
            type="button"
            onClick={handleClickToOpen}
            startIcon={<IoAddCircleOutline />}
            variant="outlined"
            color="success">
            Create New Project
          </Button>
        </div >
      }

      {
        isLoading &&
        <div className='d-flex justify-content-center'>
          <div className='loading-body'>
            <h6>Loading</h6>
            <Spinner />
          </div>
        </div>
      }

      {
        error &&
        <div className='d-flex justify-content-center mt-5'>
          <Alert severity="error">{error}</Alert>
        </div>
      }
      {
        !isLoading && !error &&
        <ListOfProject userProjects={userProjects} />
      }
      {

      }

      {
        !isLoading && !error &&
        <CreateProjectDialog
          open={open}
          handleToClose={handleToClose}
          setProjectCreated={setProjectCreated}
          setError={setError}
          handleNavigateToLogin={handleNavigateToLogin}
          departmentList={departmentList}
        />
      }
    </>
  )

}

function CreateProjectDialog({
  open,
  handleToClose,
  setProjectCreated,
  setError,
  handleNavigateToLogin,
  departmentList
}) {
  return (
    <div >
      <Dialog
        open={open}
        onClose={handleToClose}
        fullWidth={true}
        maxWidth='lg'>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CreateProjectForm
              setProjectCreated={setProjectCreated}
              setError={setError}
              handleNavigateToLogin={handleNavigateToLogin}
              handleToClose={handleToClose}
              departmentList={departmentList} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose}
            color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

