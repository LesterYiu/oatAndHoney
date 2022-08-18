import "./App.css";
import {useState, useEffect} from "react";
import axios from "axios";
import FocusLock from "react-focus-lock";
import { Routes, Route} from "react-router-dom";
import firebase from "./firebase";
import { getDatabase, ref, onValue, push } from "firebase/database";
import Header from "./Header";
import Nav from "./Nav";
import Gallery from "./Gallery";
import Cart from "./Cart";
import Footer from "./Footer";
import ItemModal from "./ItemModal";


function App() {

  //  Handles the items in inventory
  const [productCollection, setProductCollection] = useState([]);

  // Handles currency choice of user input
  const [currencyChoice, setCurrencyChoice] = useState("USD");

  // Pushes the item onto firebase
  const [customerCart, setCustomerCart] = useState([]);

  // Firebase item
  const [itemList, setItemList] = useState([]);

  // Cart Button
  const [isCartClicked, setIsCartClicked] = useState(false);

  // Currency
  const [exchangeRate, setExchangeRate] = useState(1);

  // Currency Symbol
  const [currencySymbol, setCurrencySymbol] = useState("$");

  useEffect(() => {
    axios({
      url: "https://powerful-peak-98750.herokuapp.com/https://openapi.etsy.com/v2/shops/18372328/listings/active/",
      dataResponse: "json",
      method: "GET",
      params: {
        api_key: "l227pbb94xqk5gj4mfg9ayva",
        includes: "Images, Shop",
        limit: 45
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
    <Routes>
      <Route path="/" element={
        <>
          {isCartClicked ? <div className="coverPage"></div> : null}
          <Nav setIsCartClicked={setIsCartClicked} isCartClicked={isCartClicked} itemList={itemList}/>
          <Header/>
          {isCartClicked ? <FocusLock><Cart itemList={itemList} setItemList={setItemList} currencyChoice={currencyChoice} setIsCartClicked={setIsCartClicked} exchangeRate={exchangeRate}/></FocusLock> : false}
          <Gallery productCollection={productCollection} currencyChoice={currencyChoice} setCustomerCart={setCustomerCart} setCurrencyChoice={setCurrencyChoice} exchangeRate={exchangeRate} setExchangeRate={setExchangeRate} currencySymbol={currencySymbol} setCurrencySymbol={setCurrencySymbol}/>
          <Footer/>
        </>
      }>
      </Route>
      <Route path="/product/:itemID" element={
        <>
        <Nav setIsCartClicked={setIsCartClicked} isCartClicked={isCartClicked} itemList={itemList}/>
        {isCartClicked ? <FocusLock><Cart itemList={itemList} setItemList={setItemList} currencyChoice={currencyChoice} setIsCartClicked={setIsCartClicked}/></FocusLock> : false}
        <ItemModal exchangeRate={exchangeRate} currencyChoice={currencyChoice} currencySymbol={currencySymbol} setCustomerCart={setCustomerCart}/>
        <Footer/>
        </>
      }/>
    </Routes>
  );
}

export default App;