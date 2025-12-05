import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 

// DEFINIÇÃO DOS TEMPOS (EM SEGUNDOS)
const POMODORO_TIMES = {
  pomodoro: 25 * 60, // 25 minutos
  short: 5 * 60,     // 5 minutos
  long: 15 * 60,    // 15 minutos
};

// Componente para os botões de modo (para Modularidade!)
const TimerModes = ({ mode, setMode }) => {
  return (
    <div className="timer-modes">
      {Object.keys(POMODORO_TIMES).map((key) => (
        <button
          key={key}
          onClick={() => setMode(key)}
          className={mode === key ? 'active' : ''}
        >
          {key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ')}
        </button>
      ))}
    </div>
  );
};

function App() {
  // Estado para o modo atual ('pomodoro', 'short', 'long')
  const [mode, setMode] = useState('pomodoro');
  
  // Estado do tempo restante (inicializa com o tempo do modo atual)
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIMES[mode]);
  
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null); 

  // --- Efeito que redefine o tempo quando o MODO muda ---
  useEffect(() => {
    // 1. Para o timer antigo
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // 2. Reseta o estado
    setIsRunning(false);
    // 3. Define o novo tempo inicial
    setTimeLeft(POMODORO_TIMES[mode]);

  }, [mode]); // Roda sempre que o 'mode' muda!


  // --- Lógica do Contador (Mantida) ---
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
    
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      // Aqui você pode adicionar lógica para mudar para o próximo modo automaticamente!
    }

  }, [isRunning, timeLeft]); 

  // --- Funções de Controle ---
  const handleStartPause = () => {
    setIsRunning(prev => !prev); 
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setTimeLeft(POMODORO_TIMES[mode]); // Reseta para o tempo do modo atual
  };

  // --- Função de Formatação ---
  const formatTime = (totalSeconds) => {
    const currentSeconds = Math.max(0, totalSeconds); 
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  const displayTime = formatTime(timeLeft);

  // --- O que aparece na tela (Renderização) ---
  return (
    <div className="container">
      {/* NOVO: Componente para mudar os modos */}
      <TimerModes mode={mode} setMode={setMode} /> 

      {/* Exibe o tempo */}
      <div className="time-display">
        {displayTime}
      </div>

      {/* Botões de Controle */}
      <div className="controls">
        <button onClick={handleStartPause}>
          {isRunning ? 'PAUSAR' : 'INICIAR'}
        </button>
        <button onClick={handleReset}>
          REINICIAR
        </button>
      </div>
    </div>
  );
}

export default App;