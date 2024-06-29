import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE5NjkxMjM5LCJleHAiOjE3MjIyODMyMzl9.8xbGJF1dFeDw1PUySUyjBdYYwGFJTAJJj7dn6BIOc6c'
  },
});

export default api;
