import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Hitung Total Kuantitas (Jumlah Item)
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // Hitung Total Harga Produk
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-xl text-gray-500 mb-6">Wah, keranjangmu masih kosong nih.</p>
          <Link to="/" className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image_link} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-bold text-gray-800 text-lg line-clamp-1">{item.name}</h2>
                  <p className="text-pink-600 font-semibold mt-1">${item.price}</p>
                </div>

                <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full">
                  <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-pink-600">-</button>
                  <span className="font-bold w-6 text-center">{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)} className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-pink-600">+</button>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-bold text-gray-800 text-lg w-24 text-right">${(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm sticky top-10">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Ringkasan Belanja</h2>
              
              <div className="space-y-4 mb-6 border-b pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Total Produk ({totalItems} Item)</span>
                  <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Biaya Pengiriman</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-800">Total Harga</span>
                <span className="text-2xl font-black text-pink-600">${totalPrice.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => navigate("/checkout")} 
                className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition shadow-lg shadow-pink-200 active:scale-95"
              >
                Checkout Sekarang
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4 italic">
                *Pajak dan biaya lainnya dihitung saat checkout
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}