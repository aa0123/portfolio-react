import React from 'react';

const SearchButton = (props) => {
    return (
        <button className='button' onClick={()=>{props.handleClick()}}>Search User</button>
    )
  };
export default SearchButton;