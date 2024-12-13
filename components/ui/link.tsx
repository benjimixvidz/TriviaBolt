import NextLink from 'next/link';
import { cn } from '@/lib/utils';

interface LinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  className?: string;
  children: React.ReactNode;
}

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <NextLink className={cn('text-primary hover:underline', className)} {...props}>
      {children}
    </NextLink>
  );
}