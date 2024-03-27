import React from "react";
import { IoIosMenu } from "react-icons/io";
import classes from "./Header.module.css";
function LowerHeaders() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <IoIosMenu />
          <p>All</p>
        </li>
        <li>Todays deal</li>
        <li>Costomer services</li>
        <li> Registery</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeaders;
