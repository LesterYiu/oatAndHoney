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

    const handleProductChoice = (setCheckProduct, checkProduct) => {
        setAllInput();
        setCheckProduct(!checkProduct);
    }
    const handleKeyPress = (e, handleFunction) => {
        if (e.code === 'Enter') {
            setAllInput();
            handleFunction();
            setUserInput(e.target.nextElementSibling.value);
        }
    }

    return(
        <form aria-label="form" name="productType" className="productForm">
            <fieldset>
                <legend>Choose a type of product: </legend>

                <div className="formInput">

                    <label htmlFor="bathAndBeauty" className={checkAllProducts ? "activeChoice" : null} onClick={() => {handleProductChoice(setCheckAllProducts, checkAllProducts)}} tabIndex="0" onKeyPress={((e) => {handleKeyPress(e, () => {handleProductChoice(setCheckAllProducts, checkAllProducts)})})}>All Products</label>
                    <input type="radio" name="type" id="bathAndBeauty" value="Bath & Beauty" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="personalCare" className={checkPersonal ? "activeChoice" : null} onClick={() => {handleProductChoice(setCheckPersonal, checkPersonal)}} tabIndex="0" onKeyPress={((e) => {handleKeyPress(e, () => {handleProductChoice(setCheckPersonal, checkPersonal)})})}>Personal Care</label>
                    <input type="radio" name="type" id="personalCare" value="Personal Care" onChange={handleUserChoice} tabIndex="-1"/>
                    
                    <label htmlFor="shavingAndGrooming" className={checkShaving ? "activeChoice" : null} onClick={() => {handleProductChoice(setCheckShaving, checkShaving)}} tabIndex="0" onKeyPress={((e) => {handleKeyPress(e, () => {handleProductChoice(setCheckShaving, checkShaving)})})}>Shaving & Grooming</label>
                    <input type="radio" name="type" id="shavingAndGrooming" value="Shaving & Grooming" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="skinCare" className={checkSkinCare ? "activeChoice" : null} onClick={() => {handleProductChoice(setCheckSkinCare, checkSkinCare)}} tabIndex="0" onKeyPress={((e) => {handleKeyPress(e, () => {handleProductChoice(setCheckSkinCare, checkSkinCare)})})}>Skin care</label>
                    <input type="radio" name="type" id="skinCare" value="Skin Care" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="oralCare" className={checkOral ? "activeChoice" : null} onClick={() => {handleProductChoice(setCheckOral, checkOral)}} tabIndex="0" onKeyPress={((e) => {handleKeyPress(e, () => {handleProductChoice(setCheckOral, checkOral)})})}>Oral Care</label>
                    <input type="radio" name="type" id="oralCare" value="Oral Care" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="hairCare" className={checkHairCare ? "activeChoice" : null} onClick={() => {handleProductChoice(setCheckHairCare, checkHairCare)}} tabIndex="0" onKeyPress={((e) => {handleKeyPress(e, () => {handleProductChoice(setCheckHairCare, checkHairCare)})})}>Hair Care</label>
                    <input type="radio" name="type" id="hairCare" value="Hair Care" onChange={handleUserChoice} tabIndex="-1"/>

                    <label htmlFor="deodorant" className={checkDeodorant ? "activeChoice" : null} onClick={() => {handleProductChoice(setCheckDeodorant, checkDeodorant)}} tabIndex="0" onKeyPress={((e) => {handleKeyPress(e, () => {handleProductChoice(setCheckDeodorant, checkDeodorant)})})}>Deodorant</label>
                    <input type="radio" name="type" id="deodorant" value="Deodorant" onChange={handleUserChoice} tabIndex="-1"/>
                </div>
            </fieldset>
        </form>
    )
}

export default Form;