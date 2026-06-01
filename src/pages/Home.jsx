import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import BannerComponent from "../components/BannerComponent";
import SearchComp from "../components/SearchComponent";
import DropdownFilter from "../components/DropdownFilter";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function processSearch(event) {
    setSearchTitle(event.target.value);
    setCurrentPage(1);
  }

  function processSort(type) {
    let sortedProducts = [...products];

    if (type === "harga-murah") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === "harga-mahal") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (type === "alfabet-naik") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "alfabet-turun") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
      
    setProducts(sortedProducts);
  }

  async function getProducts() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://makeup-api.herokuapp.com/api/v1/products.json"
      );
      const result = await response.json();
      
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // SEARCH FILTER
  let filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <>
      <BannerComponent />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Makeup Collections</h1>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <SearchComp onKeyUpAction={processSearch} />
          <DropdownFilter onClickAction={processSort} />
        </div>

        {loading ? (
          <p className="text-center text-xl py-12">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-xl py-12 text-gray-500">
            Tidak ada produk ditemukan
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}