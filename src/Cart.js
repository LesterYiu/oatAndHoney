const Cart = (props) => {

    const {itemList} = props;
    return(
        <>  
            <h2>Cart</h2>
            {
                itemList.map( (item) => {
                    return (
                        <div className="item-container">
                            <p>test</p>
                            <div className="image-container">
                                <img src={item[0].image} alt={item[0].title} />
                            </div>
                            <p>{item[0].title}</p>
                            <p>{item[0].currencySymbol} { item[0].currencyChoice === 'JPY' || item[0].currencyChoice === 'KRW' ? Math.round(item[0].price * item[0].exchangeRate) : (item[0].price * item[0].exchangeRate).toFixed(2)} {item[0].currencyChoice}</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Cart;