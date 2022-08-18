import uuid from "react-uuid";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ItemModal = (props) => {

    const {exchangeRate, currencyChoice, currencySymbol, setCustomerCart} = props;

    // Uses the itemID of the product to search through the API data
    const { itemID } = useParams();

    // The API results for the singular item corresponding to the item ID
    const [singleItem, setSingleItem] = useState([]);

    // Populates the info dropdown menu
    const [isInfoClicked, setIsInfoClicked] = useState(false);

    const storeUserSelection = () => {

        const userSelection = [];
        userSelection.push({
            image: singleItem[0].Images[0].url_fullxfull,
            title: singleItem[0].title,
            price: parseFloat(singleItem[0].price),
            exchangeRate: exchangeRate,
            currencyChoice: currencyChoice,
            itemId: itemID,
            currencySymbol: currencySymbol,
        })
        setCustomerCart(userSelection);
    }
    
    useEffect(() => {
        axios({
            url: `https://powerful-peak-98750.herokuapp.com/https://openapi.etsy.com/v2/listings//${itemID}`,
            dataResponse: "json",
            method: "GET",
            params: {
                api_key: "l227pbb94xqk5gj4mfg9ayva",
                includes: "Images, Shop"
            }
        }).then( (apiData) => {
            setSingleItem(apiData.data.results);
        });
    }, [itemID])

    return (
        <div className="itemModal">
            <div className="wrapper">
                <Link to="/">
                    <span className="sr-only">Go back to home page</span>
                    <i className="fa-solid fa-arrow-left exitArrow" aria-hidden="true"></i>
                </Link>
                {
                    singleItem.length === 0 ? 
                    <div className="loading">
                        <p>Loading</p>
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div> :
                    singleItem.map( (item) => {
                        return(
                            <div key={uuid()} className="flexContainer">
                                <div className="modalInfo">
                                    <h2>{item.title}</h2>
                                    <p className="productId">Item ID: {item.listing_id}</p>
                                    <p className="modalPrice">{currencySymbol} {currencyChoice === "JPY" || currencyChoice === "KRW" ? Math.round(item.price * exchangeRate) : (item.price * exchangeRate).toFixed(2)} {currencyChoice}</p>
                                    <button className="modalBuyButton" onClick={storeUserSelection}>Add to Cart</button>
                                    <h3 onClick={() => {setIsInfoClicked(!isInfoClicked)}}>Ingredients
                                        <button aria-label="see description">
                                            <span className="sr-only">read ingredients list</span>
                                            {isInfoClicked ? <i className="fa-solid fa-minus ingredientIcon"></i> : <i className="fa-solid fa-plus ingredientIcon" aria-hidden="true"></i>}
                                        </button>
                                    </h3>
                                    {isInfoClicked ?
                                        <ul>
                                            {item.materials.map( (i) => {
                                                return(<li key={uuid()}>- {i}</li>);
                                            })}
                                        </ul> : null
                                    }
                                </div> 
                                <div className="modalImageContainer" key={uuid()}>
                                    <img src={item.Images[0].url_fullxfull} alt={item.title} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ItemModal;