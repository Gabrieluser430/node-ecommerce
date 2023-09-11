import { useShoppingCart, ShoppingContextType } from "../context/shoppingCartContext";
import StoreItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id:number;
    quantity:number;
}

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart, cartQuantity, closeCart } = useShoppingCart() as ShoppingContextType;
    const item = StoreItems.find(item => item.id === id);
    if (!item) return 
    const itemTotalPrice = item.price * quantity;
    const formattedPrice = formatCurrency(item.price as number);
    const formattedTotalPrice = formatCurrency(itemTotalPrice as number);
    
    return (
        <div>
            <div className="bg-red-200 pt-6 flex flex-col justify-center items-center mb-6 ">
                <div className="flex flex-col justify-center items-center md:flex-row">
                    <div className="mr-0 md:mr-6">
                        <img 
                            src={`../../public${item.imgUrl}`}
                            style={{
                                objectFit: 'cover'
                            }}
                            className="rounded-lg w-[225px] h-[105px] md:h-[150px] lg:h-[175px]"
                            alt={item.name}
                        />
                    </div>
                    <div className="flex flex-col py-4 ">
                        <div className=" flex flex-col">
                            <div className="flex flex-row">
                                <h2 className="mr-2 font-semibold">{item.name} </h2>
                                <span className="text-gray-500 text-sm">x{quantity}</span>
                            </div>
                            <p className="text-gray-500 text-sm">{formattedPrice}</p>
                        </div>
                        <div className="flex flex-col py-2">
                            <p className="font-semibold">{formattedTotalPrice}</p>
                            <button className="py-2 px-4 mt-2 font-semibold rounded-lg mx-auto border-2 border-red-500 bg-red-500 text-white transition duration-100 hover:bg-white hover:text-gray-800" onClick={() => {
                                if (cartQuantity === 1) {
                                    removeFromCart(id)
                                    closeCart()
                                } else {
                                    removeFromCart(id);
                                }
                            }}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}