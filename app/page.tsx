'use client';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import './styles.scss';

export default function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [roundTimes, setRoundTimes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
      document.querySelector('.svg-container').classList.add('animate');
    }
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setTimer(0);
    if (audioRef.current) {
      audioRef.current.pause();
      document.querySelector('.svg-container').classList.remove('animate');
    }
  };

  const handleClear = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setRoundTimes([]);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      document.querySelector('.svg-container').classList.remove('animate');
    }
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    const formattedTime = formatTime(timer);
    setRoundTimes([...roundTimes, `Round ${roundTimes.length + 1}: ${formattedTime}`]);
    setTimer(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      document.querySelector('.svg-container').classList.remove('animate');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener('ended', startTimer);
      audio.addEventListener('ended', () => {
        document.querySelector('.svg-container').classList.remove('animate');
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', startTimer);
        audio.removeEventListener('ended', () => {
          document.querySelector('.svg-container').classList.remove('animate');
        });
      }
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className='app-container'>
      <Head>
        <title>Beaver Breath</title>
      </Head>

      <header>
        <h1>Beaver Breath</h1>
        <p className='sub-header'>Monitor your breathing sessions with our friendly beaver.</p>
        <button onClick={toggleModal} className='instructions-btn'>
          Click here for instructions
        </button>
      </header>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Instructions</h2>
            <p>Begin by pressing start, and follow along by inhaling and exhaling fully to the sound.</p>
            <p>
              Before the last inhale there will be a chime. When you hear it, prepare to inhale fully, and then let go of the air. But don't
              exhale fully. Then hold your breath as long as you're comfortable.
            </p>
            <p>
              When you feel the urge to breathe, press "Complete round" and take a big deep breath, and hold it for 15 seconds. Then exhale.
            </p>
            <p>Congrats, you have just completed your first round. Do as many as you feel like doing.</p>
            <button onClick={toggleModal} className='close-btn'>
              Close
            </button>
          </div>
        </div>
      )}

      <div className='svg-container'>
        <img src='/beaverclosed.svg' alt='Beaver with mouth closed' className='beaver beaver-closed' />
        <img src='/beaveropen.svg' alt='Beaver with mouth open' className='beaver beaver-open' />
      </div>

      {isPlaying && <div className='timer'>{formatTime(timer)}</div>}

      <div className='controls'>
        <button onClick={handlePlay} className='control-btn'>
          Start
        </button>
        {isPlaying && (
          <button onClick={handleStop} className='control-btn pulsate'>
            Complete Round
          </button>
        )}
        <button onClick={handlePause} className='control-btn'>
          Pause
        </button>
        <button onClick={handleClear} className='control-btn clear-btn'>
          Clear All
        </button>
      </div>

      {roundTimes.length > 0 && (
        <div className='round-times'>
          {roundTimes.map((time, index) => (
            <div key={index} className='round-time-item'>
              {time}
            </div>
          ))}
        </div>
      )}

      <audio ref={audioRef} src='/audio.mp3' />
    </div>
  );
}
