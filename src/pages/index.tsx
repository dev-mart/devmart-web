import {LandingPage} from "@/components/landing-page/landing-page";
import {SeoMeta} from "@/components/common/seo-meta/SeoMeta";
import {SeoDescription, SeoTitle} from "@/constants/seo.constants";

export default function IndexPage() {
    return (
        <>
            <SeoMeta
                title={SeoTitle.Home}
                description={SeoDescription.Home}
            />
            <LandingPage/>
        </>
    );
}