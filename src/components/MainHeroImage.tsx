import React from 'react';
import cn from 'classnames';

const MainHeroImage = ({ lang, config }: any) => {
  const { mainHero, note } = config;
  const imgClass = cn(
    'w-16',
    'mx-1',
    'sm:w-16',
    'md:w-18',
    'lg-w:20',
    'xl:w-24',
    '2xl:w-20'
  );

  return (
    <div
      className={cn(
        'absolute',
        'z-50',
        'pointer-events-none',
        'sm:z-auto',
        'inset-y-0',
        'right-0',

        'left-0',
        'sm:left-auto',

        'top-28',
        'sm:top-auto',

        'h-full',
        'lg:w-1/2'
      )}
    >
      <div
        className={cn(
          'relative',
          'h-80',
          'w-full',
          'sm:h-full',
          'md:h-full',
          'lg:w-full',
          'lg:h-full',
          'overflow-visible'
        )}
      >
        <img
          alt=""
          className={cn(
            'h-80',
            'sm:h-full',
            'w-full',
            'object-cover',
            'md:h-full',
            'lg:w-full',
            'lg:h-full'
          )}
          src={mainHero.img}
        />
        <div className={cn('absolute', 'top-0', 'right-0', 'w-full', 'h-full')}>
          <div
            className={cn(
              'absolute',
              'left-0',
              'w-[100vw]',
              'sm:w-auto',

              'sm:left-1/2',
              'md:left-1/4',
              'right-0',
              'sm:right-0',
              'md:right-0',
              'lg:right-0',
              'xl:right-12',
              '2xl:right-20',
              'bg-gray-50',
              'bg-opacity-70',
              'text-left',
              'mix-blend-luminosity',
              'h-1/2',
              'flex',
              'flex-col',

              'items-center',
              'sm:items-start',

              'pl-0',
              'sm:pl-40',
              'md:pl-60',
              'lg:pl-[10vw]',
              'xl:pl-[8vw]',
              '2xl:pl-[6vw]',
              'justify-center'
            )}
          >
            <p
              className={cn(
                'text-2xl',
                'sm:text-[2vw]',
                'font-extrabold',
                'text-primary'
              )}
            >
              EARN & HELP
              <br />
              INVEST FUND
            </p>
            <p
              className={cn(
                'text-2xl',
                'sm:text-[2.8vw]',
                'font-extrabold',
                'text-black'
              )}
            >
              93287.34€
            </p>
          </div>
          <div
            className={cn(
              'absolute',
              'flex',
              'flex-row',
              'align-middle',
              'justify-center',
              'bottom-auto',
              'sm:top-auto',
              'top-[102%]',
              'sm:bottom-[44%]',
              'md:bottom-[46%]',
              'lg:bottom-[47%]',
              'xl:bottom-[48%]',
              'right-auto',
              'sm:right-0',
              'left-0',
              'w-[100vw]',
              'sm:w-1/2',
              'md:w-3/4',
              'lg:w-3/4',
              'z-20',
              'grayscale',
              'mx-0',
              '2xl:mx-32'
            )}
          >
            <img className={imgClass} src="/assets/images/ref1.png" />
            <img className={imgClass} src="/assets/images/ref2.png" />
            <img className={imgClass} src="/assets/images/ref3.png" />
            <img className={imgClass} src="/assets/images/ref4.png" />
          </div>
          <div
            className={cn(
              'left-0',
              'sm:left-1/2',
              'md:left-1/4',
              'bottom-auto',
              'top-[50%]',
              'sm:top-auto',
              'sm:bottom-0',

              'w-[100vw]',
              'sm:w-auto',

              'right-0',
              'sm:right-0',
              'md:right-0',
              'lg:right-0',
              'xl:right-12',
              '2xl:right-20',

              'absolute',
              'flex',
              'flex-col',
              'items-start',
              'pl-4',
              'pr-4',

              'sm:pl-40',
              'md:pl-60',
              'lg:pl-[10vw]',
              'xl:pl-[8vw]',
              '2xl:pl-[6vw]',
              'justify-center',
              'bg-primary',
              'bg-opacity-70',
              'mix-blend-hard-light',
              'h-3/4',
              'sm:h-1/2',
              'pb-20'
            )}
          >
            <p
              className={cn(
                'text-base',
                'sm:text-[1.62vw]',
                'font-bold',
                'text-white',
                'mb-18'
              )}
            >
              {note[lang]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeroImage;
