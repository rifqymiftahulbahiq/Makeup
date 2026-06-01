import { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function CartModal({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">Tambah Ke Keranjang</h2>

        <div className="flex gap-4 items-center">
          <img src={product.image_link} className="w-20" />
          <div>
            <h3 className="font-bold">{product.name}</h3>
            <p>${product.price}</p>
          </div>
        </div>

        {/* Qty */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setQty(qty > 0 ? qty - 1 : 0)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>

          <span className="font-bold">{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>Batal</button>

          <button
            onClick={() => {
              if (qty > 0) {
                addToCart(product, qty);
                onClose();
              }
            }}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}