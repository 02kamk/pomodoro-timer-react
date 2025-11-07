import './timer.css';

export default function Timer({time}) {
    return (
        <>
            <div className="counter">
                <div className="clock">{time}</div>
                <div className="cicle">#1 Pomodoro</div>
            </div>
        </>
    )
}