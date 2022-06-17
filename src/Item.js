const Item = (props) => {
    const {image, title, price, currency} = props;
    return (
        <div className="item-container">
            <div className="image-container">
                <img src={image} alt={title} />
            </div>
            <p>{title}</p>
            <p>{price} {currency}</p>
            <button>add to bag</button>
        </div>
    )
}

export default Item;