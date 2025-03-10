
import React from "react"
import { Input } from "@/components/ui/input"

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="w-full max-w-lg">
      <Input
        type="text"
        placeholder="Search vegetables..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />
    </div>
  )
}

export default SearchBar
