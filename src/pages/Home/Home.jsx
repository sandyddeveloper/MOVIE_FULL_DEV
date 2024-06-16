import React, { useState, useEffect } from 'react';
import './home.css';
//import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Navbar from '../../components/Navbar/Navbar';
import { FaPlay } from 'react-icons/fa';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='app__bgimg'>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src='https://wallpapers.com/images/hd/avengers-endgame-fantasy-m8fbpfs2m580r7l3.jpg' alt='background' className='background-img' />
        <div className="container">
          <div className="title">
            <img src='https://i.redd.it/8xdjwancxu521.png' alt='info' />
          </div>
          <div className="PM__button flex">
            <button className="flex j-center a-center">
              <FaPlay/> Play </button>
              <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
