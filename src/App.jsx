import React from 'react';
import './styles/theme.css';
import './styles/global.css';
import {MyHeader} from './components/E1/MyHeader';
import {LuckyNumber} from './components/E2/LuckyNumber';

export default function App() {
  return (
    <>
      <MyHeader />
      <LuckyNumber />
    </>
  );
}
