import React, { useState } from 'react';
import "./TabNotices.scss";
import CommentButt from "../../../src/images/comments_button.png";
import AddButt from "../../../src/images/add_notices_button.png";
import ShareButt from "../../../src/images/share_notices_button.png";
import LikeButt from "../../../src/images/like_notices_button.png";
import DemoTab1 from '../../images/demo_tab1.png';
import DemoTab2 from '../../images/demo_tab2.png';
import DemoTab3 from '../../images/demo_tab3.png';
import IconCloseWhite from '../../images/icon_close_white.png';

const MdENotices = () => {
  const [expanded, setExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleText = () => {
    setExpanded(!expanded);
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className='scroll_div_notices_tab'>



        <div className='main_notice_box_tab'>
          <div className='img_notice_box_tab'>
            <img src={DemoTab1} alt="DemoTab1" className="img_notices_home_tab" />
          </div>
          <div className='buttons_notices_tab'>
            <div className='all_buttons_notice_tab'>
              <div className='button_comments_notices_tab'>
                <img src={CommentButt} alt="CommentButt" className="comments_notices_tab" />
              </div>
              <div className='rest_button_notices_tab'>
                <img src={AddButt} alt="AddButt" className="add_notices_button_tab" onClick={handleButtonClick} />
                <img src={ShareButt} alt="ShareButt" className="share_notices_button_tab" />
                <img src={LikeButt} alt="LikeButt" className="like_notices_button_tab" />
              </div>
            </div>
          </div>
          <div className='text_notices_content_tab'>
            <div className='all_text_content_notices_tab'>
              <p className={`text_agora_notices_tab ${expanded ? 'expanded' : 'collapsed'}`}>
                Ayer tuvimos la suerte de conocer en Marina de Empresas a las nuevas startups seleccionadas en @lanzadera.es. <br/><br/>
                🍀Fue un placer escuchar los pitch y descubrir todo el potencial que se suma a nuestra "inteligencia colectiva". <br/><br/>
                🚀WELCOME HOME, RISKIES🧗<br/>
              </p>
              <div className='view_more_button_tab'>
                <p className='expander_button_tab' onClick={toggleText}>
                  Ver más
                </p>
              </div>
              <div className='view_comments_button_tab'>
                Ver los comentarios
              </div>
            </div>
          </div>
        </div>


        <div className='main_notice_box_tab'>
          <div className='img_notice_box_tab'>
            <img src={DemoTab2} alt="DemoTab1" className="img_notices_home_tab" />
          </div>
          <div className='buttons_notices_tab'>
            <div className='all_buttons_notice_tab'>
              <div className='button_comments_notices_tab'>
                <img src={CommentButt} alt="CommentButt" className="comments_notices_tab" />
              </div>
              <div className='rest_button_notices_tab'>
                <img src={AddButt} alt="AddButt" className="add_notices_button_tab" onClick={handleButtonClick} />
                <img src={ShareButt} alt="ShareButt" className="share_notices_button_tab" />
                <img src={LikeButt} alt="LikeButt" className="like_notices_button_tab" />
              </div>
            </div>
          </div>
          <div className='text_notices_content_tab'>
            <div className='all_text_content_notices_tab'>
              <p className={`text_agora_notices_tab ${expanded ? 'expanded' : 'collapsed'}`}>
                Desde el grado de IGE hemos realizado un dashboard con el que puedes interactuar para conocer lo que está ocurriendo en las redes <br/><br/>
                ¡Esperamos vuestra colaboración! <br/>
              </p>
              <div className='view_more_button_tab'>
                <p className='expander_button_tab' onClick={toggleText}>
                  Ver más
                </p>
              </div>
              <div className='view_comments_button_tab'>
                Ver los comentarios
              </div>
            </div>
          </div>
        </div>


        <div className='main_notice_box_tab'>
          <div className='img_notice_box_tab'>
            <img src={DemoTab3} alt="DemoTab1" className="img_notices_home_tab" />
          </div>
          <div className='buttons_notices_tab'>
            <div className='all_buttons_notice_tab'>
              <div className='button_comments_notices_tab'>
                <img src={CommentButt} alt="CommentButt" className="comments_notices_tab" />
              </div>
              <div className='rest_button_notices_tab'>
                <img src={AddButt} alt="AddButt" className="add_notices_button_tab" onClick={handleButtonClick} />
                <img src={ShareButt} alt="ShareButt" className="share_notices_button_tab" />
                <img src={LikeButt} alt="LikeButt" className="like_notices_button_tab" />
              </div>
            </div>
          </div>
          <div className='text_notices_content_tab'>
            <div className='all_text_content_notices_tab'>
              <p className={`text_agora_notices_tab ${expanded ? 'expanded' : 'collapsed'}`}>
                Los alumnos de EDEM hemos organizado unas sesiones para ir a limpiar las playas. ¿Te apuntas? <br/><br/>
                Si quieres asistir te esperamos el próximo miércoles 23 en la cafetería de Lanzadera.  <br/><br/>
                ¡Gracias!<br/>
              </p>
              <div className='view_more_button_tab'>
                <p className='expander_button_tab' onClick={toggleText}>
                  Ver más
                </p>
              </div>
              <div className='view_comments_button_tab'>
                Ver los comentarios
              </div>
            </div>
          </div>
        </div>





        
      </div>
        {showPopup && (
          <div className='Popup_add_Notices_tab'>
            <div className='icon_close_notices_white_tab'>
              <img src={IconCloseWhite} alt="Cerrar" className="icon_close_white_tab" onClick={handleClosePopup} />
            </div>
            <div className='title_popup_add_notices_tab'>
              <p className='main_popup_text_tab'>
                Si quieres que publiquemos alguna noticia de interés envíanos un correo electrónico con toda la información a este email:
              </p>
            </div>
            <div className='email_add_notices_tab'>
              <p className='email_popup_text_tab'>
                noticias@edem.es
              </p>
            </div>
          </div>
        )}
    </>
  );
};

export default MdENotices;
