import React, { useEffect, useRef, useState } from "react";
import { useShoppingCart, ShoppingContextType } from "../context/shoppingCartContext";
import { motion, useAnimation } from "framer-motion";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
    isOpen: boolean;
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart() as ShoppingContextType;
    const controls = useAnimation();
    const offCanvasRef = useRef<any>();

    useEffect(() => {
        if (isOpen) {
            controls.start({ translateX: '0%' }); 
        } else {
            controls.start({ translateX: '100%' }); 
        }
    }, [isOpen]);

    const handleCloseClick = () => {
        controls.start({ translateX: '100%' }); 
        closeCart();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (offCanvasRef.current && !offCanvasRef.current.contains(event.target)) {
                handleCloseClick();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = cartItems.slice(startIndex, endIndex);
    const totalPages = Math.ceil(cartItems.length / itemsPerPage);

    return (
        <motion.div
            initial={{ translateX: isOpen ? '0%' : '100%' }}
            animate={controls}
            className="bg-white fixed inset-y-0 right-0 w-1/2 overflow-y-auto shadow-lg transition-transform duration-75 lg:w-1/3"
            ref={offCanvasRef} 
        >
            <div className="p-4 bg-white flex justify-between items-center px-2 py-2 lg:px-12 lg:py-6 ">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <button
                    className="text-gray-600 hover:text-gray-800 text-xl font-bold"
                    onClick={handleCloseClick}
                >
                    X
                </button>
            </div>

            <div className="p-4">
                {itemsToDisplay.map(item => (
                    <CartItem
                        key={item.id}
                        {...item}                        
                    />
                ))}
            </div>

            <div className="p-4 flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === index + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
