import { Link } from "react-router-dom";
import { useState } from "react";
import CartModal from "./CartModal";

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Cek apakah link gambar tidak ada atau link-nya rusak
  const hasNoImage = !product.image_link || imageError;

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100">

        <div className="aspect-square w-full overflow-hidden rounded-lg mb-3 flex items-center justify-center bg-gray-50/30">
          {!hasNoImage ? (
            <img
              src={product.image_link}
              alt={product.name}
              className="w-full h-full object-contain p-2"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* HARGA PRODUK */}
        <p className="text-pink-600 font-medium text-sm mb-4">
          ${Number(product.price).toFixed(2)}
        </p>

        <div className="flex gap-2 mt-auto">
          <Link
            to={`/detail/${product.id}`}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-center text-sm py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Detail
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            + Keranjang
          </button>
        </div>
      </div>

      {open && (
        <CartModal
          product={product}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}