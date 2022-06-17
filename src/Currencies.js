const Currencies = (props) => {
    const {setCurrencyChoice} = props;

    const handleCurrencyClick = (e) => {
        setCurrencyChoice(e.target.value);
    }

    return (
        <form name="currencies">
            <fieldset>Choose your currency:</fieldset>
            <label htmlFor="USD">USD </label>
            <input type="radio" name="currency" value="USD" onChange={handleCurrencyClick}/>

            <label htmlFor="USD">CAD</label>
            <input type="radio" name="currency" value="CAD" onChange={handleCurrencyClick}/>

            <label htmlFor="USD">EUR</label>
            <input type="radio" name="currency" value="EUR" onChange={handleCurrencyClick}/>

            <label htmlFor="USD">AUD</label>
            <input type="radio" name="currency" value="AUD" onChange={handleCurrencyClick}/>

            <label htmlFor="USD">GBP</label>
            <input type="radio" name="currency" value="GBP" onChange={handleCurrencyClick}/>

            <label htmlFor="USD">JPY</label>
            <input type="radio" name="currency" value="JPY" onChange={handleCurrencyClick}/>

            <label htmlFor="USD">HKD</label>
            <input type="radio" name="currency" value="HKD" onChange={handleCurrencyClick}/>

            <label htmlFor="USD">KRW</label>
            <input type="radio" name="currency" value="KRW" onChange={handleCurrencyClick}/>
        </form>
    )
}

export default Currencies;