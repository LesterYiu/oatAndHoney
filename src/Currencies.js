const Currencies = (props) => {
    const {setCurrencyChoice} = props;

    const handleCurrencyClick = (e) => {
        setCurrencyChoice(e.target.value);
    }

    return (
        <form name="currencies" className="currencyForm">
            <fieldset>
                <legend>Choose your currency:</legend>
                <div className="formInput">
                    
                    <label htmlFor="USD">USD </label>
                    <input type="radio" id="USD" name="currency" value="USD" onChange={handleCurrencyClick}/>

                    <label htmlFor="CAD">CAD</label>
                    <input type="radio" id="CAD" name="currency" value="CAD" onChange={handleCurrencyClick}/>

                    <label htmlFor="EUR">EUR</label>
                    <input type="radio" id="EUR" name="currency" value="EUR" onChange={handleCurrencyClick}/>

                    <label htmlFor="AUD">AUD</label>
                    <input type="radio" id="AUD" name="currency" value="AUD" onChange={handleCurrencyClick}/>

                    <label htmlFor="GBP">GBP</label>
                    <input type="radio" id="GBP" name="currency" value="GBP" onChange={handleCurrencyClick}/>

                    <label htmlFor="JPY">JPY</label>
                    <input type="radio" id="JPY" name="currency" value="JPY" onChange={handleCurrencyClick}/>

                    <label htmlFor="HKD">HKD</label>
                    <input type="radio" id="HKD" name="currency" value="HKD" onChange={handleCurrencyClick}/>

                    <label htmlFor="KRW">KRW</label>
                    <input type="radio" id="KRW" name="currency" value="KRW" onChange={handleCurrencyClick}/>
                </div>
            </fieldset>
        </form>
    )
}

export default Currencies;