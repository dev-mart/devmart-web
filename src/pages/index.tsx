import {LandingPage} from "@/components/landing-page/landing-page";
import {SeoMeta} from "@/components/common/seo-meta/SeoMeta";
import {SeoDescription, SeoTitle} from "@/constants/seo.constants";

export default function IndexPage() {
    return (
        <div className="font-poppins h-full w-full">
            <SeoMeta
                title={SeoTitle.Home}
                description={SeoDescription.Home}
            />
            <LandingPage/>
        </div>
    );
}