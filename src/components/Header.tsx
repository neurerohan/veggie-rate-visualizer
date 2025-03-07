
import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 animate-fade-in">
      <div className="flex items-center space-x-3 mb-2">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
          <Leaf className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-3xl font-display font-bold tracking-tight">
          Veggie Rate Visualizer
        </h1>
      </div>
      <p className="text-muted-foreground">
        Track the latest vegetable prices from markets across Nepal.
      </p>
    </header>
  );
};

export default Header;
