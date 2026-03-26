import "./TelegramBanner.css";

const TelegramBanner = () => {
  return (
    <div className="telegram-bonus-banner">
      <div className="banner-content">
        <h3>🎁 Получи 10% скидку!</h3>
        <p>Подключи телеграм-уведомления и получи дополнительную скидку на этот заказ</p>
        <button className="telegram-btn">Подключить Telegram</button>
      </div>
    </div>
  );
};

export default TelegramBanner;