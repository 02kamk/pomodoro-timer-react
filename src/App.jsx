import { useState, useEffect, useRef } from 'react';
import TimerLib from 'easytimer.js'; 
import './App.css'

import Button from './components/button'
import Timer from './components/timer'
import Counter from './components/counter';


function App() {
  const [time, setTime] = useState('25:00');
  const [cycle, setCycle] = useState('pomodoro');
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  // Inicializa o timer apenas uma vez
  useEffect(() => {
    timerRef.current = new TimerLib();
  }, []);

  const startTimer = () => {
    if (timerRef.current) {
      timerRef.current.start({
        countdown: true,
        startValues: { minutes: time },
      });

      timerRef.current.addEventListener('secondsUpdated', () => {
        setTime(timerRef.current.getTimeValues().toString(['minutes', 'seconds']));
      });

      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    timerRef.current.pause();
    setIsRunning(false);
  };

  const stopTimer = () => {
    timerRef.current.stop();
    setTime('25:00');
    setIsRunning(false);
  };

  const frutas = ["Maça", "Laranja", "Uva"];


  return (
    <>
      <div className="container">

        <div className="timer">

            <div>
                <h1>Pomodoro 2025.2</h1>

                <Button onClick={() => {setTime('25:00'); setCycle('pomodoro')}} label="Pomodoro" isLink isActive={cycle == 'pomodoro'}/>
                <Button onClick={() => {setTime('05:00'); setCycle('curta')}} label="Pausa curta" isLink isActive={cycle == 'curta'} />
                <Button onClick={() => {setTime('15:00'); setCycle('longa')}} label="Pausa longa" isLink isActive={cycle == 'longa'} />

            </div>
            <Timer time={time}/>

            <div>
                {!isRunning ? (
                  <Button onClick={startTimer} label="Iniciar" isLink isLarge isActive />
                ) : (
                  <Button onClick={pauseTimer} label="Parar" isLink isLarge isActive />
                )}
                <Button onClick={stopTimer} label="Finalizar" isLink />
            </div>
        </div>

        <div className='counter__box'>

          <Counter />

          <br />
          <br />
          <br />

          <Counter />

        </div>

      </div>
    </>
  )
}

export default App
