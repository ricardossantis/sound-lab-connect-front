import axios from "axios";
import { io } from 'socket.io-client';

const url = 'http://localhost:3000/'
const socket = io(`${url}`);

socket.on('connect', () => {
  console.log('Connected to the socket.io server');
});

const paths = {
  login: 'user/login',
  changePassword: 'user/changePassword',
  getMarketplaces: 'marketplace/all',
  createService: 'service/create'
}

export const login = (user) => axios.post(`${url}${paths.login}`, user).then(response => response.data)

export const changePassword = (password, token) => axios.patch(`${url}${paths.changePassword}`,
  { password },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }})
  .then(response => response.data)

export const getAllMarketplaces = (token) => axios.get(`${url}${paths.getMarketplaces}`, {
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  }})
  .then(response => response.data)
  .catch(err => { throw err })

export const subscribe = (callback) => {
  socket.on("feed", (result) => {
    console.log('1', result)
    result = JSON.parse(result);
    callback(result);
  });
}

export const createService = (mkName, service, token) => axios.post(`${url}${paths.createService}/${mkName}`,
  { ...service },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }})
  .then(response => response.data)