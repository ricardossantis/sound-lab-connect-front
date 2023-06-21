import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../App";
import './index.scss'
import { Carousel } from 'primereact/carousel';
import {getAllMarketplaces, createService, subscribe} from "../../api/api";
import projectCard from "./HomeCard"
import {toast} from "react-toastify";
import {Message} from "primereact/message";

export const Home = () => {
  const { setMarketplaces, marketplaces, userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true)
  const [socketRabbit1, setSocketRabbit1] = useState('first')
  const [socketRabbit2, setSocketRabbit2] = useState()

  useEffect(() => {
    const getMarketplaces = async () => {
      setLoading(true)
      try {
        const fetchedMarket = await getAllMarketplaces(userData.token)
        setMarketplaces(fetchedMarket)
      } catch (err) {
        toast.error(err.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      } finally {
        setLoading(false)
      }
    }
    getMarketplaces()

   
    subscribe((result) => {
      console.log('1', result)
        setSocketRabbit1(JSON.stringify([...socketRabbit1, result]))
      }, 'mixing')

    subscribe((result) => {
      setSocketRabbit2(JSON.stringify(result))
    }, 'mastering')
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
    await createService(mkName, service, userData.token)
  }

  return (
    <div className="mainContainer">
        <div className={'homeIntro'}>
          <p className={'homeTitle'}>Market Places</p>
        </div>
        <div className={'carouselContainer'}>
          <Carousel value={marketplaces && !!marketplaces.length ?
            marketplaces.map(project => ({...project, loading})) :
            Array(4).fill(0).map(() => ({ loading }))} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={projectCard} />
          {marketplaces && !loading && !marketplaces.length && <div className="successContainer">
            <Message severity="info" text={'Nenhum mercado cadastrado'} />
          </div>}
        </div>
        <div className="temporaryRabbit">
            <p>{socketRabbit1 && socketRabbit1}</p>
            <button onClick={() => handleCreateService('mixing', {title: 'teste1', description: 'testando1', price: 10})}>Create Service1</button>
        </div>
        <div className="temporaryRabbit">
          <p>{socketRabbit2 && socketRabbit2}</p>
          <button onClick={() => handleCreateService('mastering', {title: 'teste2', description: 'testando2', price: 20})}>Create Service2</button>
        </div>
    </div>
  )
}