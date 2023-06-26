import React, {useContext, useState} from 'react';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import Mastering from '../../assets/mastering.jpg'
import Mixing from '../../assets/mixing.jpg'
import { createCheckoutSession } from '../../api/api.js'
import {UserContext} from "../../App.jsx";
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import Chat from './Chat'

export default function ServiceCard({service, socket}) {
  const { userData } = useContext(UserContext);
  const [visible, setVisible] = useState(false)
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
      <p className={'cardInfo'}>Owner: {service.owner}</p>
      <div className={'cardButtons'}>
        <Button onClick={async () => {
          const username = userData.username
          const room = `${username}_${service.owner}`
          socket.emit('joinChat', { username, room });
          setVisible(true)
        }}>
          Chat
        </Button>
        <Button onClick={async () => {
          const { url } = await createCheckoutSession(userData.token)
          window.location = url
        }}>
          Pay
        </Button>
      </div>
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
        <Dialog header="Chat" visible={visible} style={{ width: '80vw' }} onHide={() => setVisible(false)}>
          <Chat socket={socket} username={userData.username} room={`${userData.username}_${service.owner}`} setVisible={setVisible}/>
        </Dialog>
        {!service.loading && <Card footer={footer} header={header} className="md:w-25rem"/>}
      </div>
  )
}