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
        <div className="item-container">
            <div className="image-container">
                <img src={image} alt={title} />
            </div>
            <p>{title}</p>
            <p>{currencySymbol} { currencyChoice === 'JPY' || currencyChoice === 'KRW' ? Math.round(price * exchangeRate) : (price * exchangeRate).toFixed(2)} {currencyChoice}</p>
            <button onClick={storeUserSelection}>add to bag</button>
        </div>
    )
}

export default Item;