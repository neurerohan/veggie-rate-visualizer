
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const VegetableCard = ({ vegetable }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={vegetable.image || "/placeholder.svg"}
          alt={vegetable.name}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{vegetable.name}</CardTitle>
        <CardDescription>{vegetable.category}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">
          {vegetable.description || "No description available"}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium">${vegetable.price.toFixed(2)}</span>
          <button className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            Add to Cart
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default VegetableCard
