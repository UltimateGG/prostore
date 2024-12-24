import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/images/logo.svg" width={48} height={48} alt={`${APP_NAME} logo`} priority />

      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>

        <Link href="/">
          <Button variant="outline" className="mt-4">
            Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;