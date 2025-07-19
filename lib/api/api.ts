import axios from 'axios';



// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});



export { nextServer };