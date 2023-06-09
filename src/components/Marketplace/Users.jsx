import './chat.scss';
import { useState, useEffect } from 'react';

const RoomAndUsers = ({ socket, username, room, setVisible, owner }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    socket.on(`chatroom_users_${room}`, (data) => {
      setRoomUsers(data);
    });

    return () => socket.off(`chatroom_users_${room}`);
  }, []);

  const leaveRoom = () => {
    socket.emit('leave_room', { username, room });
    setVisible(false)
  };

  return (
    <div className={'roomAndUsersColumn'}>
      <h2 className={'roomTitle'}>From {owner}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className={'usersTitle'}>Users:</h5>}
        <ul className={'usersList'}>
          {roomUsers.map((user, index) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={index}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='btn btn-outline' onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;