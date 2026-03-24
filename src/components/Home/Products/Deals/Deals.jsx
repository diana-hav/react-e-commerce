import Product from "../Product/Product";
import Carousel from "../Carousel/Carousel";
import "./Deals.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import Skeleton from "react-loading-skeleton";

const Deals = ({ products }) => {
  let {store} = useGlobalContext();
  const list = products?.length ? products : store.state.products;

  return (
    <div className="sub-container">
      {list.length > 0 ? (
        <Carousel
          title="Специальные предложения только для вас!"
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
export default Deals;
