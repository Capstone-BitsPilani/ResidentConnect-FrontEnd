import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4010/api'
});