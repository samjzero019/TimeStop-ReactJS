import { useState } from "react";
import { useRef } from "react";

export default function Player() {
	const [playerName, setPlayerName] = useState("Unknown Entity");
	const input = useRef();
	const handleClick = () => {
		setPlayerName(input.current.value);
		input.current.value = ""; // Limited use Only as it violates the React Rules
	};
	return (
		<section id="player">
			<h2>Welcome {playerName ?? "Unknown Entity"}</h2>
			<p>
				<input ref={input} type="text" />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
