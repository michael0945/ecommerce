import React from "react";
import LayOut from "../../layout/LayOut";
import Carousell from "../../Carousel/Carousell";
import Catagory from "../../catagory/Category";
import Product from "../../product/Product";

function Landing() {
  return (
    <LayOut>
      <Carousell />
      <Catagory />
      <Product />
    </LayOut>
  );
}

export default Landing;
