import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4007/api'
  //baseURL: 'https://residentsconnect-dev.srscloudapps.link/api'
});
