import { Link, useLocation } from "react-router-dom";
const Links = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToProducts = () => {
    if (!isHomePage) return;
    const products = document.getElementById("products");
    products.scrollIntoView({ behavior: "smooth" });
    removeExpandedClass();
  };

  const removeExpandedClass = () => {
    let mobileExpandedMenu = document.querySelector(".mobile-expanded-menu");
    mobileExpandedMenu.classList.remove("mobile-expanded");
  };

  return (
    <div className="links">
      <Link to={"/"} onClick={removeExpandedClass}>
        Акции
      </Link>
      <Link to={"/#products"} onClick={scrollToProducts}>
        Новое
      </Link>
      <Link to={"/delivery"} onClick={removeExpandedClass}>
        Доставка
      </Link>
    </div>
  );
};

export default Links;
