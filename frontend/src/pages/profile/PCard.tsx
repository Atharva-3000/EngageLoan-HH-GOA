// components/Card.js
import Image from 'next/image';
import Link from 'next/link';
import second from '../../../public/assets/NotFound.png'
import CardImages from '@/components/CardComponent/CardImages';

const PCard = () => {
    return (
        <div className="flex justify-center ali">
            <div className="p-6 bg-gray-800 bg-opacity-5 backdrop-blur-md rounded-lg shadow-lg max-w-md mx-auto hover:shadow-white">
                <CardImages />
                <div className="p-6 bg-gray-800 bg-opacity-5 backdrop-blur-md rounded-lg shadow-lg max-w-md mx-auto hover:shadow-white">
                    <div className="text-center mb-5">
                        <p className="font-semibold">Loan Amount $ 1000</p>
                    </div>
                    <div className="text-center mb-5">
                        <p className="font-semibold">Interest Rate 5%</p>
                    </div>
                    <div className="text-center mb-5">
                        <p className="font-semibold">Borrower Address: 0x.....</p>
                    </div>
                    <div className="text-center mb-5">
                        <p className="font-semibold">Expiration Date: Aug 08, 2024</p>
                    </div>
                    <div className="flex">
                        <button className="w-full mt-4 bg-white text-black rounded-md transform hover:translate-y-1 shadow-lg hover:shadow-xl mr-2">
                            Lend Loan
                        </button>
                        <button className="w-full mt-4 bg-white text-black rounded-md transform hover:translate-y-1 shadow-lg hover:shadow-xl">
                            Claim NFT
                        </button>
                    </div>
                    <div className="flex mt-4">
                        <button className="w-full bg-white text-black rounded-md transform hover:translate-y-1 shadow-lg hover:shadow-xl mr-2">
                            <Link href={`https://sepolia.etherscan.io/nft/0x1234567890abcdef1234567890abcdef12345678/1`} target="_blank">
                                View NFT
                            </Link>
                        </button>
                        <button className="w-full bg-black text-white rounded-md transform hover:translate-y-1 shadow-lg hover:shadow-xl ml-2">
                            <Link href={`/nft/1`}>
                                Comment
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PCard;
