import type {NextPage} from "next";
import {LandingPage} from "@/components/landing-page/landing-page";

const Home: NextPage = () => {
    return (
        <div className="font-poppins h-full w-full">
            <LandingPage/>
        </div>
    );
}

export default Home;