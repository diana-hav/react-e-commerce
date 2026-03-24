import Product from "../Product/Product";
import Carousel from "../Carousel/Carousel";
import "./TopProducts.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import Skeleton from "react-loading-skeleton";

const TopProducts = ({ products }) => {
  let {store} = useGlobalContext();
  const list = products?.length ? products : store.state.products;

  return (
    <div className="sub-container">
      {list.length > 0 ? (
        <Carousel
          title="Лучшие продавцы!"
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
export default TopProducts;
