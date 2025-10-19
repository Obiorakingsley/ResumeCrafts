import React from "react";
import Loading from "@/component/load";
const loading = () => {
  return (
    <div className="h-[80vh] flex flex-col justify-center">
      <Loading width={10} height={10} />
    </div>
  );
};

export default loading;
