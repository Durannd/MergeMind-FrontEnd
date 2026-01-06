import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: IndexRoute,
});

function IndexRoute() {
    return (
        <>
            <h1 className="text-2xl mb-4">TESTE DA ROTA</h1>
            <Link
                to="/app"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            >
                Go to App
            </Link>
        </>
    );
}
