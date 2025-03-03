import { useState, useRef, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0); // состояние для секунд (отображается в UI)
  const [timerId, setTimerId] = useState(null); // состояние для ID таймера

  const startTimer = () => {
    if (timerRef.current !== null) {
      return;
    }

    // Повторный рендер компонента происходит при изменении состояния seconds
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    // Повторного рендера компонента не происходит
    if (timerRef.current !== null) {
      clearInterval(timerRef.current); // останавливаем таймер по ID
      timerRef.current = null; // сбрасываем реф (таймер остановлен)
    }
  };

  useEffect(() => {
    // Очистка таймера при размонтировании компонента, на случай если он еще работает
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <h3>Секунды: {seconds}</h3>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
