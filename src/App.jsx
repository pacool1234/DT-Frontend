import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Contacts from "./components/Contacts/Contacts";
import Notification from "./components/Notification/Notification";
import Password from "./components/Password/Password";
import Profile from "./components/Profile/Profile";
import OtherProfile from "./components/OtherProfile/OtherProfile";
import Chat from "./components/Chat/Chat";
import ChatList from "./components/ChatList/ChatList";
import Blocked from "./components/Blocked/Blocked";
import { ChatProvider } from "./context/ChatContext/ChatState";
import { UserProvider } from "./context/UserContext/UserState";
import { NoticeProvider } from "./context/NoticeContext/NoticeState";
import { CommentProvider } from "./context/CommentsContext/CommentState";
import { EventProvider } from "./context/EventContext/EventState";
import { ProfileProvider } from "./context/ProfileContext/ProfileState";
import Mailer from "./components/Mailer/Mailer";
import RecoverPass from "./components/RecoverPass/RecoverPass";
import HomeTab from "./components/HomeTab/HomeTab";
import Menu from "./components/Menu/Menu";
import Events from "./components/Events/Events";
import EventSingle from "./components/EventSingle/EventSingle";
import MdENoticesSingle from "./components/MdENoticesSingle/MdENoticesSingle";
import MainCalendar from "./components/MainCalendar/MainCalendar";
import EditProfile from "./components/EditProfile/EditProfile";
import AppInit from "./components/AppInit/AppInit";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ChatProvider>
            <NoticeProvider>
              <CommentProvider>
                <EventProvider>
                  <ProfileProvider>
                    <Routes>
                      <Route path="/" element={<AppInit />} />
                      <Route path="/welcome" element={<Welcome />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/mailer" element={<Mailer />} />
                      <Route path="/blocked" element={<Blocked />} />
                      <Route path="/password" element={<Password />} />
                      <Route path="/recoverPass/:recoverToken" element={<RecoverPass />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/getNoticeById/:_id" element={<MdENoticesSingle />} />
                      <Route path="/homeTab" element={<HomeTab />} />
                      <Route path="/menu" element={<Menu />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/getEventById/:_id" element={<EventSingle />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="/notification" element={<Notification />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/editprofile" element={<EditProfile />} />
                      <Route path="/otherprofile/:_id" element={<OtherProfile />} />
                      <Route path="/chatlist" element={<ChatList />} />
                      <Route path="/chat/:_id" element={<Chat />} />
                      <Route path="/maincalendar" element={<MainCalendar />} />
                    </Routes>
                  </ProfileProvider>
                </EventProvider>
              </CommentProvider>
            </NoticeProvider>
          </ChatProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
