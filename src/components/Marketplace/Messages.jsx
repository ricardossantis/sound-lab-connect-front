import './chat.scss';
import { useState, useEffect } from 'react';

const Messages = ({ socket, room }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessagesReceived((prevMessages) => {
        return [
          ...prevMessages,
          {
            message: data.message,
            username: data.username,
            createdTime: data.createdTime
          },
        ]
      });
    };

    socket.on(`receive_message_${room}`, receiveMessageHandler);
    return () => socket.off(`receive_message_${room}`);
  }, []);

  useEffect(() => {
    socket.on(`last_100_messages_${room}`, (last100Messages) => {
      last100Messages = last100Messages;
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off(`last_100_messages_${room}`);
  }, []);

  const sortMessagesByDate = (messages) => {
    return messages.sort(
      (a, b) => parseInt(a.createdTime) - parseInt(b.createdTime)
    );
  }

  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  return (
    <div className={'messagesColumn'}>
      {messagesReceived.map((msg, i) => (
        <div className={'message'} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={'msgMeta'}>{msg.username}</span>
            <span className={'msgMeta'}>
              {formatDateFromTimestamp(msg.createdTime)}
            </span>
          </div>
          <p className={'msgText'}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;