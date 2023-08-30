import storeItems from '../data/items.json';
import { StoreItem } from '../components/StoreItem';

export function Store() {
    return (
        <>
        <div className='grid grid-cols-1 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {storeItems.map(item => {
                return (
                    <div key={item.id}>
                        <StoreItem
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            imgUrl={item.imgUrl}
                        />
                    </div>
                )
            })}
        </div>
        </>
    )
}