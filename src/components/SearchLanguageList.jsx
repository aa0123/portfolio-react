import React from 'react';

const SearchLanguageList = (props) => {
    if (props.langslist) {
        return (
            <ul>
            {Object.entries(props.langslist).map(([key,value]) =>
                <li key={key}>
                {key} - {value}
                </li>
            )}
            </ul>
        )
    } 
    else { 
        return null;
    }
};

export default SearchLanguageList;