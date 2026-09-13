import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Blauens Prints Backend 2</h1>
      <p className="text-lg mb-8">This is it!</p>

      <Link
        to="/images/Create"
        className="text-xl border border-black bg-pink-100 px-8 py-4 rounded-xl"
      >
        Create
      </Link>
    </div>
  );
}
