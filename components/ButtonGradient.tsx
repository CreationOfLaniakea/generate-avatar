"use client";

import React from "react";

const ButtonGradient = ({
                          submit,
                          title,
                          onClick = () => {},
                        }: {
  submit?:boolean;
  title?: string;
  onClick?: () => void;
}) => {
  return (
      <button
          className="btn btn-gradient animate-shimmer"
          onClick={onClick}
          disabled={!submit}
      >
        {title}
      </button>
  );
};

export default ButtonGradient;
