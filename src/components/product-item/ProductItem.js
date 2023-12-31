import React from "react";
import Button from "../button/button";
import "./product-item.css";
const ProductItem = ({ product, onAdded, className, onAdd }) => {
	const onAddHandler = () => {
		onAdd(product);
	};

	return (
		<div className={"product " + className}>
			<div className={"img"} />
			<div className={"title"}>{product.title}</div>
			<div className={"description"}>{product.description}</div>
			<div className={"price"}>
				<span>
					Стоимость: <b>{product.price}</b>
				</span>
			</div>
			<Button className={"add-btn"} onClick={onAddHandler}>
				{onAdded(product) > -1 ? "Удалить" : "Добавить в корзину"}
			</Button>
		</div>
	);
};

export default ProductItem;
