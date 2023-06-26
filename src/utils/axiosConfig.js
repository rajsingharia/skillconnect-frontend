
import axios from 'axios';

const getAuthApi = () => {
    return axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        }
    });
}


const getApi = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': `Bearer ${token}`
        }
    });
};



export { getAuthApi, getApi };