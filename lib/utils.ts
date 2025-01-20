import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into regular js obj
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

export function isZodError(e: unknown): e is ZodError {
  return Boolean(e && (e instanceof ZodError || (e as ZodError).name === 'ZodError'));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(e: any): string {
  if (!e) return 'Unknown error';

  if (isZodError(e)) {
    return e.errors.map(m => m.message).join('. ');
  } else if (e.name === 'PrismaClientKnownRequestError' && e.code === 'P2002') {
    const field = e.meta?.target ? e.meta.target[0] : 'Field';

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    return typeof e.message === 'string' ? e.message : JSON.stringify(e.message);
  }
}
