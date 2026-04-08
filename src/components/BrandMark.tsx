import { Link } from "react-router-dom";

// Company logo and name - link to homepage
export default function BrandMark() {
  return (
    <Link to="/" className="decoration-4 underline-offset-4 hover:underline">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 hover:text-blue">
        ⛴️ ShipFast
      </h1>
    </Link>
  )
}