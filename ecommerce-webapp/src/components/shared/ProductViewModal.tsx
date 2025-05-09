import {
    Description,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    // Divider,
} from "@headlessui/react";

import { MdDone, MdClose } from "react-icons/md";

import { Divider } from "@mui/material";
import Status from "./Status";

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
}

interface productViewModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    product?: productProp;
    isAvailable: boolean;
}

const ProductViewModal = ({
    open,
    setOpen,
    product,
    isAvailable,
}: productViewModalProps) => {
    // let [isOpen, setIsOpen] = useState(false);

    const description = product?.description ?? "No description available";
    const productName = product?.productName ?? "Unknown Product";
    const specialPrice = product?.specialPrice ?? 0;
    const image = product?.image ?? "";
    const price = product?.price ?? 0;
    const productId = product?.productId ?? 0;
    const quantity = product?.quantity ?? 0;
    const discount = product?.discount ?? 0;
    const id = product?.id;

    // const {
    //     productId = product?.productId ?? 0,
    //     productName,
    //     image,
    //     description,
    //     quantity,
    //     price,
    //     discount,
    //     specialPrice,
    //     id,
    // } = product;

    return (
        <>
            {/* <button onClick={() => setOpen(true)}>Open dialog</button> */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="relative z-50"
            >
                <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-70 transition-opacity" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full">
                        {image && (
                            <div className="flex justify-center aspect-[3/2]">
                                <img
                                    // className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                                    src={image}
                                    alt={productName}
                                />
                            </div>
                        )}

                        <div className="px-6 pt-10 pb-2">
                            <DialogTitle
                                as="h1"
                                className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4"
                            >
                                {productName}
                            </DialogTitle>

                            <div className="space-y-2 text-gray-700 pb-r">
                                <div className="flex items-center justify-between gap-2">
                                    {specialPrice ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 line-through">
                                                ${Number(price).toFixed(2)}
                                            </span>
                                            <span className="sm:text-xl font-semibold text-slate-700">
                                                $
                                                {Number(specialPrice).toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-xl font-bold">
                                            {" "}
                                            ${Number(price).toFixed(2)}
                                        </span>
                                    )}
                                    {isAvailable ? (
                                        // <p>In Stock</p>
                                        <Status
                                            text="In Stock"
                                            icon={MdDone}
                                            bg="bg-teal-200"
                                            color="text-teal-900"
                                        />
                                    ) : (
                                        // <p>Out of Stock</p>

                                        <Status
                                            text="Out of Stock"
                                            icon={MdClose}
                                            bg="bg-rose-200"
                                            color="text-rose-700"
                                        />
                                    )}
                                </div>
                                <Divider />
                                <Description>{description}</Description>
                            </div>
                        </div>

                        <div className="px-6 py-4 flex justify-end gap-4">
                            <button
                                onClick={() => setOpen(false)}
                                type="button"
                                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-800 border hover:border-slate-800 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default ProductViewModal;
