import React from 'react'
import "./Menu.scss";
import { Link, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import DinnerFKS from '../../images/fork-knife-spoon.png';
import IconClose from '../../images/icon_close.png';

const Menu = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/home");
      };

    return (
        <>
            <Header />
            <div className='main_menu_container'>

                <Link  to="/home" className="close_menu_button" onClick={handleButtonClick}>
                    <img src={IconClose} alt="Cerrar" className="icon_close" />                    
                </Link>


                <div className='title_menu'>
                    <p className='title_menu_tile'>Menú del día</p>
                    <p className='date_menu_title'>16 de Junio de 2023</p>
                    <hr className='separator_menu_title' />
                </div>

                <div className='first_dinner'>
                    <p className='first_dinner_title'>Primer plato</p>
                    <p className='first_dinner_menu1'>Ensalada de col y nueces</p>
                    <p className='first_dinner_menu2'>Albóndigas de rabo de toro con cheddar</p>
                    <p className='first_dinner_menu3'>Salmorejo</p>
                </div>
                <div className='second_dinner'>
                    <p className='second_dinner_title'>Segundo plato</p>
                    <p className='second_dinner_menu1'>Paella Valenciana</p>
                    <p className='second_dinner_menu2'>Gnocci boloñesa</p>
                    <p className='second_dinner_menu3'>Merluza al pesto con patatas al horno</p>

                </div>
                <div className='sweet_dinner'>
                    <p className='sweet_dinner_title'>Postre</p>
                    <p className='sweet_dinner_menu1'>Tarta de queso</p>
                    <p className='sweet_dinner_menu2'>Natilla de la abuela</p>
                    <p className='sweet_dinner_menu3'>Fruta</p>

                </div>
                <div className='dinner_img'>
                    <img src={DinnerFKS} alt="DinnerFKS" className="DinnerFKS" />
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Menu