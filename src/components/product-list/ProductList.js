/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";
import ProductItem from "../product-item/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import "./product-list.css";
const products = [
	{
		id: "1",
		title: "Джинсы",
		price: 5000,
		description: "Синего цвета, прямые",
	},
	{
		id: "2",
		title: "Куртка",
		price: 12000,
		description: "Зеленого цвета, теплая",
	},
	{
		id: "3",
		title: "Кроссовки",
		price: 11000,
		description: "Дырявые, модные",
	},
];
const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return (acc += item.price);
	}, 0);
};

const ProductList = () => {
	const [addedItems, setAddedItems] = useState([]);
	const { tg, queryId } = useTelegram();

	const onSendData = useCallback(() => {
		//send for inline_keyboard/ setmenubutton
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		};

		// fetch("http://localhost:8000/data", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(data),
		// });
		//sent on server and with listener take queryId for answerWebAppQuery
	}, [addedItems]);

	useEffect(() => {
		tg.onEvent("mainButtonClicked", onSendData);
		return () => {
			tg.offEvent("mainButtonClicked", onSendData);
		};
	}, [onSendData]);

	const onAdd = (product) => {
		//add or remove product
		const alreadyAdded = addedItems.find((item) => item.id === product.id);
		let newItems = [];

		if (alreadyAdded) {
			newItems = addedItems.filter((item) => item.id !== product.id);
		} else {
			newItems = [...addedItems, product];
		}

		setAddedItems(newItems);

		if (newItems.length === 0) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
			tg.MainButton.setParams({
				text: `Купить ${getTotalPrice(newItems)}`,
			});
		} //setting tg button
	};
	const onAdded = (product) => {
		return addedItems.findIndex((item) => item.id === product.id);
	};
	return (
		<div className={"list"}>
			{products.map((item) => (
				<ProductItem
					product={item}
					onAdded={onAdded}
					onAdd={onAdd}
					className={"item"}
				/>
			))}
		</div>
	);
};

export default ProductList;
