import Banner from "@/components/Home/Banner/Banner";
import CarouselSection from "@/components/Home/Products/CarouselSection";
import Benefits from "@/components/Home/Benefits/Benefits";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

function HomeView() {
  const { store } = useGlobalContext();
  const products = store.state.products || [];

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
          <CarouselSection 
            title="Лучшие товары для вас" 
            products={productsList}
            sectionId="products"
          />
        </section>
        <section className="deals">
          <CarouselSection 
            title="Специальные предложения" 
            products={dealsList}
            sectionId="deals"
          />
        </section>
        <section className="top-products">
          <CarouselSection 
            title="Топ товары" 
            products={topProductsList}
            sectionId="top-products"
          />
        </section>
      </main>
    </div>
  );
}

export default HomeView;
