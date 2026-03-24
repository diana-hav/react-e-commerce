import backpack from "@/assets/images/backpack.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="sub-container">
      <div className="banner">
        <div className="banner-text">
          <h1>
            Скидка до 50% на <br></br>выбранные товары
          </h1>
          <span className="is-buy-now">
            <a href="#products">
              <button className="btn-rounded buy-now">Купить</button>
            </a>
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
