import React from "react";
import { catagoryInfos } from "./CatagoryfullInfos";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css";

function Category() {
  return (
    <section className={classes.catagory_container}>
      {catagoryInfos.map((infos) => {
        return <CategoryCard key={infos} data={infos} />;
      })}
    </section>
  );
}

export default Category;
