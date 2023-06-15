import React, { useState, useContext, useEffect } from 'react';
import "./MdENotices.scss";
import { Link } from "react-router-dom";
import CommentButt from "../../../src/images/comments_button.png";
import AddButt from "../../../src/images/add_notices_button.png";
import ShareButt from "../../../src/images/share_notices_button.png";
import LikeButt from "../../../src/images/like_notices_button.png";
import UnlikeButt from "../../../src/images/unlike_notices_button.png";
import IconCloseWhite from '../../images/icon_close_white.png';
import { NoticeContext } from '../../context/NoticeContext/NoticeState';


const MdENotices = () => {
  const [expanded, setExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { notices, getNotices, likeNotice, unlikeNotice } = useContext(NoticeContext);


  useEffect(() => {
    getNotices();
  }, []);


  const toggleText = () => {
    setExpanded(!expanded);
  };

  const handleButtonLikes = (noticeId, liked) => {
    if (liked) {
      unlikeNotice(noticeId);
    } else {
      likeNotice(noticeId);
    }
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const formatImageURL = (path) => {
    const API_URL = "https://desafio-backend-production.up.railway.app/";
    const correctedPath = path.replace("uploads", "")
    return API_URL + correctedPath;
  }

  return (
    <>
      <div className='scroll_div_notices'>


        {notices.map((notice) => (
          <div key={notice._id}>
            <div className='main_notice_box'>
              <div className='img_notice_box'>
                <div className='img_notice_box'>
                  {/* <img src={"https://desafio-backend-production.up.railway.app/" + notice.img} alt={notice.title} className="img_notices_home" /> */}
                  <img src={formatImageURL(notice.img)} alt={notice.title} className="img_notices_home" />

                </div>

              </div>
              <div className='buttons_notices'>
                <div className='all_buttons_notice'>
                  <Link to={`/getNoticeById/${notice._id}`}>
                    <div className='button_comments_notices'>
                      <img src={CommentButt} alt="CommentButt" className="comments_notices" />
                    </div>
                  </Link>
                  <div className='rest_button_notices'>
                    <img src={AddButt} alt="AddButt" className="add_notices_button" onClick={handleButtonClick} />
                    <img src={ShareButt} alt="ShareButt" className="share_notices_button" />
                    <img
                      src={notice.liked ? LikeButt : UnlikeButt}
                      alt='LikeButt'
                      className={`like_notices_button ${notice.liked ? 'liked' : ''}`}
                      onClick={handleButtonLikes.bind(null, notice._id, notice.liked)}
                    />
                  </div>
                </div>
              </div>
              <div className='text_notices_content'>
                <div className='all_text_content_notices'>
                  <p className={`text_agora_notices ${expanded ? 'expanded' : 'collapsed'}`}>
                    {notice.description}
                  </p>
                  <div className='view_more_button'>
                    <p className='expander_button' onClick={toggleText}>
                      Ver más
                    </p>
                  </div>
                  <Link to={`/getNoticeById/${notice._id}`}>
                    <div className='view_comments_button'>
                      Ver los comentarios
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}


      </div >
      {showPopup && (
        <div className='Popup_add_Notices'>
          <div className='icon_close_notices_white'>
            <img src={IconCloseWhite} alt="Cerrar" className="icon_close_white" onClick={handleClosePopup} />
          </div>
          <div className='title_popup_add_notices'>
            <p className='main_popup_text'>
              Si quieres que publiquemos alguna noticia de interés envíanos un correo electrónico con toda la información a este email:
            </p>
          </div>
          <div className='email_add_notices'>
            <p className='email_popup_text'>
              noticias@edem.es
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MdENotices;
