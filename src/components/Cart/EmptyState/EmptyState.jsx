import "./EmptyState.css";
import EmptyCart from "../../../assets/images/empty-cart.png";
import { Link } from "react-router-dom";
const EmptyState = () => {
  return (
    <div className="empty-cart-state">
      <div className="empty-cart-image">
        <img src={EmptyCart} alt="Empty cart" width={100} />
      </div>
      <div className="empty-cart-text">
        <h2>Корзина пуста</h2>
        <p>Похоже, вы еще ничего не добавили в корзину.</p>
        <Link to={"/"} className="add-item">
          Добавить товары
        </Link>
      </div>
    </div>
  );
};
export default EmptyState;
