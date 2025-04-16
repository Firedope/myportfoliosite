import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  className,
}: StarRatingProps) {
  // Define star sizes based on the size prop
  const starSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const starSize = starSizes[size];
  
  return (
    <div className={cn("flex", className)}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            starSize,
            "fill-current",
            i < rating
              ? "text-primary-500" // filled star
              : "text-gray-300" // empty star
          )}
        />
      ))}
    </div>
  );
}
