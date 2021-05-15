import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Routes } from './Routes';

import webFonts from 'webfontloader';

function App() {

  useEffect(() => {
    webFonts.load({
      google: {
        families: [
          'Kanit',
          'Yeseva One',
        ]
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
