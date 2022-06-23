import uuid from "react-uuid";
import firebase from "./firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = (props) => {
    const {itemList, setItemList, currencyChoice, setIsCartClicked} = props;
    const [cartCurrency, setCartCurrency] = useState(1);
    const [cartCurrencySymbol, setCartCurrencySymbol] = useState("$");
    const [cartTotal, setCartTotal] = useState(0);

    useEffect( () => {
        axios({
            url: "https://api.vatcomply.com/rates?base=USD",
            method: "GET",
            dataResponse: "json",
            params: {
                base: "USD"
            }
        }).then( (response) => {
            setCartCurrency(response.data.rates[currencyChoice]);
        })
    }, [currencyChoice])

    useEffect( () => {
        axios({
            url: "https://api.vatcomply.com/currencies",
            method: "GET",
            dataResponse: "json",
        }).then( (dataResponse) => {
            setCartCurrencySymbol((dataResponse.data[currencyChoice].symbol).replace(/[a-z]/gi, ""));
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
    const handleExitClick = () => {
        setIsCartClicked(false);
    }

    useEffect( () => {
        const totalPriceArray = [];

        itemList.forEach( (item) => {
                console.log(item.name[0].price);
            totalPriceArray.push(item.name[0].price);
        })

        const sum = totalPriceArray.reduce( (a, b) => a + b, 0);
        setCartTotal(sum);

    }, [itemList]);

    const handleCartExitKey = (e) => {
        if (e.code === "Enter") {
            handleExitClick();
        }
    }

    return(
        <div className="cartMenu">  
            <div className="cartTitle">
                <h2>Your Cart</h2>
                <p>{itemList.length} item(s)</p>
            </div>
            <button className="exitCart" onClick={handleExitClick} onKeyPress={handleCartExitKey}aria-label="exit cart menu">
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
            <div className="cartWrapper">
                {
                    itemList.map( (item) => {
                        return (
                            <div className="cartItemContainer" key={uuid()} id={uuid()}>
                                <div className="cartItemImageContainer">
                                    <img src={item.name[0].image} alt={item.name[0].title} />
                                </div>
                                <div className="cartItemInfo">
                                    <div className="cartItemText">
                                        <p>{item.name[0].title}</p>
                                        <p className="cartItemCurrency">{cartCurrencySymbol} { currencyChoice === "JPY" || currencyChoice === "KRW" ? Math.round(item.name[0].price * cartCurrency) : (item.name[0].price * cartCurrency).toFixed(2)} {currencyChoice}</p>
                                    </div>
                                    <button onClick={() => {handleRemove(item.key)}}>
                                        <i className="fa-solid fa-trash"></i>  Remove Item
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="cartCheckout">
                    <p className="cartTotal">Your total: {cartCurrencySymbol} { currencyChoice === "JPY" || currencyChoice === "KRW" ? Math.round(cartTotal * cartCurrency) : (cartTotal * cartCurrency).toFixed(2)} {currencyChoice}</p>
                    <a href="https://www.etsy.com/ca/shop/JnLNaturals" target="_blank" rel="noreferrer" className="buyNow">buy now</a>
                </div>
            </div>
        </div>
    )
}

export default Cart;