import uuid from 'react-uuid';
import firebase from './firebase';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

const Cart = (props) => {
    const {itemList, setItemList} = props;

    const handleRemove = (itemId) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${itemId}`);
        const topRef = ref(database);
        const newState = [];;
        remove(dbRef);

        onValue(topRef, (response) => {
            const userData = response.val();
            for (let key in userData) {
                newState.push({key: key, name: userData[key]});
            }
            setItemList(newState);
        })
    }

    return(
        <>  
            <h2>Cart</h2>
            {
                itemList.map( (item) => {
                    return (
                        <div className="item-container" key={uuid()} id={uuid()}>
                            <div className="image-container">
                                <img src={item.name[0].image} alt={item.name[0].title} />
                            </div>
                            <p>{item.name[0].title}</p>
                            <p>{item.name[0].currencySymbol} { item.name[0].currencyChoice === 'JPY' || item.name[0].currencyChoice === 'KRW' ? Math.round(item.name[0].price * item.name[0].exchangeRate) : (item.name[0].price * item.name[0].exchangeRate).toFixed(2)} {item.name[0].currencyChoice}</p>
                            <button onClick={() => {handleRemove(item.key)}}>Remove from cart</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Cart;