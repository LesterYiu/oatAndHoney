const Form = (props) => {

    const {setUserInput} = props;

    const handleUserChoice = (e) => {
        setUserInput(e.target.value);
    }

    return(
        <form aria-label="form" name="productType">
            <fieldset>
                <legend>Filter your choices</legend>

                <label htmlFor="bathAndBeauty">All Products</label>
                <input type="radio" name="type" id="bathAndBeauty" value="Bath & Beauty" onChange={handleUserChoice}/>

                <label htmlFor="personalCare">Personal Care</label>
                <input type="radio" name="type" id="personalCare" value="Personal Care" onChange={handleUserChoice}/>
                
                <label htmlFor="shavingAndGrooming">Shaving & Grooming</label>
                <input type="radio" name="type" id="shavingAndGrooming" value="Shaving & Grooming" onChange={handleUserChoice}/>

                <label htmlFor="skinCare">Skin care</label>
                <input type="radio" name="type" id="skinCare" value="Skin Care" onChange={handleUserChoice}/>

                <label htmlFor="oralCare">Oral Care</label>
                <input type="radio" name="type" id="oralCare" value="Oral Care" onChange={handleUserChoice}/>

                <label htmlFor="deodorant">Deodorant</label>
                <input type="radio" name="type" id="deodorant" value="Deodorant" onChange={handleUserChoice}/>
            </fieldset>
        </form>
    )
}

export default Form;