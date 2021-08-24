import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import ArtworkComments from './App';

ReactDom.render(
  <React.StrictMode>
    <ArtworkComments />
  </React.StrictMode>,
  document.getElementById('root')
);
