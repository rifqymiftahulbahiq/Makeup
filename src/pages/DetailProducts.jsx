import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import PaginationComp from "../components/PaginationComp";
import SearchComp from "../components/SearchComponent";
import DropdownFilter from "../components/DropdownFilter";

export default function DetailProducts() {
    const [products, setProducts] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const productsPerPage = 12;

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
        let url = "https://makeup-api.herokuapp.com/api/v1/products.json";

        if (category !== "") {
            url = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${category}`;
        }

        try {
            const response = await fetch(url);
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setCurrentPage(1);
        getProducts();
    }, [category]);

    let filteredProducts = products.filter((item) =>
        item.name?.toLowerCase().includes(searchTitle.toLowerCase())
    );

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / productsPerPage)
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages]);

    const indexLast = currentPage * productsPerPage;
    const indexFirst = indexLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexFirst, indexLast);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Semua Produk Makeup</h1>

            <div className="flex flex-wrap gap-3 mb-6">
                <SearchComp onKeyUpAction={processSearch} />
                <DropdownFilter onClickAction={processSort} />

                <select
                    className="bg-[rgb(31,41,55)] text-white px-2 py-3 rounded-lg hover:bg-[rgb(17,24,39)] focus:outline-none"
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setCurrentPage(1); 
                    }}
                >
                    <option value="">Semua Kategori</option>
                    <option value="lipstick">Lipstick</option>
                    <option value="mascara">Mascara</option>
                    <option value="blush">Blush</option>
                    <option value="bronzer">Bronzer</option>
                    <option value="eyeliner">Eyeliner</option>
                    <option value="foundation">Foundation</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-600">Loading...</p>
                        <p className="text-sm text-gray-400">Mohon tunggu sebentar</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            )}

            {!loading && (
                <PaginationComp
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}