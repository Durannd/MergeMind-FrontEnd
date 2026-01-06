import { createLazyFileRoute } from "@tanstack/react-router";


export const Route = createLazyFileRoute("/app")({
    component: Testzera,
});

function Testzera(){
    return <div>Test App Page</div>
}