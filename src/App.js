import React, { useEffect } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";

const App = () => {
	const { tg, onToggleButton } = useTelegram();
	useEffect(() => {
		tg.ready();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<p>Hi sadas </p>
			<button onClick={onToggleButton}>toggle </button>
		</div>
	);
};
export default App;
