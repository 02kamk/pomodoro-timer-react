import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const POMODORO_TIMES = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const TimerModes = ({ mode, setMode }) => (
  <div className="timer-modes">
    {Object.keys(POMODORO_TIMES).map((key) => (
      <button
        key={key}
        onClick={() => setMode(key)}
        className={mode === key ? 'active' : ''}
      >
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </button>
    ))}
  </div>
);

function App() {
  const [mode, setMode] = useState('pomodoro');

  // Cada modo tem seu próprio tempo
  const [times, setTimes] = useState({
    pomodoro: POMODORO_TIMES.pomodoro,
    short: POMODORO_TIMES.short,
    long: POMODORO_TIMES.long,
  });

  // Qual modo está rodando
  const [runningMode, setRunningMode] = useState(null);

  const timerRef = useRef(null);

  // Timer por modo
  useEffect(() => {
    if (runningMode) {
      timerRef.current = setInterval(() => {
        setTimes(prev => ({
          ...prev,
          [runningMode]: prev[runningMode] > 0 ? prev[runningMode] - 1 : 0
        }));
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [runningMode]);

  // Se o tempo chegar a zero, parar automaticamente
  useEffect(() => {
    if (runningMode && times[runningMode] === 0) {
      clearInterval(timerRef.current);
      setRunningMode(null);
    }
  }, [times, runningMode]);

  const handleStartPause = () => {
    // ⭐ Corrigido: se o tempo estiver em zero, restaura antes de iniciar
    if (times[mode] === 0) {
      setTimes(prev => ({
        ...prev,
        [mode]: POMODORO_TIMES[mode]
      }));
    }

    if (runningMode === mode) {
      setRunningMode(null); // pausar
      return;
    }

    setRunningMode(mode); // iniciar o modo atual
  };

  const handleReset = () => {
    setTimes(prev => ({
      ...prev,
      [mode]: POMODORO_TIMES[mode]
    }));
    if (runningMode === mode) {
      setRunningMode(null);
    }
  };

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div className="container">
      <TimerModes mode={mode} setMode={setMode} />

      <div className="time-display">
        {formatTime(times[mode])}
      </div>

      <div className="controls">
        <button onClick={handleStartPause}>
          {runningMode === mode ? 'PAUSAR' : 'INICIAR'}
        </button>

        <button onClick={handleReset}>
          REINICIAR
        </button>
      </div>
    </div>
  );
}

export default App;