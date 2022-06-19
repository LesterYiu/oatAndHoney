const Item = (props) => {
    const {image, title, price, exchangeRate, currencyChoice, currencySymbol, setCustomerCart, itemId} = props;

    const storeUserSelection = () => {

        const userSelection = [];

        userSelection.push({
            image: image,
            title: title,
            price: price,
            exchangeRate: exchangeRate,
            currencyChoice: currencyChoice,
            itemId: itemId,
            currencySymbol: currencySymbol
        })
        setCustomerCart(userSelection);
    }

    return (
        <div className="itemContainer">
            <div className="productInfoCOntainer">
                <div className="imageContainer">
                    <img src={image} alt={title} />
                </div>
                <p>{title}</p>
            </div>
            <div>
                <p className="currencyText">{currencySymbol} { currencyChoice === 'JPY' || currencyChoice === 'KRW' ? Math.round(price * exchangeRate) : (price * exchangeRate).toFixed(2)} {currencyChoice}</p>
                <button className="addToBagButton" onClick={storeUserSelection}>add to bag</button>
            </div>
        </div>
    )
}

export default Item;