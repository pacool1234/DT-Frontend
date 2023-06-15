import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './MdENoticesSingle.scss';
import { useParams } from 'react-router-dom';
import { NoticeContext } from '../../context/NoticeContext/NoticeState';
import { CommentContext } from '../../context/CommentsContext/CommentState';
import { UserContext } from '../../context/UserContext/UserState';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SendButton from "../../images/send_button.png"
import BackButton from "../../images/icon_return_back.png"
import noPic from "../../../src/images/no_pic.png";


const MdENoticesSingle = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const { getNoticeId, notice, token } = useContext(NoticeContext);
    const { createComment, comments } = useContext(CommentContext);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');



    useEffect(() => {
        async function fetchData() {
            await getNoticeId(_id);
            setLoading(false); // Set loading to false when data has been loaded
        }
        fetchData();
    }, []);

    useEffect(() => {
        setComment('');
        getNoticeId(_id);
    }, [comments]);

    if (loading) {
        return "loading";
    }

    const handleButtonClick = () => {
        navigate("/home");
    };

    const formatImageURL = (path) => {
        const API_URL = "https://desafio-backend-production.up.railway.app/";
        const correctedPath = path.replace("uploads", "")
        return API_URL + correctedPath;
    }

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddComment(event);
        }
    };

    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            const response = await createComment({ body: comment }, notice._id);
            console.log("mostrando response", response);
            if (response.success) {
                console.log('se ejecuta el response success')
                setComment('');
                getNoticeId(_id);
            }
        } catch (error) {
            console.log(error);
            setComment('');
        }
        console.log('Comentario enviado:', comment);
    };

    const formatImageCommentsURLAddUsersPAth = (path) => {
        const API_URL = "https://desafio-backend-production.up.railway.app/users/";
        const correctedPath = path.replace("uploads", "")
        return API_URL + correctedPath;
    }
    const formatImageCommentsURL = (path) => {
        const API_URL = "https://desafio-backend-production.up.railway.app/";
        const correctedPath = path.replace("uploads", "")
        return API_URL + correctedPath;
    }


    return (
        <>
            <Header />

            <div className='scroll_container_single_notices'>
                <div className='main_div_single_notices'>
                    <div className='return_to_home_button' onClick={handleButtonClick}>
                        <img src={BackButton} className="userimgcomm" alt="user_img_comment" />
                    </div>
                    <div className='main_img_single_notice'>
                        <img src={formatImageCommentsURL(notice.img)} alt={notice.title} className="single_notice" />
                    </div>

                    <div className='main_div_text_single_notices'>
                        <div className='content_in_text_single_notices'>
                            <div className='published_time'>
                                Publicado {notice.time.substring(0, 10).split('-').reverse().join('-')}
                            </div>
                            <div className='title_notice_single_notices'>{notice.title}</div>
                            <div className='body_notice_single_notices'>{notice.description}</div>
                            <hr className="separator_line_single_notices" />
                        </div>
                    </div>
                    <div className="div_add_comments">
                        <div className="div_background_comment">

                            <form className="comments_form" onSubmit={handleAddComment}>
                                <div className="comment_label" htmlFor="comment_label">
                                    Comentarios
                                </div>
                                <div className='input_div_with_button'>
                                    <input
                                        className="comment_input"
                                        type="text"
                                        placeholder="Escribe un comentario"
                                        value={comment}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        name="comment_input"
                                    />
                                    <button className='send_button_div' type="submit" >
                                        <img src={SendButton} className="send_button_img" alt="Send_comment" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='main_container_all_notices'>
                        {notice.commentIds.map((comment) => (
                            <div className="div_show_all_comments" key={comment._id}>
                                <div className="user_profile_comments">
                                    <p className="user_name_comments">{comment.userId.username}</p>
                                    <p className="user_name_userType_comments">{comment.userId.userType.name}</p>
                                </div>
                                <div className="body_user_comment_profile">
                                    <div className="user_img_profile_comments">
                                        <img src={comment.userId.img ? formatImageCommentsURLAddUsersPAth(comment.userId.img) : noPic} className="userimgcomm" alt="user_img_comment" />
                                    </div>
                                    <p className="body_text_comments">{comment.body}</p>
                                </div>
                                <hr className="separator_line_comments_single_notices" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default MdENoticesSingle;
