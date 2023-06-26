import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../App";
import './index.scss'
import { Carousel } from 'primereact/carousel';
import {createService, url} from "../../api/api";
import ServiceCard from "./ServiceCard.jsx"
import {io} from "socket.io-client"
import { Button } from 'primereact/button'

export const Marketplace = () => {
  const socket = io(`${url}`);
  const { marketplace, userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true)
  const [socketRabbit, setSocketRabbit] = useState([])

  socket.on('connect', () => {
    console.log('Connected to the socket.io server');
  });

  const subscribe = (callback, queue) => {
    socket.on(`${queue}-feed`, (result) => {
      result = JSON.parse(result);
      callback(result);
    });
  }

  const subscribeUser = (callback, queue) => {
    socket.on(`${queue}`, (result) => {
      console.log('1', result)
      result = JSON.parse(result);
      callback(result);
    });
  }

  useEffect(() => {
    subscribe((result) => {
      const parsedResult = result.map(item => JSON.parse(item.msg))
      setSocketRabbit(parsedResult)
      }, marketplace)

    subscribeUser((result) => {
      console.log('2', result)
    }, userData.username)
    }, [])

  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '460px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const handleCreateService = async (mkName, service) => {
    const newService = await createService(mkName, service, userData.token)
    setSocketRabbit([...socketRabbit, newService])
  }

  return (
    <div className="mainContainer">
        <div className={'homeIntro'}>
          <p className={'homeTitle'}>{marketplace.toUpperCase()}</p>
        </div>
        <div className={'carouselContainer'}>
          {socketRabbit && <Carousel value={socketRabbit.map((service) => ({ service, socket }))} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={ServiceCard} />}
        </div>
      <div className="temporaryRabbit">
          <Button onClick={() => handleCreateService(marketplace, {title: 'teste1', description: 'testando1', price: 1000})}>Create Service</Button>
      </div>
    </div>
  )
}