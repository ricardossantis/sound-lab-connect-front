import React, {useContext} from 'react';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import Mastering from '../../assets/mastering.jpg'
import Mixing from '../../assets/mixing.jpg'
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../App.jsx";

export default function HomeCard(data) {
  const { setMarketplace } = useContext(UserContext);
  const navigate = useNavigate()
  const imageMapping = {
    'mastering': Mastering,
    'mixing': Mixing
  }

  const header = (
    <img className={'headerImg'} src={data?.imageUrl ? data.imageUrl : imageMapping[data.name]}/>
  );

  const footer = (
    <div className="cardFooter">
      <p className={'cardTitle'}>{data.name}</p>
      <p className={'cardInfo'}>{data.description}</p>
    </div>
  );

  return (
      <div className="card flex justify-content-center cardContainer" onClick={() => {
        setMarketplace(data.name)
        navigate('/services')
      }}>
        {data.loading && <div className="border-round border-1 surface-border p-4 surface-card">
          <div className="flex flex-col mb-3">
            <Skeleton width="100%" height="120px"></Skeleton>
            <div>
              <Skeleton width="80%" height="20px" className="mb-2"></Skeleton>
              <Skeleton width="100%" height="20px" className="mb-2"></Skeleton>
              <Skeleton width="90%" height="20px" className="mb-2"></Skeleton>
            </div>
          </div>
        </div>}
        {!data.loading && <Card footer={footer} header={header} className="md:w-25rem"/>}
      </div>
  )
}