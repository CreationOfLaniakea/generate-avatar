import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageComponent from "@/app/PageComponent";
import Scrolling from "@/components/brands-scrolling-banner-with-two-rows/Scrolling";
import {SessionProvider} from "next-auth/react";
import Exhibition from "@/components/place-list-grid/Ehibition";
import {getSEOTags} from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
    title: `${config.titleName}`,
    description: `${config.appDescription}`,
    canonicalUrlRelative: "https://generate-avatar.com/",
});

export default function Home() {
    return (
        <>
            <Suspense>
                <Header />
            </Suspense>
            <main>
                <PageComponent />
                <Scrolling></Scrolling>
                {/*<Exhibition ></Exhibition>*/}
                <Hero />
                {/*<Problem />*/}
                {/*<FeaturesAccordion />*/}
                {/*<Pricing />*/}
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </>
    );
}