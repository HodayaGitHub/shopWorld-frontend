import React from 'react'

export function ToySort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleToggleDirection() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        log()
        onSetSort(updatedSort)
    }

    return <section className="toy-sort">
        <h3>Sort By:</h3>
        <button onClick={() => handleSortChange('name')}>By name</button>
        <button onClick={() => handleSortChange('price ')}>By price</button>
        <button onClick={handleToggleDirection}>
            {sortBy.asc ? 'low to high ⬆' : 'heigh to low ⬇'}
        </button>
    </section>
}






// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { Select as BaseSelect, selectClasses } from '@mui/base/Select';
// import { Option as BaseOption, optionClasses } from '@mui/base/Option';
// import { Popper as BasePopper } from '@mui/base/Popper';
// import { styled } from '@mui/system';
// import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';


// export function SortByForm() {
//     function handleSortChange(by) {
//         const updatedSort = { ...sort, by }
//         onSetSort(updatedSort)
//     }

//     function handleToggleDirection() {
//         const updatedSort = { ...sort, asc: !sort.asc }
//         onSetSort(updatedSort)
//     }

//     return (
//         <div></div>
//         // <form >
//             {/* <Label htmlFor="named-select">
//                 With the <code>name</code> prop set to <code>&quot;demo-select&quot;</code>
//             </Label> */}
//             {/* <Select defaultValue={10} id="named-select" name="demo-select">
//                 <Option value={10}>Ten</Option>
//                 <Option value={20}>Twenty</Option>
//                 <Option value={30}>Thirty</Option>
//             </Select>
//             <SubmitButton sx={{ ml: 1 }} type="submit">
//                 Submit
//             </SubmitButton> */}
//         {/* </form> */}
//     );
// }
