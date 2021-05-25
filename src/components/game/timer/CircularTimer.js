import RenderTime from "./RenderTime";

import "./TimerStyles.css";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

const CircularTimer = props => {
    return (
        <div className="App">
            <h1>
                CountdownCircleTimer
                <br />
                React Component
            </h1>
            <div className="timer-wrapper">
                <CountdownCircleTimer
                    isPlaying
                    duration={30}
                    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                >
                    {RenderTime}
                </CountdownCircleTimer>
            </div>
        </div>
    );
}
export default CircularTimer