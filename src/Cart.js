import uuid from 'react-uuid';
import firebase from './firebase';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = (props) => {
    const {itemList, setItemList, currencyChoice} = props;
    const [cartCurrency, setCartCurrency] = useState(1);
    const [cartCurrencySymbol, setCartCurrencySymbol] = useState('$');

    useEffect( () => {
        axios({
            url: 'https://api.vatcomply.com/rates?base=USD',
            method: 'GET',
            dataResponse: 'json',
            params: {
                base: 'USD'
            }
        }).then( (response) => {
            setCartCurrency(response.data.rates[currencyChoice]);
        })
    }, [currencyChoice])

    useEffect( () => {
        axios({
            url: 'https://api.vatcomply.com/currencies',
            method: 'GET',
            dataResponse: 'json',
        }).then( (dataResponse) => {
            setCartCurrencySymbol((dataResponse.data[currencyChoice].symbol).replace(/[a-z]/gi, ''));
        });
    }, [currencyChoice])

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
        <div className='cartMenu'>  
            <div className="cartTitle">
                <h2>Your Cart</h2>
                <p>0 item(s)</p>
            </div>
            {
                itemList.map( (item) => {
                    return (
                        <div className="cartItemContainer" key={uuid()} id={uuid()}>
                            <div className="cartItemImageContainer">
                                <img src={item.name[0].image} alt={item.name[0].title} />
                            </div>
                            <div className="cartItemInfo">
                                <p>{item.name[0].title}</p>
                                <p>{cartCurrencySymbol} { currencyChoice === 'JPY' || currencyChoice === 'KRW' ? Math.round(item.name[0].price * cartCurrency) : (item.name[0].price * cartCurrency).toFixed(2)} {currencyChoice}</p>
                                <button onClick={() => {handleRemove(item.key)}}>
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Cart;