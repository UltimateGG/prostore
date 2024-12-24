import { cn } from '@/lib/utils';

export const ProductPrice = ({ price, className }: { price: number; className?: string }) => {
  const [dollars, pennies] = price.toFixed(2).split('.');

  return (
    <p className={cn('text-2xl', className)}>
      <span className="text-xs align-super">$</span>
      {dollars}
      <span className="text-xs align-super">.{pennies}</span>
    </p>
  );
};
