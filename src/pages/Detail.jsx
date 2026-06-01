import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export default function Detail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="p-10 flex gap-10 items-start">
      
      <div className="w-1/2 flex justify-center">
        <img
          src={product.image_link}
          className="w-72 rounded-lg shadow-md"
        />
      </div>

      {/* DETAIL */}
      <div className="w-1/2 flex flex-col gap-4">
        
        <h1 className="text-xl font-bold bg-pink-500 text-white px-4 py-2 rounded-lg w-fit">
          {product.name}
        </h1>

        <p className="text-gray-500 capitalize">
          {product.brand} • {product.category}
        </p>

        <p className="text-lg font-semibold text-pink-600">
          ${product.price}
        </p>

        <p className="text-gray-700 leading-relaxed">
          {product.description
            ? `Produk ${product.name} dari brand ${product.brand} ini cocok digunakan untuk mempercantik tampilan Anda. ${product.description}`
            : `Produk ${product.name} dari brand ${product.brand} ini cocok digunakan untuk kebutuhan makeup sehari-hari dengan hasil yang maksimal.`}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>

          <span className="text-lg font-semibold">{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => addToCart(product, qty)}
          className="bg-pink-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-pink-600"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}