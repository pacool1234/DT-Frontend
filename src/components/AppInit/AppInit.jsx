import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppInit.scss';
import AnimationLogo from '../../images/Logotipo_Agora_salmon_1080.gif';

const AppInit = () => {
  const [key, setKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 4400);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  return (
    <>
      <div className='main_app_init'>
        <div className='logo_animation_init'>
          <img
            src={AnimationLogo}
            alt='AnimationLogoAgora'
            className='logo_animation_agora'
            key={key}
          />
        </div>
      </div>
    </>
  );
};

export default AppInit;



