import { IoStar, IoStarHalf } from "react-icons/io5";

export default function Rating({ rating }: { rating: number }) {
  const fScore = rating > 5 ? 5 : Math.floor(rating);
  const rest = fScore >= 5 ? 0 : rating - fScore;
  return (
    <div className="flex items-center gap-2">
      {Array(fScore)
        .fill(0)
        .map((_val, idx) => {
          return <IoStar key={idx} className="text-yellow-500" />;
        })}
      {rest >= 0.5
        ? Array(Math.round(rest))
            .fill(0)
            .map((_val, idx) => (
              <IoStarHalf key={idx} className="text-yellow-500" />
            ))
        : null}
      ({rating})
    </div>
  );
}
