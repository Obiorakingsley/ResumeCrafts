import React from "react";
import Loading from "@/component/load";
const loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center">
      <Loading width={12} height={12} />
    </div>
  );
};

export default loading;
