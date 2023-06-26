import './chat.scss';
import MessagesReceived from './Messages';
import SendMessage from './SendMessage';
import RoomAndUsersColumn from './Users.jsx'

const Chat = ({ socket, username, room, setVisible, owner }) => {
  return (
    <div className={'chatContainer'}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} setVisible={setVisible} owner={owner}/>
      <div>
        <MessagesReceived socket={socket} room={room}/>
        <SendMessage socket={socket} username={username} room={room} owner={owner}/>
      </div>
    </div>
  );
};

export default Chat;