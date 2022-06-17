const Item = (props) => {
    const {image, title, price, exchangeRate, currencyChoice, currencySymbol} = props;
    return (
        <div className="item-container">
            <div className="image-container">
                <img src={image} alt={title} />
            </div>
            <p>{title}</p>
            <p>{currencySymbol} { currencyChoice === 'JPY' || currencyChoice === 'KRW' ? Math.round(price * exchangeRate) : (price * exchangeRate).toFixed(2)} {currencyChoice}</p>
            <button>add to bag</button>
        </div>
    )
}

export default Item;