import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart, ShoppingContextType } from "../context/shoppingCartContext"

type StoreItemsProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
}

export function StoreItem({ id, name, price, imgUrl}: StoreItemsProps) {
        const {
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart
             } = useShoppingCart() as ShoppingContextType;
        const quantity = getItemQuantity(id);

       return (
        <div className="shadow-lg rounded-lg">
            <div style={{ width:'400px' }}>
                <img
                    src={`../../public${imgUrl}`}
                    alt={name}
                    style={{ objectFit:'cover', height: '200px', width:'100%'}}
                    className=" rounded-t-lg"
                    />
            </div>
            <div className="flex flex-col px-4 py-6">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{name}</span>
                    <span className="text-gray-600">{formatCurrency(price)}</span>
                </div>
                <div>
                    {quantity === 0 ? (
                        <button className=" w-full text-white bg-blue-500 rounded-sm p-2 mt-4" onClick={() => increaseCartQuantity(id)}>
                           + Add To Cart
                        </button>
                    ) : (
                        <div className="flex flex-col justify-center items-center mt-4">
                            <div className="flex flex-row justify-center items-center h-10 ">
                                <button className="text-center bg-blue-500 rounded-md text-white text-2xl w-10 h-full" onClick={() => decreaseCartQuantity(id)}>-</button>
                                <div className="mx-4">
                                    <span className="font-semibold text-xl mr-2">{quantity}</span>
                                    in cart
                                </div>
                                <button className="bg-blue-500 rounded-md text-white text-xl w-10 h-full">+</button>
                            </div>
                            <div className="">
                                <button className="bg-red-600 text-white font-semibold rounded-md mt-2 px-6 py-2" onClick={() => removeFromCart(id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
       )
}