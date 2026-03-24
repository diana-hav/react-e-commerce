import "./Product.css";
import dron from "@/assets/images/dron.png";
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import { useState } from "react";

const Product = ({ product }) => {
  let {store} = useGlobalContext();
  let stars = [];
  for (let i = 0; i < product?.rating; i++) {
    stars.push(<FaStar key={i} />);
  }
  const isInCart = product?.addedToCart;
  const fallbackSrc = `https://via.placeholder.com/200?text=${encodeURIComponent(product?.name)}`;
  const [imageSrc, setImageSrc] = useState(product?.product_image || fallbackSrc);
  return (
    <div className="product-container">
      <div className="product-badge">
        {product?.discount && <span className="discount-badge">{product?.discount}% скидка</span>}
        {product?.isNew && <span className="new-badge">Новое</span>}
      </div>
      <div className="image">
        <img
          src={imageSrc}
          alt={product?.name}
          width={"100%"}
          onError={() => setImageSrc(fallbackSrc)}
        />
      </div>
      <div className="product-details">
        <div className="price">
          <div className="name-price-product">
            <h4 title={product?.name}>{product?.name}</h4>
            <h5>
              ₽<span className="actual-product-price">{product?.price}</span>
            </h5>
          </div>
          <p className="product-description">{product?.description}</p>
          <div className="star-rating">
            <div className="star">{stars}</div>
            <span className="reviews-count">({parseInt(Math.random() * 100)} отзывов)</span>
          </div>
        </div>
        <div className="button-container">
          {isInCart == false ? (
            <button
              className="add-to-cart btn-primary"
              onClick={() => {
                if (store.state.cartQuantity > 10) {
                  toast.warning("Вы можете добавить только 10 товаров в корзину");
                  return;
                }
                store.addToCart(product?._id);
              }}
            >
              Добавить в корзину
            </button>
          ) : (
            <button
              className="add-to-cart btn-danger"
              onClick={() => {
                store.removeFromCart(product?._id);
              }}
            >
              Удалить из корзины
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Product;
