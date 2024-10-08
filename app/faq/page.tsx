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
import {getSEOTags} from "@/libs/seo";

export default function Home() {
    return (
        <>
            <Suspense>
                <Header />
            </Suspense>
            <main>
                <FAQ />
            </main>
            <Footer />
        </>
    );
}