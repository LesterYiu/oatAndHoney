import Item from "./Item";
import Form from "./Form";
import Currencies from "./Currencies";
import {useState, useEffect} from "react";
import axios from "axios";

const Gallery = (props) => {

    const {productCollection, currencyChoice, setCustomerCart, setCurrencyChoice, setExchangeRate, exchangeRate, currencySymbol, setCurrencySymbol} = props;
    const [userInput, setUserInput] = useState("");    
    const [filteredCollection, setFilteredCollection] = useState([]);
    // const [exchangeRate, setExchangeRate] = useState(1);
    const [isCurrencyShown, setIsCurrencyShow] = useState(false);
    const [isProductListShown, setIsProductListShown] = useState(false);

    useEffect( () => {
        if(userInput) {
            setFilteredCollection(productCollection.filter ( (item) => {
                return item.taxonomy_path.includes(userInput);
            }))
        } else {
            setFilteredCollection(productCollection);
        }
    }, [userInput, productCollection])
    
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

    useEffect( () => {
        axios({
            url: "https://api.vatcomply.com/currencies",
            method: "GET",
            dataResponse: "json",
        }).then( (dataResponse) => {
            setCurrencySymbol((dataResponse.data[currencyChoice].symbol).replace(/[a-z]/gi, ""));
        });
    }, [currencyChoice, setCurrencySymbol])

    const handleCurrencyClick = () => {
        setIsCurrencyShow(!isCurrencyShown);
        if (isProductListShown) {
            setIsProductListShown(!isProductListShown);
        }
    }
    
    const handleProductClick = () => {
        setIsProductListShown(!isProductListShown);
        if (isCurrencyShown) {
            setIsCurrencyShow(!isCurrencyShown);
        }
    }

    return (
        <main>
            <section className="gallery" id="gallerySection">
                <div className="wrapper">
                    <h2>Our Products</h2>
                    <div className="filterButtonContainer">
                        <button onClick={handleCurrencyClick} className="productFilter">
                            <p>Currency</p>
                            <i className="fa-solid fa-caret-down" aria-hidden="true"></i>
                        </button>
                        <button onClick={handleProductClick} className="productFilter productButtonTwo">
                            <p>Product Type</p>
                            <i className="fa-solid fa-caret-down" aria-hidden="true"></i>
                        </button>
                    </div>
                    {
                        isCurrencyShown ? <Currencies setCurrencyChoice={setCurrencyChoice}/> : null
                    }
                    {
                        isProductListShown ? <Form setUserInput={setUserInput}/> : null
                    }
                    <div className="flexContainer">
                        { filteredCollection.map( (product) => {
                            return (
                                <Item image={product.Images[0].url_fullxfull} key={product.listing_id} itemId={product.listing_id} title={product.title} price={product.price} description={product.materials} currencyChoice={currencyChoice} exchangeRate={exchangeRate} currencySymbol={currencySymbol} setCustomerCart={setCustomerCart}/>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Gallery;