import axios from "axios";

export const url = 'http://localhost:3000/'

const paths = {
  login: 'user/login',
  changePassword: 'user/changePassword',
  getMarketplaces: 'marketplace/all',
  createService: 'service/create',
  createCheckoutSession: 'service/create-checkout-session'
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

export const createService = (mkName, service, token) => axios.post(`${url}${paths.createService}/${mkName}`,
  { ...service },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }})
  .then(response => response.data)

export const createCheckoutSession = (token) => axios.post(`${url}${paths.createCheckoutSession}`, {}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }})
  .then(response => response.data)