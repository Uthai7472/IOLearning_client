import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
});


const App = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [receivedSum, setReceivedSum] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setReceivedMessage(data);
    });

    socket.on('add', (data) => {
      // console.log('Client received from server')
      setReceivedSum(`Client received from server: ${data}`);
    })

    // return () => {
    //   socket.disconnect();
    // }
  }, []);
    
  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  }

  const sumNumber = () => {
    const sum = parseInt(number1, 10) + parseInt(number2, 10);
    console.log('Sum value =', sum);
    socket.emit('add', sum.toString());
    setNumber1(0);
    setNumber2(0);
  }

  return (
    <div>
      <input type="text" 
      value={message}
      onChange={(e) => {setMessage(e.target.value)}} />

      <button onClick={sendMessage}>Send</button>
      
      <p>Received message: {receivedMessage}</p>

      <p></p>

      <input type="number"
      value={number1}
      onChange={(e) => {setNumber1(e.target.value)}} />

      <h3>+</h3>

      <input type="number"
      value={number2}
      onChange={(e) => {setNumber2(e.target.value)}} />

      <p>Received sum: {receivedSum}</p>

      <button onClick={sumNumber}>Sum</button>
      
    </div>
  )
}

export default App