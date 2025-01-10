import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CredentialsForm } from './credentials-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign In'
};

const SignInPage = async ({ searchParams }: { searchParams: Promise<{ callbackUrl: string }> }) => {
  const { callbackUrl } = await searchParams;
  const session = await auth();

  if (session) return redirect(callbackUrl || '/');

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image src="/images/logo.svg" width={100} height={100} alt={APP_NAME} priority />
          </Link>

          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <CredentialsForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
