import React, {useState, useEffect} from 'react';

export default function Timer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [interval, sInterval] = useState(1);
  useEffect(() => {
    console.log('use effect triggered')
    setTimeout(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000)
    setTimeout(() => {
      sInterval(interval + 1)
    }, 3000)
  })
  useEffect(() => {
    document.getElementById('root').style.backgroundColor = getRandomColor();
  },[interval])
  return(
    <div>{time}</div>
  )
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}