import Banner from "@/components/Home/Banner/Banner";
import Products from "@/components/Home/Products/Products";
import Deals from "@/components/Home/Products/Deals/Deals";
import TopProducts from "@/components/Home/Products/TopProducts/TopProducts";
import Benefits from "@/components/Home/Benefits/Benefits";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

function HomeView() {
  const { store } = useGlobalContext();
  const products = store.state.products || [];

  const takeUnique = (source, usedIds, count) => {
    const list = [];
    for (const item of source) {
      if (list.length >= count) break;
      if (usedIds.has(item._id)) continue;
      usedIds.add(item._id);
      list.push(item);
    }
    return list;
  };

  const usedIds = new Set();
  const productsList = products.slice(0, 12);
  const dealsList = products.slice(12, 24);
  const topProductsList = products.slice(24, 36);

  return (
    <div>
      <main>
        <section className="hero-section">
          <Banner></Banner>
        </section>
        <section className="benefits-section"></section>
        {/* <section className="filters-section">
          <Filters></Filters>
        </section> */}
        <section>
          <Benefits></Benefits>
        </section>
        <section className="products-section">
          <Products products={productsList}></Products>
        </section>
        <section className="deals">
          <Deals products={dealsList}></Deals>
        </section>
        <section className="top-products">
          <TopProducts products={topProductsList}></TopProducts>
        </section>
      </main>
    </div>
  );
}

export default HomeView;
