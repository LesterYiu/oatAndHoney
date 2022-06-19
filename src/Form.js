import {useState} from 'react';

const Form = (props) => {

    const {setUserInput} = props;
    const [checkAllProducts, setCheckAllProducts] = useState(false);
    const [checkPersonal, setCheckPersonal] = useState(false);
    const [checkShaving, setCheckShaving] = useState(false);
    const [checkSkinCare, setCheckSkinCare] = useState(false);
    const [checkOral, setCheckOral] = useState(false);
    const [checkHairCare, setCheckHairCare] = useState(false);
    const [checkDeodorant, setCheckDeodorant] = useState(false);

    const setAllInput = () => {
        setCheckAllProducts(false);
        setCheckPersonal(false);
        setCheckShaving(false);
        setCheckSkinCare(false);
        setCheckOral(false);
        setCheckHairCare(false)
        setCheckDeodorant(false);
    }

    const handleUserChoice = (e) => {
        setUserInput(e.target.value);
    }
    const handleProductClick = () => {
        setAllInput();
        setCheckAllProducts(!checkAllProducts);
    }
    const handlePersonalClick = () => {
        setAllInput();
        setCheckPersonal(!checkPersonal);
    }
    const handleShavingClick = () => {
        setAllInput();
        setCheckShaving(!checkShaving);
    }
    const handleSkinCareClick = () => {
        setAllInput();
        setCheckSkinCare(!checkSkinCare);
    }
    const handleOralClick = () => {
        setAllInput();
        setCheckOral(!checkOral);
    }
    const handleHairCareClick = () => {
        setAllInput();
        setCheckHairCare(!checkHairCare);
    }
    const handleDeodorantClick = () => {
        setAllInput();
        setCheckDeodorant(!checkDeodorant);
    }

    return(
        <form aria-label="form" name="productType" className="productForm">
            <fieldset>
                <legend>Choose a type of product: </legend>

                <div className="formInput">

                    <label htmlFor="bathAndBeauty" className={checkAllProducts ? "activeChoice" : null} onClick={handleProductClick} tabIndex="0">All Products</label>
                    <input type="radio" name="type" id="bathAndBeauty" value="Bath & Beauty" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="personalCare" className={checkPersonal ? "activeChoice" : null} onClick={handlePersonalClick} tabIndex="0">Personal Care</label>
                    <input type="radio" name="type" id="personalCare" value="Personal Care" onChange={handleUserChoice} tabIndex="-1"/>
                    
                    <label htmlFor="shavingAndGrooming" className={checkShaving ? "activeChoice" : null} onClick={handleShavingClick} tabIndex="0">Shaving & Grooming</label>
                    <input type="radio" name="type" id="shavingAndGrooming" value="Shaving & Grooming" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="skinCare" className={checkSkinCare ? "activeChoice" : null} onClick={handleSkinCareClick} tabIndex="0">Skin care</label>
                    <input type="radio" name="type" id="skinCare" value="Skin Care" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="oralCare" className={checkOral ? "activeChoice" : null} onClick={handleOralClick} tabIndex="0">Oral Care</label>
                    <input type="radio" name="type" id="oralCare" value="Oral Care" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="hairCare" className={checkHairCare ? "activeChoice" : null} onClick={handleHairCareClick} tabIndex="0">Hair Care</label>
                    <input type="radio" name="type" id="hairCare" value="Hair Care" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="deodorant" className={checkDeodorant ? "activeChoice" : null} onClick={handleDeodorantClick} tabIndex="0">Deodorant</label>
                    <input type="radio" name="type" id="deodorant" value="Deodorant" onChange={handleUserChoice} tabIndex="-1"/>
                </div>
            </fieldset>
        </form>
    )
}

export default Form;