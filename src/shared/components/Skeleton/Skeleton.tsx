import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={clsx('rounded bg-gray-300 animate-pulse', className)}></div>
  );
}
