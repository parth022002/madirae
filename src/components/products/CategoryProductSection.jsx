"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import Button from "@/components/ui/Button";

export default function CategoryProductSection({ products }) {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? products : products.slice(0, 4);
  const hasMore = products.length > 4;

  return (
    <div className="space-y-10 flex flex-col items-center w-full">
      <div className="w-full">
        <ProductGrid products={visibleProducts} />
      </div>
      
      {hasMore && (
        <div className="pt-4 flex justify-center">
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            variant="secondary"
            icon={false}
            className="flex items-center gap-2 border-gold/40 hover:border-gold hover:bg-gold/15"
          >
            <span>{showAll ? "See Less" : `See More (+${products.length - 4})`}</span>
            {showAll ? (
              <ChevronUp className="h-4 w-4 text-gold transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gold transition-transform duration-300" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
