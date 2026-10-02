import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Blauens Prints Backend 2</h1>
      <p className="text-lg mb-8">This is it!</p>

      <div className="">
        <h1 className="text-2xl font bold mb-4">Images</h1>
        <div className="flex flex-row gap-4">
          <Link
            to="/images/create"
            className="button text-xl py-4 px-8 bg-green-200 hover:bg-green-300"
          >
            Create
          </Link>

          <Link
            to="/images/update"
            className="button text-xl py-4 px-8 bg-blue-200 hover:bg-blue-300"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
}
