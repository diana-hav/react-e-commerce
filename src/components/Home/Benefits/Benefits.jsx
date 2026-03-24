import "./Benefits.css";

import { FaRocket, FaSmileWink } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";

const Benefits = () => {
  let benefits = [
    {
      icon: <FaRocket></FaRocket>,
      title: "БЫСТРАЯ ДОСТАВКА",
      text: "Доставка менее чем за 2 дня",
      id: 1,
    },
    {
      icon: <AiFillSafetyCertificate></AiFillSafetyCertificate>,
      title: "БЕЗОПАСНЫЙ ПЛАТЕЖ",
      text: "Все платежи 100% защищены",
      id: 2,
    },
    {
      icon: <FaSmileWink></FaSmileWink>,
      title: "ДРУЖЕЛЮБНЫЙ СЕРВИС",
      text: "Лучшее обслуживание клиентов",
      id: 3,
    },
  ];
  const allBenefits = benefits.map((benefit) => {
    return (
      <div className="benefits-item" key={benefit.id}>
        <div className="benefit-icon">{benefit.icon}</div>
        <div className="benefit-text">
          <h3 className="benefit-title">{benefit.title}</h3>
          <p className="benefit-body">{benefit.text}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="sub-container main-benefit">
      <div className="benefits">{allBenefits}</div>
    </div>
  );
};
export default Benefits;
