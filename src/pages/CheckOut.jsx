import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
    const { cart, deleteAll } = useContext(CartContext);
    const navigate = useNavigate();

    const totalProductPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const appFee = totalProductPrice * 0.11;
    const grandTotal = totalProductPrice + appFee;

    const handlePayment = () => {
        if (cart.length === 0) return;

        alert("Pembayaran Berhasil! Terima kasih telah berbelanja.");
        
        deleteAll(); // Fungsi dari context untuk hapus semua isi keranjang
        navigate("/");
    };

    return (
        <div className="container mx-auto px-4 py-10 flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl">
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
                    <p className="text-sm text-gray-500">Ringkasan pesanan kamu</p>
                </div>

                <div className="space-y-4 mb-8">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <img 
                                    src={item.image_link} 
                                    alt={item.name} 
                                    className="w-12 h-12 object-contain bg-gray-50 rounded"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.qty} x ${item.price}</p>
                                </div>
                            </div>
                            <p className="font-bold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Total Harga Produk</span>
                        <span>${totalProductPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Biaya Pajak (11%)</span>
                        <span>${appFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-3 mt-2">
                        <span>Total Pembayaran</span>
                        <span className="text-pink-600">${grandTotal.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={cart.length === 0}
                    className={`w-full mt-8 py-4 rounded-xl font-bold text-white transition-all 
                        ${cart.length > 0 ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-300 cursor-not-allowed"}`}
                >
                    Selesaikan Pembayaran
                </button>

                <button 
                    onClick={() => navigate("/cart")}
                    className="w-full mt-3 text-sm text-gray-500 hover:text-pink-600 font-medium"
                >
                    Kembali ke Keranjang
                </button>
            </div>
        </div>
    );
}