'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpUser } from '@/lib/actions/user.actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full">
      {pending ? 'Submitting...' : 'Sign Up'}
    </Button>
  );
};

export const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="space-y-6">
        <div>
          <Label>
            Name
            <Input name="name" type="text" required autoComplete="name" />
          </Label>
        </div>

        <div>
          <Label>
            Email
            <Input name="email" type="email" required autoComplete="email" />
          </Label>
        </div>

        <div>
          <Label>
            Password
            <Input name="password" type="password" required autoComplete="password" />
          </Label>
        </div>

        <div>
          <Label>
            Confirm Password
            <Input name="confirmPassword" type="password" required autoComplete="password" />
          </Label>
        </div>

        <SignUpButton />

        {data && !data.success && <div className="text-center text-destructive">{data.message}</div>}

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" target="_self" className="link text-blue-500">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
