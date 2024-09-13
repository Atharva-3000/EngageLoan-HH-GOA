import React from 'react';
import second from '../../../public/assets/NotFound.png'
import Image from 'next/image';

const NoData = () => {
  return (
    <div className="flex items-center justify-center h-1/4 mt-20 flex-col gap-4">
      <Image
        src={second}
        alt="No Data"
        className="h-[200px] w-[200px] rounded-lg"
      />
      <p>Sorry, But the page is not Found !!</p>
    </div>
  );
}

export default NoData;
