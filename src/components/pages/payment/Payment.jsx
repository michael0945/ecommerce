import React from "react";
import { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../layout/LayOut";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../curruncyformat/CurrencyFormat";
import { axiosInstance } from "../../../api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../../utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../../utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    // used to prevent refresh
    e.preventDefault();
    try {
      // 1.backend || function .....>contact get the clint secret
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total}`,
      });

      const clientSecret = response.data.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log({ paymentIntent });
      await db
        .collection("users")
        .doc(user.uid)
        .collection("order")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty in the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      setProcessing(false);
    }

    // 2.clint side conformation
    // 3.order save on the fire store and clear
  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>checkout({totalItem}) items</div>
      {/* payment */}
      <section className={classes.payment}>
        {/* adress */}
        <div className={classes.flex}>
          <h3>Delivery address</h3>
          <div>
            <div>{user?.email}</div>
            <div>nifas silk lafto</div>
          </div>
        </div>
        <hr />
        {/* prduct */}
        <div className={classes.flex}>
          <h3>Review items and delivery </h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loader}>
                        <ClipLoader color="grey" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
