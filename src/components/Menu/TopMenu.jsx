import React, {useRef} from 'react';
import { SlideMenu } from 'primereact/slidemenu';
import "./index.scss";
import { Button } from 'primereact/button';
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import {  useLocation } from 'react-router-dom';

export const TopMenu = () => {
  const userMenu = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setLogin, userData, setUserData } = useContext(UserContext);

  const locationTextMap = {
    '/': 'HOME',
  }

  const userItems = [
    {
      label:'Logout',
      icon:'pi pi-fw pi-power-off',
      command: () => {
        setLogin(false)
        setUserData({})
        setMarketplaces([])
        localStorage.clear();
        navigate('/')
      }
    }
  ];

  return (
      <div className="menuContainer">
        <SlideMenu className="userMenu" ref={userMenu} model={userItems} popup></SlideMenu>
        <img className="logoImg" alt="logo icon" src={""} />
        <p className={'projectP'}>{locationTextMap[location.pathname]}</p>
        <Button className="userMenuButton" type="button" icon={<h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{marginRight: "5px",fontSize: "30px", color: "violet"}}></i></h4>} label={userData.username} onClick={(event) => userMenu.current.toggle(event)}></Button>
      </div>
  )
  }