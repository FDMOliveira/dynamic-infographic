import logo from './logo.svg';
import React from 'react'
import Marker from './Components/Marker/Marker'
import Image from './Components/Image/Image'
import './App.css'

function App() {
  return (
    <div className="infograph">
      <Image/>
      <Marker />
    </div>
  );
}

export default App;
