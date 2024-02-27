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
        <button onClick={() => handleSortChange('name')}>Name</button>
        <button onClick={() => handleSortChange('price ')}>Price</button>
        <button onClick={handleToggleDirection}>
        {sortBy.asc ? 'Ascending ⬆' : 'Descending ⬇'}
        </button>
    </section>
}
