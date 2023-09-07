import { useShoppingCart } from "../context/shoppingCartContext";
import StoreItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id:number;
    quantity:number;
}

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart();
    const item = StoreItems.find(item => item.id === id);
    const formattedPrice = formatCurrency(item?.price as number);
    
    if (item == null) return null

    return (
        <div>
            <div className="flex flex-col">
                <div>
                    <img 
                        src={`../../public${item.imgUrl}`}
                        style={{
                            width: '125px',
                            height: '75px',
                            objectFit: 'cover'
                        }}
                        alt={item.name}
                    />
                </div>
                <div>
                    <div>
                        <h2>{item.name}</h2>
                        <p>{formattedPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}