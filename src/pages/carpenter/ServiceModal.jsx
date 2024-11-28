import React from "react";
import { Dialog } from "primereact/dialog";
import { images } from "../../json";
import classes from "./Carpenter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, openModal } from "../../slice/serviceModalSlice";
import { RxCross1 } from "react-icons/rx";

export default function ServiceModal() {
    const data = useSelector((state) => state.serviceModal);
    const dispatch = useDispatch();

    const showService = (itemId, itemName) => {
        dispatch(openModal({ id: itemId, name: itemName }));
    };

    return (
        <div className="card flex justify-content-center bg-white">
            <Dialog
                header="Header"
                visible={data.showModal}
                className="bg-white border border-gray-300 rounded-lg shadow-lg p-2 relative"
                closable={false} // Hide default close icon
                onHide={() => {
                    if (!data.showModal) return;
                    dispatch(closeModal());
                }}
            >
                {/* Custom Close Icon */}
                <button
                    className="absolute top-0 right-1 p-2 rounded-full bg-black border border-gray-300 hover:bg-gray-300 focus:outline-none z-10"
                    onClick={() => dispatch(closeModal())}
                    aria-label="Close"
                >
                    <RxCross1 size={20} className="text-white hover:text-gray-800" />
                </button>

                {/* Modal Content */}
                <div className="grid grid-cols-4 max-[900px]:grid-cols-2 gap-4">
                    {images.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg hover:underline"
                            onClick={() => showService(1, item.title)}
                        >
                            <div
                                className={`w-full max-[900px]:w-[80px] max-[900px]:h-[60px] h-[100px] md:h-[80px] lg:h-[80px] shadow-md rounded-lg overflow-hidden ${classes.img_div}`}
                            >
                                <img
                                    className="w-full h-full object-fill"
                                    src={item.image}
                                    alt={item.title}
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800 mt-2">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </Dialog>
        </div>
    );
}
