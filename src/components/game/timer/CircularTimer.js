import RenderTime from "./RenderTime";

import "./TimerStyles.css";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

const CircularTimer = props => {
    const AFK_TIME = 30;
    const AFK_TIMER_SIZE = 120;
    return (
        <div>
            <div className="timer-wrapper">
                <CountdownCircleTimer
                    isPlaying
                    duration={AFK_TIME}
                    size={AFK_TIMER_SIZE}
                    colors={[["#1dfc04", 0.33], ["#eeee06", 0.33], ["#b00202"]]}
                >
                    {RenderTime}
                </CountdownCircleTimer>
            </div>
        </div>
    );
}
export default CircularTimer