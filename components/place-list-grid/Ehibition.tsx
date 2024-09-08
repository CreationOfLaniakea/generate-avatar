"use client";

import React, {useEffect} from "react";

import {cn} from "./cn";
import PlaceListItem from "./place-list-item";
import {useCommonContext} from "@/context/common-context";

export default function Exhibition({className}: {className?: string}) {

    const places: string[] = [
        "https://replicate.delivery/pbxt/YIXRRjdootJ9Fhss7awrbjLDGW9JJR1dIh0P3559nC0Y3q2E/out-0.png",
        "https://replicate.delivery/pbxt/0IiuzyfCKgW1BSZZAjpiSYBcQsDBxbIu47vuqlG57kFxvVtJA/out-0.png",
        "https://replicate.delivery/pbxt/0IiuzyfCKgW1BSZZAjpiSYBcQsDBxbIu47vuqlG57kFxvVtJA/out-0.png",
    ];

    const {
        user,
    } = useCommonContext()

    // useEffect(() => {
    //     const fetchData = async () => {
    //
    //
    //         const response = await fetch("/api/getUserExhibition", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 email: user.email,
    //             }),
    //         });
    //
    //         let prediction = await response.json();
    //         if (response.status == 200) {
    //             return;
    //         }
    //
    //         console.log("kenan", user.email, "-", prediction);
    //     };
    //
    //     fetchData();
    // }, []); // 仅在组件挂载时执行一次

  return (
      <div className="flex flex-col justify-center items-center">
        <div
            className={cn(
                "my-auto grid max-w-7xl grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center",
                className,
            )}
        >
          {
            places.map((item, index) => (
                <PlaceListItem key={index} imageSrc={item} />
            ))
          }

        </div>
      </div>
  );
}
