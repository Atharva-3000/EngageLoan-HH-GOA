  // components/CardImages.js
  import React from 'react';
  import Image from 'next/image';
  import second from '../../../public/assets/NFT1.jpeg'

  // Define an array of image paths relative to the public directory
  const images = [
    '/assets/NFT1.jpeg',
    '/assets/NFT2.jpeg',
    '/assets/NFT4.jpeg',
    '/assets/NFT5.jpeg',
    // Add more image paths as needed
  ];

  const CardImages = () => {
    // Function to get a random image from the array
    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    };

    return (
      <div>
        <Image
          src={getRandomImage()}
          alt="Random Image"
          height={200}
          width={200}
          className='w-full'
        />
      </div>
    );
  };

  export default CardImages;
