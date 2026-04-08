import { List, Boxes, Truck } from "lucide-react";

// TODO: add real links, selected property for current route
export default function NavBar() {
  return (
    <nav className="flex items-center gap-3 flex-wrap mb-2">
      <div className="nav-link">
        <span className="hidden sm:inline">Orders</span>
        <List className="sm:hidden w-6 h-6" />
      </div>
      <div className="nav-link">
        <span className="hidden sm:inline">Stock</span>
        <Boxes className="sm:hidden w-6 h-6" />
      </div>
      <div className="nav-link">
        <span className="hidden sm:inline">Fleet</span>
        <Truck className="sm:hidden w-6 h-6" />
      </div>

      <button
        className="p-2 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors duration-150"
        title="Log out"
        aria-label="Log out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="currentColor"
        >
          {/* Door */}
          <path d="M3 3h9v18H3V3z" />
          {/* Arrow */}
          <path d="M16 7l5 5-5 5M11 12h10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </nav>
  )
}