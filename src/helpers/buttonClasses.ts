import classNames from "classnames";

export const buttonClasses =(cancel: boolean) => classNames(
  {'bg-primary': !cancel},
  {'bg-gray-500': cancel},
  'text-xl',
  'px-4',
  'text-white',
  'py-2',
  'rounded-md'
);
