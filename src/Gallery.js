import Item from './Item';
import Form from './Form';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Gallery = (props) => {

    const {productCollection, currencyChoice, setCustomerCart} = props;
    const [userInput, setUserInput] = useState('');    
    const [filteredCollection, setFilteredCollection] = useState([]);
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [exchangeRate, setExchangeRate] = useState(1);
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
            url: 'https://api.vatcomply.com/rates?base=USD',
            method: 'GET',
            dataResponse: 'json',
            params: {
                base: 'USD'
            }
        }).then( (response) => {
            setExchangeRate(response.data.rates[currencyChoice]);
        })
    }, [currencyChoice, setExchangeRate])

    useEffect( () => {
        axios({
            url: 'https://api.vatcomply.com/currencies',
            method: 'GET',
            dataResponse: 'json',
        }).then( (dataResponse) => {
            setCurrencySymbol((dataResponse.data[currencyChoice].symbol).replace(/[a-z]/gi, ''));
        });
    }, [currencyChoice])

    return (
        <main>
            <section className="gallery">
                <div className="wrapper">
                    <Form setUserInput={setUserInput}/>
                    <h2>our products</h2>
                    <div className="flex-container">
                        { filteredCollection.map( (product) => {
                            return (
                                <Item image={product.Images[0].url_fullxfull} key={product.listing_id} itemId={product.listing_id} title={product.title} price={product.price} currencyChoice={currencyChoice} exchangeRate={exchangeRate} currencySymbol={currencySymbol} setCustomerCart={setCustomerCart}/>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Gallery;