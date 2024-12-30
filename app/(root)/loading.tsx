import loader from '@/assets/loader.gif';
import Image from 'next/image';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center size-full">
      <Image src={loader} width={100} height={100} alt="Loading..." />
    </div>
  );
};

export default LoadingPage;
