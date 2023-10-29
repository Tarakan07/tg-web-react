import React, { useEffect } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/header/Header";
import ProductList from "./components/product-list/ProductList";
import Form from "./components/form/Form";
import { Route, Routes } from "react-router-dom";
const App = () => {
	const { tg, onToggleButton } = useTelegram();
	useEffect(() => {
		tg.ready();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Header />
			<Routes>
				<Route index element={<ProductList />} />
				<Route path={"form"} element={<Form />} />
			</Routes>
		</div>
	);
};
export default App;
