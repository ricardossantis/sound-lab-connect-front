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
  const [socketRabbit, setSocketRabbit] = useState()

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
        setSocketRabbit(JSON.stringify(result))
      })
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
    await createService('mixing', {title: 'teste', description: 'testando', price: 10}, userData.token)
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
            <p>{socketRabbit && socketRabbit}</p>
            <button onClick={handleCreateService}>Create Service</button>
        </div>
    </div>
  )
}