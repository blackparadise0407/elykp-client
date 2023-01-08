import clsx from 'clsx';
import React from 'react';

type ButtonVariant = 'primary' | 'danger' | 'text' | 'link';

interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'ref'
  > {
  variant?: ButtonVariant;
  outlined?: boolean;
}

const getClsFromVariant = (
  variant: ButtonProps['variant'],
  outlined: ButtonProps['outlined'],
) => {
  switch (variant) {
    case 'primary':
      return outlined
        ? '!border-blue-500 text-blue-500 bg-white hover:bg-gray-100'
        : 'bg-blue-600 text-white hover:bg-blue-700';
  }
};

export default React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', outlined = false, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={clsx(
        'px-4 py-1 flex items-center gap-2 font-semibold border border-transparent rounded-lg transition-colors',
        getClsFromVariant(variant, outlined),
        className,
      )}
      {...rest}
    ></button>
  );
});
