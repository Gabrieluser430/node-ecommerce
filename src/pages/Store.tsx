import storeItems from '../data/items.json';
import { StoreItem } from '../components/StoreItem';

export function Store() {
    return (
        <>
        <div className='grid gap-x-3 grid-cols-1 gap-y-3 lg:grid-cols-2 xl:grid-cols-3'>
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