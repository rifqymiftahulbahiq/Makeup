import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiArrowRight, HiX } from "react-icons/hi";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function BannerComponent() {
    const { cart } = useContext(CartContext);

    return (
        <Banner>
            <div className="flex w-full flex-col justify-between border-b border-pink-700 bg-pink-600 p-4 md:flex-row text-white">

                <div>
                    <h2 className="mb-1 text-base font-semibold text-white">
                        Mulai belanja
                    </h2>
                    <p className="text-sm text-white">
                        Temukan kebutuhanmu dan mulai belanja sekarang
                    </p>
                </div>

                <div className="flex shrink-0 items-center mt-2 md:mt-0">

                    <Link
                        to="/cart"
                        className="relative mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100"
                    >
                        <IoIosCart className="mr-2 h-4 w-4" />
                        Keranjang

                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    {/* Selengkapnya */}
                    <Link
                        to="/products"
                        className="mr-2 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-800"
                    >
                        Selengkapnya
                        <HiArrowRight className="ml-2 h-4 w-4" />
                    </Link>

                    <BannerCollapseButton
                        color="gray"
                        className="border-0 bg-transparent text-white"
                    >
                        <HiX className="h-4 w-4" />
                    </BannerCollapseButton>
                </div>

            </div>
        </Banner>
    );
}