import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
import Nav from './Nav';
import Gallery from './Gallery';
import Cart from './Cart';
import firebase from './firebase';
import { getDatabase, ref, onValue, push } from 'firebase/database';

function App() {

  //  Handles the items in inventory
  const [productCollection, setProductCollection] = useState([]);

  // Handles currency choice of user input
  const [currencyChoice, setCurrencyChoice] = useState('USD');

  // Pushes the item onto firebase
  const [customerCart, setCustomerCart] = useState([]);

  // Firebase item
  const [itemList, setItemList] = useState([]);

  const [isCartClicked, setIsCartClicked] = useState(false);

  useEffect(() => {
    axios({
      url: 'https://powerful-peak-98750.herokuapp.com/https://openapi.etsy.com/v2/shops/18372328/listings/active/',
      dataResponse: 'json',
      method: 'GET',
      params: {
        api_key: 'l227pbb94xqk5gj4mfg9ayva',
        includes: 'Images, Shop'
      }
    }).then( (apiData) => {
      setProductCollection(apiData.data.results);
    });
  }, [])

  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const newState = [];
    push(dbRef, customerCart);

    onValue(dbRef, (response) => {
      const userData = response.val();
      for (let key in userData) {
        newState.push({key: key, name: userData[key]});
      }
      setItemList(newState);
    })
  }, [customerCart])
  
  return (
    <>
      <Nav setIsCartClicked={setIsCartClicked} isCartClicked={isCartClicked}/>
      <Header/>
      {isCartClicked ? <Cart itemList={itemList} setItemList={setItemList} currencyChoice={currencyChoice}/> : null}
      <Gallery productCollection={productCollection} currencyChoice={currencyChoice} setCustomerCart={setCustomerCart} setCurrencyChoice={setCurrencyChoice}/>
    </>
  );
}

export default App;
