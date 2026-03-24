import { MdSearch } from "react-icons/md";

const Search = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Поиск товара" />
      <button>
        <MdSearch></MdSearch>
      </button>
    </div>
  );
};
export default Search;
