import React from 'react';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';

export default function HomeCard(data) {
  const header = (
    <p className={'cardTitle'}>Placeholder</p>
  );

  const footer = (
    <div className="cardFooter">
      <p className={'cardTitle'}>{data.name}</p>
      <p className={'cardInfo'}>{data.description}</p>
    </div>
  );

  return (
      <div className="card flex justify-content-center cardContainer">
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