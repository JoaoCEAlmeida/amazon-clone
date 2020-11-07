import React from "react";
import "./index.css";
import StarIcon from "@material-ui/icons/Star";
import { useStateValue } from "../store/StateProvider";
import { store } from "react-notifications-component";

const Product = ({ id, title, image, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });

    store.addNotification({
      title: title,
      message: "Successfuly added",
      type: "success",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 250,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="product__ratingIcon" />
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
