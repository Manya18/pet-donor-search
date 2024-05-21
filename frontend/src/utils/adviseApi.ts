import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

export const fetchAdvises = () => {
    console.log('ei')
    return instance.get('/advise');
  };

// export const postSomeData = (data) => {
//   return instance.post('/some-endpoint', data);
// };
