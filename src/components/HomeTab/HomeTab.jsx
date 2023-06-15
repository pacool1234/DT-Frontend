import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomeTab.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MenuImg from "../../../src/images/menu_icon.png";
import PointsUpAll from "../../../src/images/points_upAll.png";
import TabNotices from '../TabNotices/TabNotices';



const HomeTab = () => {
  const [activeComponent, setActiveComponent] = useState("HomeTab");
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/menu");
  };

  const handleTabClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    setTimeout(() => {
      setActiveComponent("HomeTab");
    }, 100);
  }, []);


  return (
    <>
      <Header />
      <div className="main_homeTab_Container">

        
          <div className="top_notices_tab">
            <p className="notices_title_tab">Noticias</p>
            <Link to="/menu" className="go_to_menu" onClick={handleMenuClick}>
              <img src={MenuImg} alt="Menu" className="img_menu" />
            </Link>
          </div>
        

        <div className="div_img_points_tab">
          <img src={PointsUpAll} alt="Points" className="img_points_up_all_tab" />
        </div>

        <div className="div_buttons_home_tab">
          <button type="submit" className="submit_MdE_tab" onClick={handleTabClick}>
            MdE
          </button><button type="submit" className="submit_tab_not_tab">
            Tablón de anuncios
          </button>
        </div>

        <div className="navigation_homeTabContainer">
          <TabNotices />
        </div>


      </div>
      <Footer
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
    </>
  );
};

export default HomeTab;