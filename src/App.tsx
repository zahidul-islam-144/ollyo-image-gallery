import React, { FC } from 'react';
import TopHeader from './components/TopHeader';
import GalleryBody from './components/GalleryBody';

const App:FC = () => {
  return (
    <section className='main_app'>
      <TopHeader/>
      <GalleryBody/>
    </section>
  );
};

export default App;