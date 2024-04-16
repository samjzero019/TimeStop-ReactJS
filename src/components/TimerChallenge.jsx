import React, { useRef, useState } from "react";
import ResultModel from "./ResultModel";

const TimerChallenge = ({ title, time }) => {
	const timer = useRef(); // why used ref?.. cuz multiple instance running at the same overwrite the value of timer
	const dialog = useRef();

	const [timeRemaining, setTimeRemaining] = useState(time * 1000);
	const isTimerActive = timeRemaining > 0 && timeRemaining < time * 1000;
	if (timeRemaining <= 0) {
		clearInterval(timer.current);
		dialog.current.open();
	}
	const startTimer = () => {
		timer.current = setInterval(() => {
			setTimeRemaining((prev) => prev - 10);
		}, 10);
	};

	const stopTimer = () => {
		clearInterval(timer.current);
		dialog.current.open(); // this open method is exposed from modal component using useImperativeHandle hook to handle inner ref change within the component
	};

	const handleReset = () => {
		setTimeRemaining(time * 1000);
	};
	return (
		<>
			<ResultModel
				ref={dialog}
				time={time}
				remainingTime={timeRemaining}
				onReset={handleReset}
			/>
			<section className="challenge">
				<h1>{title}</h1>

				<p className="challenge-time">
					{time} Second{time > 1 ? "s" : ""}
				</p>

				<p>
					<button onClick={isTimerActive ? stopTimer : startTimer}>
						{isTimerActive ? "Stop" : "Start"} Challenge
					</button>
				</p>
				<p className={isTimerActive ? "active" : undefined}>
					Timer is {isTimerActive ? "Running ..." : "inactive"}{" "}
				</p>
			</section>
		</>
	);
};

export default TimerChallenge;
