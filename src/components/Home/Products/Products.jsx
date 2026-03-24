import Product from "./Product/Product";
import Carousel from "./Carousel/Carousel";
import "./Products.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";


const Products = ({ products }) => {
  let {store} = useGlobalContext();
  const list = products?.length ? products : store.state.products;

  return (
    <div className="sub-container" id="products">
      {list.length > 0 ? (
        <Carousel
          title="Лучшие товары для вас"
          products={list}
        />
      ) : (
        <div className="skeleton">
          <Skeleton height={250}></Skeleton>
        </div>
      )}
    </div>
  );
};
export default memo(Products);
