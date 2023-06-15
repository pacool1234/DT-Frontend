import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MenuImg from "../../../src/images/menu_icon.png";
import PointsUpAll from "../../../src/images/points_upAll.png";
import MdENotices from '../MdENotices/MdENotices';



const Home = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Home");


  const handleMenuClick = () => {
    navigate("/menu");
  };

  const handleHomeClick = () => {
    navigate("/homeTab");
  };

  useEffect(() => {
    setTimeout(() => {
      setActiveComponent('Home');
    }, 100);
  }, []);


  return (
    <>
      <Header />
      <div className="main_homeContainer">

        
          <div className="top_notices">
            <p className="notices_title">Noticias</p>
            <Link to="/menu" className="go_to_menu" onClick={handleMenuClick}>
              <img src={MenuImg} alt="Menu" className="img_menu" />
            </Link>
          </div>
        

        <div className="div_img_points">
          <img src={PointsUpAll} alt="Points" className="img_points_up_all" />
        </div>

        <div className="div_buttons_home">
          <button type="submit" className="submit_MdE">
            MdE
          </button><button type="submit" className="submit_tab_not" onClick={handleHomeClick}>
            Tablón de anuncios
          </button>
        </div>

        <div className="navigation_homeContainer">
          <MdENotices />
        </div>


      </div>
      <Footer activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
    </>
  );
};

export default Home;
