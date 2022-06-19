import headerImage from './headerStockImage.png';

const Header = () => {
    return(
        <header>
            <div className="flexContainer">
                <div className="headerIconContainer">
                    <div className="headerProducts">
                        <img src={headerImage} alt="" />
                    </div>
                </div>
                <div className="headerInformation">
                    <div className="wrapper">
                        <div className="flexContainer">
                            <h1>your ultimate zero waste personal care destination</h1>
                            <p>At Oat & Honey, we’re rethinking our everyday essentials. We believe that the products we use shouldn’t cause any harm to you, the earth, or every other living being that calls it home. With our high-quality, low-impact goods, we want to empower and inspire you to make conscious, positive choices. Always ethically produced and sustainably sourced, our natural products make it easy for you to be a responsible, healthy human. </p>
                            <button className="shopButton">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;