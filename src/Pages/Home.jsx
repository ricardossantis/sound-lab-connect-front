import React from "react";
import { TopMenu } from "../components/Menu/TopMenu";
import { SideMenu } from "../components/Menu/SideMenu";
import Home from "../components/Home";

const HomePage = () => {
  return (
      <div>
        <TopMenu/>
        <div className={'topContainer'}>
          <SideMenu/>
          <div className={'content'}>
            <Home/>
          </div>
        </div>
      </div>
  )
}

export default HomePage;