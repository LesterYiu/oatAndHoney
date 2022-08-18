import uuid from "react-uuid";
import firebase from "./firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = (props) => {
    const {itemList, setItemList, currencyChoice, setIsCartClicked, exchangeRate, setCustomerCart} = props;
    const [cartCurrency, setCartCurrency] = useState(1);
    const [cartCurrencySymbol, setCartCurrencySymbol] = useState("$");
    const [cartTotal, setCartTotal] = useState(0);

    // Final Restructured Data using Firebase information
    const [finalArrList, setFinalArrList] = useState([]);

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

    useEffect( () => {
        // This counts the duplicates in the set of data containing all the items
        const count = {};
        itemList.forEach( (i) => {
            const element = i.name[0].title;
            if (count[element]) {
                count[element] = {
                    title: element,
                    count: count[element].count + 1,
                    image: [i][0].name[0].image,
                    currencyChoice: currencyChoice,
                    currencySymbol: cartCurrencySymbol,
                    exchangeRate: exchangeRate,
                    itemId: [i][0].name[0].itemId,
                    price: [i][0].name[0].price,
                    key: i.key
                }
            } else {
                count[element] = {
                    title: element,
                    count: 1,
                    image: [i][0].name[0].image,
                    currencyChoice: currencyChoice,
                    currencySymbol: cartCurrencySymbol,
                    exchangeRate: exchangeRate,
                    itemId: [i][0].name[0].itemId,
                    price: [i][0].name[0].price,
                    key: i.key
                };
            }
        })

        const finalArrItems = [];

        for (let i in count) {
            finalArrItems.push(count[i]);
        }

        setFinalArrList(finalArrItems);
    }, [itemList, currencyChoice, cartCurrencySymbol, exchangeRate])

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

    const handleAdd = (itemId) => {
        axios({
            url: `https://powerful-peak-98750.herokuapp.com/https://openapi.etsy.com/v2/listings/${itemId}`,
            dataResponse: "json",
            method: "GET",
            params: {
                api_key: "l227pbb94xqk5gj4mfg9ayva",
                includes: "Images, Shop"
            }
        }).then((response) => {
            const results = response.data.results;
            const userSelection = [];
            userSelection.push({
                image: results[0].Images[0].url_fullxfull,
                title: results[0].title,
                price: parseFloat(results[0].price),
                exchangeRate: exchangeRate,
                currencyChoice: currencyChoice,
                itemId: itemId,
                currencySymbol: cartCurrencySymbol,
            })
            setCustomerCart(userSelection);
        })
    }

    const handleExitClick = () => {
        setIsCartClicked(false);
    }

    useEffect( () => {
        const totalPriceArray = [];

        itemList.forEach( (item) => {
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
                    finalArrList.map( (item) => {
                        return (
                            <div className="cartItemContainer" key={uuid()} id={uuid()}>
                                <div className="cartItemImageContainer">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="cartItemInfo">
                                    <div className="cartItemText">
                                        <p>{item.title}</p>
                                        <p className="cartQuantity">
                                            <i className="fa-solid fa-minus cartIcons" onClick={() => {handleRemove(item.key)}}>
                                                <span className="sr-only">remove one item</span>
                                            </i>
                                            <span>{item.count}</span>
                                            <i className="fa-solid fa-plus cartIcons" onClick={() => {handleAdd(item.itemId)}}>
                                                <span className="sr-only">add one item</span>
                                            </i>
                                        </p>
                                        <p className="cartItemCurrency">{cartCurrencySymbol} { currencyChoice === "JPY" || currencyChoice === "KRW" ? Math.round(item.price * item.count * cartCurrency) : (item.price * cartCurrency * item.count).toFixed(2)} {currencyChoice}</p>
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