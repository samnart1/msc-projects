import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { truncateText } from "../../utils/truncateText";
import ProductViewModal from "./ProductViewModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/action";
import { toast } from "react-hot-toast";

interface productProp {
    productId: number;
    productName: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    specialPrice: number;
    id?: number;
    about?: boolean;
}

const defaultProduct: productProp = {
    productId: 0,
    productName: "Unknown",
    image: "",
    description: "No description available",
    quantity: 0,
    price: 0,
    discount: 0,
    specialPrice: 0,
    about: false,
};

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    about,
}: productProp) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const [selectedViewProduct, setSelectedViewProduct] =
        useState<productProp>();
    const btnLoader = false;
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();

    const handleProductView = (product: productProp) => {
        if (!about) {
            setSelectedViewProduct({ ...product, id: product.productId });
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems: productProp) => {
        dispatch(addToCart(cartItems, 1, toast));
    };

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div
                onClick={() => {
                    handleProductView({
                        productId,
                        id: productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice,
                    });
                }}
                className="w-full overflow-hidden aspect-[3/2]"
            >
                <img
                    src={image}
                    alt={productName}
                    className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h2
                    onClick={() => {
                        handleProductView({
                            productId,
                            id: productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        });
                    }}
                    className="text-lg font-semibold mb-2 cursor-pointer"
                >
                    {truncateText(productName, 20)}
                </h2>
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">
                        {truncateText(description, 50)}
                    </p>
                </div>
                {!about && (
                    <div className="flex items-center justify-between">
                        {/* className="flex justify-center items-center"  */}
                        {specialPrice ? (
                            <div className="flex flex-col">
                                <span className="text-gray-700 line-through">
                                    ${Number(price).toFixed(2)}
                                </span>
                                <span className="text-xl font-bold text-slate-700">
                                    ${Number(specialPrice).toFixed(2)}
                                </span>
                            </div>
                        ) : (
                            <div>
                                <span className="text-xl font-bold text-slate-700">
                                    {" "}
                                    ${Number(specialPrice).toFixed(2)}
                                </span>
                            </div>
                        )}
                        <button
                            disabled={!isAvailable || btnLoader}
                            onClick={() =>
                                addToCartHandler({
                                    productId,
                                    productName,
                                    image,
                                    description,
                                    quantity,
                                    price,
                                    discount,
                                    specialPrice,
                                })
                            }
                            className={`bg-blue-500 ${
                                isAvailable
                                    ? "opacity-100 hover:bg-blue-600 cursor-pointer"
                                    : "opacity-70"
                            } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
                        >
                            <FaShoppingCart className="mr-2" />
                            {isAvailable ? "Add to Cart" : "Stock Out"}
                        </button>
                    </div>
                )}
                <ProductViewModal
                    open={openProductViewModal}
                    setOpen={setOpenProductViewModal}
                    product={selectedViewProduct ?? defaultProduct}
                    isAvailable={!!isAvailable}
                />
            </div>
        </div>
    );
};

export default ProductCard;
