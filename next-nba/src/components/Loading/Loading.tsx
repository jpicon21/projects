import { useEffect, useState } from "react";

export default function Loading() {

  return(
    <div className="relative flex flex-col content-center justify-center top-20 mx-auto w-fit">
      <div className="uppercase font-bold-900 text-4xl">NBA Cards are Loading</div>
      <div className="loader mx-auto mt-4"></div>
    </div>
  )

}

