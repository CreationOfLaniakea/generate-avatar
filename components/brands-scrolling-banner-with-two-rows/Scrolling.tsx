import React from "react";
import {Spacer} from "@nextui-org/react";
import Image from "next/image";

import {Logo1, Logo10, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8, Logo9} from "./logos";

import ScrollingBanner from "./scrolling-banner";

const logos1 = [
  {
    key: "logo-1",
    logo: "/avatar_display/1.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/2.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/3.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/4.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/5.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/6.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/7.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/8.webp",
  },
];

const logos2 = [
  {
    key: "logo-1",
    logo: "/avatar_display/9.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/10.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/11.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/12.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/13.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/14.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/15.webp",
  },
  {
    key: "logo-1",
    logo: "/avatar_display/16.webp",
  },
];

export default function Scrolling() {
  return (
    <section className="flex flex-col justify-center mx-auto w-full max-w-6xl px-6 py-5 sm:py-8 lg:px-0 lg:py-10">
      <ScrollingBanner shouldPauseOnHover duration={50} gap="10px">
        {logos1.map(({key, logo}) => (
          <div key={key} className="flex items-center justify-center text-foreground">
            <Image
                className="rounded-full object-cover"
                src={logo}
                alt="logo"
                width={1024}
                height={1024} />
            {/*{logo}*/}
          </div>
        ))}
      </ScrollingBanner>
      <Spacer y={12} />
      <ScrollingBanner isReverse shouldPauseOnHover duration={50} gap="10px">
        {logos2.map(({key, logo}) => (
          <div key={key} className="flex items-center justify-center text-foreground">
            {/*{logo}*/}
            <Image
                className="rounded-full object-cover"
                src={logo}
                alt="logo"
                width={256}
                height={256} />
          </div>
        ))}
      </ScrollingBanner>
    </section>
  );
}
