import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
import Nav from './Nav';
import Gallery from './Gallery';
import Currencies from './Currencies';
import Cart from './Cart';
import firebase from './firebase';
import { getDatabase, ref, onValue, push } from 'firebase/database';

/*
** In App Component **
  - Create state items that will hold the data coming from the Unsplash API and the user input from the dropdown form.

  - Make an AXIOS call to the Unsplash API, store the data in a stateful variable. This AXIOS call will be in a useEffect with a dependency of the userInput state variable, making the page re-render only after user submits the form.

  - The form component will have access to the setUserInput function via props that is passed down.

** In Form Component **

  - On the dropdown form, we will utilize the checkbox element and put onValue to listen for the internal state changes in the form as well as value to hold the state variable.
    - Write some logic to make it so users can only choose one accessory input

  - On submission of form, user input is store the userInput variable via the setUserInput function. Causing a re-render and will be passed into the AXIOS call which will be passed into the search params.

    NOTE: The search param required by the Unsplash API is query and the value is in the form of a string.

** In App Component **
  - Once the call has been made and the data has been retrieved, store the API data in a stateful variable.
  
  - Store all the data within the state variable

  - Pass the stored data down to the gallery component as props

** In Gallery Component **

  - .map through, returning a image JSX element + H2 using the description + alt description with the unique user.key on each individual list.

*/

function App() {

  const [productCollection, setProductCollection] = useState([]);
  const [currencyChoice, setCurrencyChoice] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [customerCart, setCustomerCart] = useState([]);
  const [itemList, setItemList] = useState([]);

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
      console.log(userData);
      for (let key in userData) {
        newState.push(userData[key]);
      }
      setItemList(newState);
    })
  }, [customerCart])
  return (
    <>
      <Nav/>
      <Currencies setCurrencyChoice={setCurrencyChoice}/>
      <Cart itemList={itemList}/>
      <Header/>
      <Gallery productCollection={productCollection} currencyChoice={currencyChoice} setExchangeRate={setExchangeRate} exchangeRate={exchangeRate} setCustomerCart={setCustomerCart}/>
    </>
  );
}

export default App;
