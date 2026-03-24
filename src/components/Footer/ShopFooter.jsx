import "./ShopFooter.css";
import { Link } from "react-router-dom";


const ShopFooter = () => {
  const newYear = new Date().getFullYear();
  return (
    <div className="sub-container">
      <div className="useful-links">
        <h2 className="logo-text">LOGO</h2>
        <ul className="useful-details">
          <li>location xx ,xxx</li>
          <li>Socials</li>
        </ul>
      </div>
      <div className="bottom-section">
        <div className="bottom-section-left">
          <ul>
            <li>
              <Link to={"/"}>Акции</Link>
            </li>
            <li>
              <a href="#products">Новое</a>
            </li>
            <li>
              <a href="#">Доставка</a>
            </li>
          </ul>
        </div>
        <div className="bottom-sectino-right">copyright &copy; {newYear}</div>
      </div>
    </div>
  );
};
export default ShopFooter;
