import { Outlet, useMatches } from "react-router-dom";
import Header from "../components/Header";

export default function DashboardLayout() {
  const matches = useMatches();

  // Find last route match that has a "title" property in its handle
  const currentMatch = matches[matches.length - 1];

  const title = currentMatch.handle?.title ?? "Dashboard";

  return (
    // Container
    <div className="min-h-screen flex flex-col items-center p-6">
      <Header title={title}></Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}