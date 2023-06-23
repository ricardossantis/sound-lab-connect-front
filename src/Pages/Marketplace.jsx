import React from "react";
import { TopMenu } from "../components/Menu/TopMenu";
import { SideMenu } from "../components/Menu/SideMenu";
import Marketplace from "../components/Marketplace";

const MarketplacePage = () => {
  return (
      <div>
        <TopMenu/>
        <div className={'topContainer'}>
          <SideMenu/>
          <div className={'content'}>
            <Marketplace/>
          </div>
        </div>
      </div>
  )
}

export default MarketplacePage;