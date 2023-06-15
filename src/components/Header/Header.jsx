import React, { useState } from "react";
import { Link } from "react-router-dom";
import FoldableMenu from "../FoldableMenu/FoldableMenu";
import profileLogo from "../../../src/images/header_icon_profile.png";
import { FiMenu, FiX } from "react-icons/fi";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="headerContainer">
        <div className="foldableMenuContainer">
          <button className="openFoldableButton" onClick={toggleMenu}>
            <FiMenu className="hamburger" />
          </button>
          <FoldableMenu className="foldableMenu" isOpen={isMenuOpen}>
            <button className="closeFoldableButton" onClick={toggleMenu}>
              <FiX className="closeIcon" />
            </button>
            <ul className="bulletList">
              <li>
                <a href="/home">Badges</a>
              </li>
              <li>
                <a href="/about">Solicitar evento</a>
              </li>
              <li>
                <a href="/contact">Sugerencias</a>
              </li>
              <li>
                <a href="/contact">Herramientas</a>
              </li>
              <li>
                <a href="/contact">Contactar</a>
              </li>
            </ul>
            <ul className="helpAndLogout">
              <li>
                <a href="/contact">Ayuda</a>
              </li>
              <li>
                <a href="/contact">Cerrar sesión</a>
              </li>
            </ul>
          </FoldableMenu>
        </div>
        <div className="profileButtonContainer">
          <Link to="/profile" className="profileLogoDiv">            
              <img src={profileLogo} className="img_profile_header" />            
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
