
import React from "react"

const SortSelector = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Sort by:</span>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="category">Category</option>
      </select>
    </div>
  )
}

export default SortSelector
