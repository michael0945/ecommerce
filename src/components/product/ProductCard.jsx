import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../curruncyformat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { Type } from "../../utility/action.type";
import { DataContext } from "../DataProvider/DataProvider";
function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);
  console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };
  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>

      <div>
        <p>{title}</p>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          {/*count*/}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* <price/> */}
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
