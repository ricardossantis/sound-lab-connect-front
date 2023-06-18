import React from 'react';
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext} from "../../App";
import {Button as AntdButton, Menu} from 'antd';
import { useWindowSize } from "@uidotdev/usehooks";
import {
  HomeOutlined,
  SwapOutlined
} from '@ant-design/icons'

export const SideMenu = () => {
  const navigate = useNavigate();
  const size = useWindowSize();
  const { collapsed, setCollapsed } = useContext(UserContext);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navigationComponents = {
    home: <div onClick={() => navigate("/")}>Home</div>,
  }

  const navigationIcons = {
    home: <div onClick={() => navigate("/")}><HomeOutlined /></div>,
  }

  const items = [
    {
      label: navigationComponents['home'],
      icon: navigationIcons['home'],
      key: '1'
    },
  ];

  return (
    <div className={'lateral'}>
      {size.width > 460 && <AntdButton type="button" className="lateralMenuButton" icon={<SwapOutlined />} onClick={() => toggleCollapsed()}></AntdButton>}
      <Menu
        triggerSubMenuAction='click'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={[]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  )
}