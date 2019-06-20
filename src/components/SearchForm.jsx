import React from 'react';

const SearchForm = (props) => {
  return (
    <form onSubmit={(event) => props.handleUserFormSubmit(event)}>
      <label>
        <p>Search for user :):</p>
        <input name="username"
        type="text"
        placeholder="GitHub username"
        required
        value={props.formData.username}
        onChange={props.handleFormChange}
      />
      </label>
      <div>
        <input
            type="submit"
            value="Submit"
        />
        </div>
    </form>
)};

export default SearchForm;