import { useLocation } from "react-router-dom";
import backpack from "@/assets/images/backpack.png";
import "./Banner.css";

const Banner = () => {
  const location = useLocation();

  const handleBuyNow = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Якщо секція тимчасово відсутня (з іншого маршруту), направляємо на головну з хешем
    if (location.pathname !== "/") {
      window.location.replace("/#products");
    }
  };

  return (
    <div className="sub-container">
      <div className="banner">
        <div className="banner-text">
          <h1>
            Скидка до 50% на <br></br>выбранные товары
          </h1>
          <span className="is-buy-now">
            <button className="btn-rounded buy-now" onClick={handleBuyNow}>
              Купить
            </button>
          </span>
        </div>
        <div className="subject">
          <img src={backpack} alt="Рюкзак" width={"100%"} />
        </div>
      </div>
    </div>
  );
};
export default Banner;
