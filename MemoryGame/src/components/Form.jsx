import RegularButton from "./RegularButton";

export default function Form({ handleSubmit, handleChange }) {
  return (
    <div className="form-container">
      <form className="wrapper">
        <div className="form__inner-wrapper">
          <label htmlFor="category">Select an Emoji Category:</label>
          <select id="category" name="category" onChange={handleChange}>
            <option value="">All</option>
            <option value="category/animals-and-nature">
              Animals & Nature
            </option>
            <option value="category/food-and-drink">Food & Drink</option>
            <option value="category/travel-and-places">Travel & Places</option>
            <option value="category/objects">Objects</option>
            <option value="category/symbols">Symbols</option>
          </select>
        </div>
        <div className="form__inner-wrapper">
          <label htmlFor="number">Number of Cards:</label>
          <select id="number" name="number" onChange={handleChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
      </form>
    </div>
  );
}
