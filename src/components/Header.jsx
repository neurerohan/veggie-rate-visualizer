
import React from "react"
import { Link } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

const Header = () => {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">VeggieMarket</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {!isMobile && (
          <nav className="hidden md:flex md:gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
