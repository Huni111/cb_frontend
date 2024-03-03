import React from 'react';

const Search= () => {
  return (
    <form className="search-form">
      <label htmlFor="category">Category:</label>
      <select id="category" name="category">
        <option value="starter">Select</option>
        <option value="starter">Starter</option>
        <option value="main">Main Course</option>
        <option value="dessert">Dessert</option>
        <option value="soup">Soup</option>
      </select>

      <label htmlFor="ingredient">Ingredient:</label>
      <input type="text" id="ingredient" name="ingredient" placeholder="Search by ingredient" />

      <input className="button" type="submit" value="Search" />
    </form>
  );
};

export default Search;
