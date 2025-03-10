
import React from "react"
import VegetableCard from "@/components/VegetableCard"

const VegetableList = ({ vegetables }) => {
  if (!vegetables || vegetables.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-muted-foreground">No vegetables found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {vegetables.map((vegetable) => (
        <VegetableCard key={vegetable.id} vegetable={vegetable} />
      ))}
    </div>
  )
}

export default VegetableList
