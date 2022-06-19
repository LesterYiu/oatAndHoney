import {useState} from 'react';

const Currencies = (props) => {
    const {setCurrencyChoice} = props;
    const [checkUSD, setCheckUSD] = useState(false);
    const [checkCAD, setCheckCAD] = useState(false);
    const [checkEUR, setCheckEUR] = useState(false);
    const [checkAUD, setCheckAUD] = useState(false);
    const [checkGBP, setCheckGBP] = useState(false);
    const [checkJPY, setCheckJPY] = useState(false);
    const [checkHKD, setCheckHKD] = useState(false);
    const [checkKRW, setCheckKRW] = useState(false);

    const handleCurrencyClick = (e) => {
        setCurrencyChoice(e.target.value);
    }
    const setAllInput = () => {
        setCheckUSD(false);
        setCheckCAD(false);
        setCheckEUR(false);
        setCheckAUD(false);
        setCheckGBP(false);
        setCheckJPY(false);
        setCheckHKD(false);
        setCheckKRW(false);
    }

    const handleCurrency = (setCheckCurrency, currency) => {
        setAllInput();
        setCheckCurrency(!currency);
    }

    const handleKeyPress = (e, handleFunction) => {
        if (e.code === 'Enter') {
            setAllInput();
            handleFunction();
            setCurrencyChoice(e.target.nextElementSibling.value);
        }
    }

    return (
        <form name="currencies" className="currencyForm">
            <fieldset>
                <legend>Choose your currency:</legend>
                <div className="formInput">

                    <label htmlFor="USD" className={checkUSD ? "activeChoice" : null} onClick={() => {handleCurrency(setCheckUSD, checkUSD)}} tabIndex="0" onKeyPress={(e) => {handleKeyPress(e, () => {handleCurrency(setCheckUSD, checkUSD)})}}>USD </label>
                    <input type="radio" id="USD" name="currency" value="USD" onChange={handleCurrencyClick} tabIndex="-1"/>

                    <label htmlFor="CAD" className={checkCAD ? "activeChoice" : null} onClick={() => {handleCurrency(setCheckCAD, checkCAD)}}  tabIndex="0" onKeyPress={(e) => {handleKeyPress(e, () => {handleCurrency(setCheckCAD, checkCAD)})}}>CAD</label>
                    <input type="radio" id="CAD" name="currency" value="CAD" onChange={handleCurrencyClick} tabIndex="-1"/>

                    <label htmlFor="EUR" className={checkEUR ? "activeChoice" : null} onClick={() => {handleCurrency(setCheckEUR, checkEUR)}}  tabIndex="0" onKeyPress={(e) => {handleKeyPress(e, () => {handleCurrency(setCheckEUR, checkEUR)})}}>EUR</label>
                    <input type="radio" id="EUR" name="currency" value="EUR" onChange={handleCurrencyClick} tabIndex="-1"/>

                    <label htmlFor="AUD" className={checkAUD ? "activeChoice" : null} onClick={() => {handleCurrency(setCheckAUD, checkAUD)}}  tabIndex="0" onKeyPress={(e) => {handleKeyPress(e, () => {handleCurrency(setCheckAUD, checkAUD)})}}>AUD</label>
                    <input type="radio" id="AUD" name="currency" value="AUD" onChange={handleCurrencyClick} tabIndex="-1"/>

                    <label htmlFor="GBP" className={checkGBP ? "activeChoice" : null} onClick={() => {handleCurrency(setCheckGBP, checkGBP)}}  tabIndex="0" onKeyPress={(e) => {handleKeyPress(e, () => {handleCurrency(setCheckGBP, checkGBP)})}}>GBP</label>
                    <input type="radio" id="GBP" name="currency" value="GBP" onChange={handleCurrencyClick} tabIndex="-1"/>

                    <label htmlFor="JPY" className={checkJPY ? "activeChoice" : null} onClick={() => {handleCurrency(setCheckJPY, checkJPY)}}  tabIndex="0" onKeyPress={(e) => {handleKeyPress(e, () => {handleCurrency(setCheckJPY, checkJPY)})}}>JPY</label>
                    <input type="radio" id="JPY" name="currency" value="JPY" onChange={handleCurrencyClick} tabIndex="-1"/>

                    <label htmlFor="HKD" className={checkHKD ? "activeChoice" : null} onClick={() => {handleCurrency(setCheckHKD, checkHKD)}}  tabIndex="0" onKeyPress={(e) => {handleKeyPress(e, () => {handleCurrency(setCheckHKD, checkHKD)})}}>HKD</label>
                    <input type="radio" id="HKD" name="currency" value="HKD" onChange={handleCurrencyClick} tabIndex="-1"/>

                    <label htmlFor="KRW" className={checkKRW ? "activeChoice" : null} onClick={() => {handleCurrency(setCheckKRW, checkKRW)}}  tabIndex="0" onKeyPress={(e) => {handleKeyPress(e, () => {handleCurrency(setCheckKRW, checkKRW)})}}>KRW</label>
                    <input type="radio" id="KRW" name="currency" value="KRW" onChange={handleCurrencyClick} tabIndex="-1"/>
                </div>
            </fieldset>
        </form>
    )
}

export default Currencies;