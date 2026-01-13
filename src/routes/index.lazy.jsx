import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Card } from "flowbite-react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import photo1 from '../assets/photo1.png'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'

export const Route = createLazyFileRoute("/")({
    component: IndexRoute,
});


function IndexRoute() {
    const { user } = useContext(AuthContext);
    return (
        <>
            <div className="h-full w-full flex flex-col">
                <div className="pt-12 pb-8 text-center">
                    <h1 className="text-4xl font-bold text-shadow-xs">Welcome to MergeMind!</h1>
                </div>
                <div className="flex-1 px-4 grid grid-cols-1 
                sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 
                gap-8 justify-items-center mt-4 mb-8">

                    <Card className="max-w-sm hover:scale-105 transition-transform" imgSrc={photo1} >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Collaborate in Real-Time
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Unite minds and ideas in a seamless collaborative environment. Work together with your team to merge thoughts into innovative solutions.
                        </p>
                    </Card>

                    <Card className="max-w-sm hover:scale-105 transition-transform" imgSrc={photo2} >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Smart Integration
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Integrate your projects and workflows intelligently. MergeMind brings all your tools together in one powerful platform.
                        </p>
                    </Card>

                    <Card className="max-w-sm hover:scale-105 transition-transform" imgSrc={photo3} >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Amplify Your Productivity
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Transform the way you work with intelligent automation and streamlined processes. Achieve more with less effort.
                        </p>
                    </Card>
                </div>
                <br />
                <br />
                <br />
                <div className="pb-12 text-center">
                    {!user && (
                        <Link
                            to="/signup"
                            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                        >
                            Get Started with MergeMind!
                        </Link>
                    )}
                    {user && (
                        <>
                            <span className="text-white text-lg">Welcome back, {user.name}!</span>
                            <div>
                                <Link to='/explore' className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors" >Explore</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
