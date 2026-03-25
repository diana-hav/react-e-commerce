import Carousel from "./Carousel/Carousel";
import "./Products.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";

/**
 * Универсальный компонент для отображения карусели товаров
 * Заменяет Products, Deals и TopProducts компоненты
 */
const CarouselSection = ({ title, products, sectionId }) => {
  const { store } = useGlobalContext();
  const list = products?.length ? products : store.state.products;

  return (
    <div className="sub-container" id={sectionId}>
      {list.length > 0 ? (
        <Carousel
          title={title}
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

export default memo(CarouselSection);
