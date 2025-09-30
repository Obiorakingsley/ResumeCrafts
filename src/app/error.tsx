"use client";
import React from "react";

const error = ({ error }: { error: Error }) => {
  return (
    <div className="grid justify-center">
      There was an error: {error.message}
    </div>
  );
};

export default error;
