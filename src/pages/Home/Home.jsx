import React, { useEffect, useState } from 'react'
import { getApi } from '../../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'
import './home.css'
import Filter from './Filter/Filter'
import ListOfPost from './ListOfPost/ListOfPost'
import { IoAddCircleOutline } from "react-icons/io5"
import CreatePostForm from '../../components/post/CreatePostForm'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Spinner from '../../components/general/spinner/Spinner'


export default function Home() {

  const api = getApi();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const [postSaved, setPostSaved] = useState();


  //filter state
  const [filter, setFilter] = useState({
    departmentId: null,
    priority: null,
    skill: null,
    sort: 0
  });



  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login', { replace: true, state: { alert: 'You need to login first' } });
  }


  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const saveOrUnsavePost = (postId) => {

    const postIsSaved = posts.find((post) => post.postId == postId).isSaved;

    

    const endPoint = postIsSaved ? `/api/v1/user/un-save-post/${postId}` : `/api/v1/user/save-post/${postId}`;

    api.get(endPoint)
      .then((response) => {
        setPostSaved(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status == 403) {
          handleNavigateToLogin()
          return;
        }
        setError(error.response.data.message);
      });

  }

  useEffect(() => {

    console.log('postSaved', postSaved);

    const fetchData = async () => {

      setIsLoading(true);

      api.get('/api/v1/post/all', {
        params: filter
      }).then(function (response) {
        console.log(response.data);
        setPosts(response.data);
      })
        .catch(function (error) {
          console.log(error);
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
    };

    fetchData();

  }, [filter, postCreated, postSaved]);

  return (
    <>
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
        </div >
      }

      {
        !isLoading && !error &&
        <CreatePostDialog
          open={open}
          handleToClose={handleToClose}
          setPostCreated={setPostCreated}
          setError={setError}
          handleNavigateToLogin={handleNavigateToLogin}
        />
      }

      {
        !isLoading && !error &&
        <div className="d-flex justify-content-end mb-3">
          <Button
            className="btn btn-outline-dark"
            type="button"
            onClick={handleClickToOpen}
            startIcon={<IoAddCircleOutline />}
            variant="outlined"
            color="success">
            Create New Post
          </Button>
        </div>
      }
      {
        !isLoading && !error && posts &&
        <div className='home-body'>
          <div className='home-body-left'>
            <Filter
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <div className='home-body-right'>
            <ListOfPost
              posts={posts}
              saveOrUnsavePost={saveOrUnsavePost}
            />
          </div>
        </div>
      }
    </>
  )
}

function CreatePostDialog({ open, handleToClose, setPostCreated, setError, handleNavigateToLogin }) {
  return (
    <div >
      <Dialog
        open={open}
        onClose={handleToClose}
        fullWidth={true}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CreatePostForm
              setPostCreated={setPostCreated}
              setError={setError}
              handleNavigateToLogin={handleNavigateToLogin}
              handleToClose={handleToClose}
            />
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
