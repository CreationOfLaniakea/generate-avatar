import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import Markdown from "react-markdown";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>


        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`
Last Updated: September 07, 2024

Welcome to Generate Avatar! Our website, located at https://toolchain.com (“Website”), is dedicated to providing you with a collection of tools and resources for blockchain, AI, SEO, and other related functionalities. By accessing or using our Website, you agree to be bound by these Terms of Service (“Terms”). If you do not agree with any part of the terms, then you are prohibited from using the Website.

1.Use License

You are granted a limited, non-exclusive, non-transferable license to use the Website and its services for personal, non-commercial purposes. This license does not include any rights to copy, modify, or distribute the Website’s content or use it for commercial purposes without our prior written consent.

2.Ownership

The ownership of any tools, resources, or content generated from or within the Website belongs to the person who created or provided the content. Generate Avatar claims no ownership over content created by users.

3.User Data Collection

We collect personal data (name, email, and payment information) and non-personal data (web cookies) to improve our services. The use of this data is governed by our Privacy Policy, which can be found at https://tool-chains.com/en/privacy-policy.

4.Governing Law

These Terms shall be governed and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions.

5.Changes to Terms

Generate Avatar reserves the right, at our sole discretion, to modify or replace these Terms at any time. We will notify users of any changes by email. Your continued use of the Website after any change in these Terms will constitute your acceptance of such changes.

6.Contact Information

If you have any questions about these Terms, please contact us at xiangkenan@gmail.com.

By using Generate Avatar, you signify your acceptance of these Terms of Service.

`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
