import React from 'react'
import FilterContainer from '../containers/FilterContainer'
import { VisibilityFilters } from '../actions'

const Filters = () => (
    <div>
        <span>Show: </span>
        <FilterContainer filter={VisibilityFilters.SHOW_ALL}>All</FilterContainer>
        <FilterContainer filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterContainer>
        <FilterContainer filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterContainer>
    </div>
)

export default Filters
