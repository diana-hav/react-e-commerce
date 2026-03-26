import "./OrderSummary.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const { store, modal, auth } = useGlobalContext();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState("");
  const [cardCVVError, setCardCVVError] = useState("");
  const russianCities = [
    "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Нижний Новгород",
    "Казань", "Челябинск", "Омск", "Самара", "Ростов-на-Дону", "Уфа", "Красноярск",
    "Воронеж", "Пермь", "Волгоград", "Краснодар", "Саратов", "Тюмень", "Тольятти",
    "Ижевск", "Барнаул", "Ульяновск", "Иркутск", "Хабаровск", "Ярославль", "Владивосток",
    "Магнитогорск", "Томск", "Оренбург", "Кемерово", "Новокузнецк", "Рязань",
    "Набережные Челны", "Астрахань", "Пенза", "Липецк", "Тула", "Киров", "Чебоксары",
    "Брянск", "Курск", "Иваново", "Магадан", "Сургут", "Архангельск", "Тамбов",
    "Грозный", "Якутск", "Кострома", "Вологда", "Сочи", "Севастополь"
  ];
  const filteredCities = russianCities.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );
  const validatePhone = (value) => {
    const phoneRegex = /^(\+380|0)\d{9}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Неверный формат номера телефона. Используйте +380XXXXXXXXX или 0XXXXXXXXX");
    } else {
      setPhoneError("");
    }
  };
  const validateCardNumber = (value) => {
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(value.replace(/\s/g, ""))) {
      setCardNumberError("Номер карты должен содержать 16 цифр");
    } else {
      setCardNumberError("");
    }
  };
  const validateCardExpiry = (value) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(value)) {
      setCardExpiryError("Неверный формат срока действия. Используйте MM/YY");
      return;
    }
    const [month, year] = value.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      setCardExpiryError("Срок действия карты истек");
    } else {
      setCardExpiryError("");
    }
  };
  const validateCardCVV = (value) => {
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(value)) {
      setCardCVVError("CVV должен содержать 3 цифры");
    } else {
      setCardCVVError("");
    }
  };
  const setDelivery = (type) => {
    setDeliveryType(type);
  };
  const checkOut = async () => {
    if (phoneError || cardNumberError || cardExpiryError || cardCVVError) {
      toast.error("Будь ласка, виправте помилки у формі");
      return;
    }
    if (!phone || !cardNumber || !cardExpiry || !cardCVV) {
      toast.error("Будь ласка, заповніть всі поля");
      return;
    }
    let payload = {
      DeliveryType: deliveryType,
      DeliveryTypeCost: deliveryType == "Standard" ? 250 : 500,
      costAfterDelieveryRate:
        store.state.cartTotal + (deliveryType == "Standard" ? 250 : 500),
      promoCode: "",
      phoneNumber: phone,
      deliveryCity: city,
      paymentDetails: paymentInfo,
      cardNumber,
      cardExpiry,
      cardCVV,
      user_id: auth.state.user?.id,
    };

    const response = await store.confirmOrder(payload);
    if (response.showRegisterLogin) {
      modal.openModal();
      return;
    }

    if (response === true) {
      toast.info("Ваш заказ обрабатывается");
      setPhone("");
      setCity("");
      setCitySearch("");
      setPaymentInfo("");
      setCardNumber("");
      setCardExpiry("");
      setCardCVV("");
      setDeliveryType("Standard");
      setPhoneError("");
      setCardNumberError("");
      setCardExpiryError("");
      setCardCVVError("");
    }
  };
  return (
    <div className="is-order-summary">
      <div className="sub-container">
        <div className="contains-order">
          <div className="total-cost">
            <h4>Всего товаров ({store.state.cartQuantity})</h4>
            <h4>₽{store.state.cartTotal}</h4>
          </div>
          <div className="shipping">
            <h4>Доставка</h4>
            <select
              className="select-dropdown"
              onChange={(item) => {
                setDelivery(item.target.value);
              }}
            >
              <option value="Standard" className="select">
                Стандартная
              </option>
              <option value="Express" className="select">
                Экспресс
              </option>
            </select>
            <p className="delivery-cost">Стоимость: ₽{deliveryType == "Standard" ? 250 : 500}</p>
          </div>
          <div className="promo-code">
            <h4>Промокод</h4>
            <div className="enter-promo">
              <input className="select-dropdown" type="text" />
              <button
                className="flat-button apply-promo"
                disabled={store.state.cartQuantity > 0 ? false : true}
              >
                Применить
              </button>
            </div>
          </div>
          <div className="promo-code">
            <h4>Номер телефона</h4>
            <input
              className="select-dropdown"
              type="tel"
              value={phone}
              onChange={(item) => {
                setPhone(item.target.value);
                validatePhone(item.target.value);
              }}
            />
            {phoneError && <small style={{ color: "#ff2100" }}>{phoneError}</small>}
            <small>
              <em style={{ color: "#ff2100" }}>
                Ваш номер будет использован для подтверждения заказа
              </em>
            </small>
          </div>
          <div className="promo-code">
            <h4>Город доставки</h4>
            <input
              className="select-dropdown"
              type="text"
              value={citySearch}
              onChange={(item) => {
                setCitySearch(item.target.value);
                setCity(item.target.value);
              }}
              placeholder="Начните вводить город..."
            />
            <ul className="suggestions">
              {filteredCities.slice(0, 6).map((c) => (
                <li
                  key={c}
                  onClick={() => {
                    setCity(c);
                    setCitySearch(c);
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
            <small>{city ? `Выбран город: ${city}` : "Город еще не выбран"}</small>
          </div>
          <div className="promo-code">
            <h4>Данные для оплаты</h4>
            <input
              className="select-dropdown"
              type="text"
              placeholder="Номер карты"
              value={cardNumber}
              onChange={(item) => {
                setCardNumber(item.target.value);
                validateCardNumber(item.target.value);
              }}
            />
            {cardNumberError && <small style={{ color: "#ff2100" }}>{cardNumberError}</small>}
          </div>
          <div className="promo-code">
            <h4>Срок действия карты</h4>
            <input
              className="select-dropdown"
              type="text"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(item) => {
                setCardExpiry(item.target.value);
                validateCardExpiry(item.target.value);
              }}
            />
            {cardExpiryError && <small style={{ color: "#ff2100" }}>{cardExpiryError}</small>}
          </div>
          <div className="promo-code">
            <h4>CVV</h4>
            <input
              className="select-dropdown"
              type="password"
              placeholder="CVV"
              maxLength={4}
              value={cardCVV}
              onChange={(item) => {
                setCardCVV(item.target.value);
                validateCardCVV(item.target.value);
              }}
            />
            {cardCVVError && <small style={{ color: "#ff2100" }}>{cardCVVError}</small>}
            <br />
            <small>
              <em style={{ color: "#ff2100" }}>
                Оплата будет списана только после телефонного подтверждения заказа
              </em>
            </small>
          </div>
          <div className="final-cost">
            <h4>Итоговая стоимость</h4>
            <h4>
              ₽
              {store.state.cart.length > 0
                ? store.state.cartTotal + (deliveryType == "Standard" ? 250 : 500)
                : 0}
            </h4>
          </div>
          <div className="final-checkout">
            <button
              className="flat-button checkout"
              onClick={() => {
                checkOut();
              }}
              disabled={store.state.cartQuantity > 0 ? false : true}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
