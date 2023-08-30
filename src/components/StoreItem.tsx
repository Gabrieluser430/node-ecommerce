import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemsProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
}

export function StoreItem({ id, name, price, imgUrl}: StoreItemsProps) {
        const quantity = 0;

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
                    HEllo
                </div>
            </div>
        </div>
       )
}