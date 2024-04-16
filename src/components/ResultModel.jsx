import React, { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModel = forwardRef(({ time, remainingTime, onReset }, ref) => {
	const dialog = useRef();
	const hasUserLost = remainingTime <= 0;
	const formattedRemainingTimeInSeconds = (remainingTime / 1000).toFixed(2);

	const score = Math.round((remainingTime / (time * 1000)) * 100);
	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current.showModal();
			},
		};
	});
	return (
		<>
			<dialog className="result-modal" ref={dialog} onClose={onReset}>
				{hasUserLost && <h2>You Lost</h2>}
				{!hasUserLost && <h2>You Score is {score}</h2>}
				<p>
					Your Target Time was <strong>{time} Second/s</strong>
				</p>
				<p>
					YOu Stopped the timer with{" "}
					<strong> {formattedRemainingTimeInSeconds} Second/s </strong>left
				</p>
				<form method="dialog" onSubmit={onReset}>
					<button>Close</button>
				</form>
			</dialog>
		</>
	);
});

export default ResultModel;
