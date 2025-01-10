'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithCredentials } from '@/lib/actions/user.actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const signInDefaultValues = {
  email: '',
  password: ''
};

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full">
      {pending ? 'Signing In...' : 'Sign In'}
    </Button>
  );
};

export const CredentialsForm = () => {
  const [data, action] = useActionState(signInWithCredentials, null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="space-y-6">
        <div>
          <Label>
            Email
            <Input name="email" type="email" required autoComplete="email" defaultValue={signInDefaultValues.email} />
          </Label>
        </div>

        <div>
          <Label>
            Password
            <Input name="password" type="password" required autoComplete="password" defaultValue={signInDefaultValues.password} />
          </Label>
        </div>

        <SignInButton />

        {data && !data.success && <div className="text-center text-destructive">{data.message}</div>}

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" target="_self" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};
