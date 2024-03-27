import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LayOut from "../../layout/LayOut";
import axios from "axios";
import { productUrl } from "../../../api/EndPoints";
import { useEffect } from "react";
import ProductCard from "../../product/ProductCard";
import classes from "./results.module.css";
import Loader from "../../../loading/Loader";

function Results() {
  const [results, setresults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { categoryName } = useParams();
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setresults(res.data);
        setisLoading(false);
      })
      .catch((Error) => {
        console.log(Error);
        setisLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "10px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Catagory/{categoryName}</p>
        <br />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderAdd={true}
                />
              );
            })}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
