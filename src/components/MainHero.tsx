import React from 'react';
import cn from 'classnames';

const MainHero = (props: any) => {
  const { onSignin, lang, config } = props;
  const { mainHero } = config;
  return (
    <main
      className={cn(
        'relative',
        'mt-[440px]',
        'mx-auto',
        'px-4',
        'sm:mt-2',
        'sm:pl-2',
        'sm:pr-0',
        'md:mt-6',
        'lg:mt-20',
        'lg:px-4',
        'xl:mt-8'
      )}
    >
      <div className={cn('text-left')}>
        <h1
          className={cn(
            'text-[8vw]',
            'sm:text-[4vw]',
            'tracking-tight',
            'font-extrabold',
            'text-gray-900'
          )}
        >
          <span className={cn('block', 'xl:inline')}>
            {mainHero.titles[lang]}
          </span>{' '}
          <span className={`block text-primary xl:inline`}>
            {mainHero.subtitles[lang]}
          </span>
        </h1>
        <p
          className={cn(
            'mt-3',
            'text-gray-500',
            'sm:mt-5',

            'text-base',
            'sm:text-sm',
            'md:text-base',
            'lg:text-base',
            'xl:text-lg',
            'max-w-none',
            'sm:max-w-[50vw]',
            'sm:mx-0',
            'md:mt-5',
            'lg:mx-0'
          )}
        >
          {mainHero.descriptions[lang]}
        </p>
        <div className={cn('mt-5', 'sm:mt-8', 'sm:flex', 'justify-start')}>
          <div className="rounded-md shadow">
            <a
              href={mainHero.primaryAction.href}
              onClick={() => onSignin()}
              className={cn(
                'flex',
                'items-center',
                'justify-center',
                'px-8',
                'py-3',
                'border',
                'border-transparent',
                'text-base',
                'font-medium',
                'rounded-md',
                'text-background',
                'bg-primary',
                'md:py-4',
                'md:text-lg',
                'md:px-10'
              )}
            >
              {mainHero.primaryAction.texts[lang]}
            </a>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a
              href={mainHero.secondaryAction.href}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              {(mainHero.secondaryAction.texts as any)[lang]}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
