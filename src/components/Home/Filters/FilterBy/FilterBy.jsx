import "./FilterBy.css";

const FilterBy = () => {
  return (
    <div className="contains-select">
      <div className="select-dropdown">
        <select name="select">
          <option value="Test">Тип товара</option>
          <option value="Test">Test</option>
          <option value="Test">Test</option>
        </select>
      </div>
      {/*  */}
      <div className="select-dropdown">
        <select name="select">
          <option value="Test">Цена</option>
          <option value="Test">Test</option>
          <option value="Test">Test</option>
        </select>
      </div>
      {/*  */}
      <div className="select-dropdown">
        <select name="select">
          <option value="Test">Категория</option>
          <option value="Test">Инструменты</option>
          <option value="Test">Растения</option>
          <option value="Test">Удобрения</option>
        </select>
      </div>
    </div>
  );
};
export default FilterBy;
