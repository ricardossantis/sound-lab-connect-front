import React from 'react';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import Mastering from '../../assets/mastering.jpg'
import Mixing from '../../assets/mixing.jpg'

export default function ServiceCard({service}) {
  const imageMapping = {
    'mastering': Mastering,
    'mixing': Mixing
  }

  const header = (
    <img className={'headerImg'} src={service?.imageUrl ? service.imageUrl : imageMapping[service.marketplace]}/>
  );

  const footer = (
    <div className="cardFooter">
      <p className={'cardTitle'}>{service.marketplace}</p>
      <p className={'cardInfo'}>{service.description}</p>
      <p className={'cardInfo'}>Price: {service.price}</p>
    </div>
  );

  return (
      <div className="card flex justify-content-center cardContainer">
        {service.loading && <div className="border-round border-1 surface-border p-4 surface-card">
          <div className="flex flex-col mb-3">
            <Skeleton width="100%" height="120px"></Skeleton>
            <div>
              <Skeleton width="80%" height="20px" className="mb-2"></Skeleton>
              <Skeleton width="100%" height="20px" className="mb-2"></Skeleton>
              <Skeleton width="90%" height="20px" className="mb-2"></Skeleton>
            </div>
          </div>
        </div>}
        {!service.loading && <Card footer={footer} header={header} className="md:w-25rem"/>}
      </div>
  )
}