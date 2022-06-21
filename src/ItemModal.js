import uuid from "react-uuid";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

const ItemModal = () => {
    const { itemID } = useParams();
    const [singleItem, setSingleItem] = useState([]);

    useEffect(() => {
        axios({
            url: `https://powerful-peak-98750.herokuapp.com/https://openapi.etsy.com/v2/listings//${itemID}`,
            dataResponse: 'json',
            method: 'GET',
            params: {
                api_key: 'l227pbb94xqk5gj4mfg9ayva',
                includes: 'Images, Shop'
            }
        }).then( (apiData) => {
            setSingleItem(apiData.data.results);
        });
    }, [itemID])

    return (
        <div className="itemModal">
            <div className="wrapper">
                <div className="flexContainer">
                    {
                        singleItem.map( (item) => {
                            return(
                                <div className="modalInfo" key={uuid()}>
                                    <h2>{item.title}</h2>
                                    <p className="productId">Item ID: {item.listing_id}</p>
                                    {/* <p>{currencySymbol} { currencyChoice === 'JPY' || currencyChoice === 'KRW' ? Math.round(price * exchangeRate) : (price * exchangeRate).toFixed(2)} {currencyChoice}</p> */}
                                    <button>Buy Now</button>
                                    <h3>Ingredients</h3>
                                    <ul>
                                        {item.materials.map( (i) => {
                                            return(<li key={uuid()}>{i}</li>);
                                        })}
                                    </ul>
                                </div>
                            )
                        })
                    }
                    {
                        singleItem.map( (item) => {
                            return(
                                <div className="modalImageContainer" key={uuid()}>
                                    <img src={item.Images[0].url_fullxfull} alt={item.title} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemModal;