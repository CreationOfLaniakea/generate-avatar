"use client";

import React from "react";

import {cn} from "./cn";

// export type PlaceItem = {
//   imageSrc: string;
// };

// export type PlaceItem = [];

// export type PlaceListItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & {
// } & PlaceItem;

type PlaceListItemProps = {
  imageSrc: string;  // 单个图像的 URL，不是数组
};

const PlaceListItem = React.forwardRef<HTMLDivElement, PlaceListItemProps>(
  (
    {imageSrc, ...props},
    ref,
  ) => {

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full flex-none flex-col gap-3",
          {
          }
        )}
        {...props}
      >
        <img
          className="aspect-square w-full hover:scale-110 rounded-full object-cover"
          src={imageSrc}
        />
      </div>
    );
  },
);

PlaceListItem.displayName = "PlaceListItem";

export default PlaceListItem;
