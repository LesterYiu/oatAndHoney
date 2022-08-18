import Item from "./Item";
import Form from "./Form";
import Currencies from "./Currencies";
import {useState, useEffect} from "react";
import axios from "axios";

const Gallery = (props) => {

    const {productCollection, currencyChoice, setCustomerCart, setCurrencyChoice, setExchangeRate, exchangeRate, currencySymbol, setCurrencySymbol} = props;

    // The user's filtered choice
    const [userInput, setUserInput] = useState("");  
    
    // Filtered collection with the user's choice
    const [filteredCollection, setFilteredCollection] = useState([]);

    // Currency dropdown menu
    const [isCurrencyShown, setIsCurrencyShow] = useState(false);

    // Product list dropdown menu
    const [isProductListShown, setIsProductListShown] = useState(false);

    // Filters the gallery according to product filter choice
    useEffect( () => {
        if(userInput) {
            setFilteredCollection(productCollection.filter ( (item) => {
                return item.taxonomy_path.includes(userInput);
            }))
        } else {
            setFilteredCollection(productCollection);
        }
    }, [userInput, productCollection])
    
    // Updates exchange rate based on currency input
    useEffect( () => {
        axios({
            url: "https://api.vatcomply.com/rates?base=USD",
            method: "GET",
            dataResponse: "json",
            params: {
                base: "USD"
            }
        }).then( (response) => {
            setExchangeRate(response.data.rates[currencyChoice]);
        })
    }, [currencyChoice, setExchangeRate])

    // Sets currency symbol based on user input
    useEffect( () => {
        axios({
            url: "https://api.vatcomply.com/currencies",
            method: "GET",
            dataResponse: "json",
        }).then( (dataResponse) => {
            setCurrencySymbol((dataResponse.data[currencyChoice].symbol).replace(/[a-z]/gi, ""));
        });
    }, [currencyChoice, setCurrencySymbol])

    // Dropdown for currency choice
    const handleCurrencyClick = () => {
        setIsCurrencyShow(!isCurrencyShown);
        if (isProductListShown) {
            setIsProductListShown(!isProductListShown);
        }
    }
    
    // Dropdown for prodcut type
    const handleProductClick = () => {
        setIsProductListShown(!isProductListShown);
        if (isCurrencyShown) {
            setIsCurrencyShow(!isCurrencyShown);
        }
    }

    return (
        <main role="main">
            <section className="gallery" id="gallerySection">
                <div className="wrapper">
                    <h2>Our Products</h2>
                    <div className="filterButtonContainer">
                        <button onClick={handleCurrencyClick} className="productFilter">
                            <p>Change Currency</p>
                            { isCurrencyShown ? <i className="fa-solid fa-caret-up" aria-hidden="true"></i> : <i className="fa-solid fa-caret-down" aria-hidden="true"></i> }
                        </button>
                        <button onClick={handleProductClick} className="productFilter productButtonTwo">
                            <p>Product Type</p>
                            { isProductListShown ? <i className="fa-solid fa-caret-up" aria-hidden="true"></i> : <i className="fa-solid fa-caret-down" aria-hidden="true"></i> }
                        </button>
                    </div>
                    {
                        isCurrencyShown ? <Currencies setCurrencyChoice={setCurrencyChoice}/> : null
                    }
                    {
                        isProductListShown ? <Form setUserInput={setUserInput}/> : null
                    }
                    <div className="flexContainer">
                        {filteredCollection.length === 0 ? 
                        <div className="loading">
                            <p>Loading</p>
                            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div> : 
                            filteredCollection.map( (product) => {
                                return (
                                    <Item image={product.Images[0].url_fullxfull} key={product.listing_id} itemId={product.listing_id} title={product.title} price={product.price} description={product.materials} currencyChoice={currencyChoice} exchangeRate={exchangeRate} currencySymbol={currencySymbol} setCustomerCart={setCustomerCart}/>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Gallery;