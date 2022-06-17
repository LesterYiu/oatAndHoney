import Item from './Item';
import Form from './Form';
import {useState, useEffect} from 'react';

const Gallery = (props) => {
/*
    PSEUDO CODE

    1. Filter out from the productCollection, all the objects with the taxonomy_path that matches the userInput and push it to a new array so we don't mutate state directly.

    2. .map through the new filtered array rather than the state array

    3. loop through the productCollection state on page load but not after.
*/
    const [userInput, setUserInput] = useState('');
    const {productCollection} = props;
    const [filteredCollection, setFilteredCollection] = useState([]);
    useEffect( () => {
        if(userInput) {
            setFilteredCollection(productCollection.filter ( (item) => {
                return item.taxonomy_path.includes(userInput);
            }))
        } else {
            setFilteredCollection(productCollection);
        }
    }, [userInput, productCollection])
    
    return (
        <main>
            <section className="gallery">
                <div className="wrapper">
                    <Form setUserInput={setUserInput}/>
                    <h2>our products</h2>
                    <div className="flex-container">
                        { filteredCollection.map( (product) => {
                            return (
                                <Item image={product.Images[0].url_fullxfull} key={product.listing_id} title={product.title} price={product.price} currency={product.currency_code}/>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Gallery;