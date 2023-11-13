import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'react-tooltip';
import { Lang } from '../types/types';
import 'react-tooltip/dist/react-tooltip.css';

export interface FeaturesProps {
  lang: Lang;
  config: any;
}

const Features = ({ lang, config }: FeaturesProps) => {
  const { features } = config;
  const { title, subtitles, descriptions, items: featuresList } = features;
  return (
    <div className={`pb-12 bg-background`} id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className={cn(
              'text-primary',
              'font-semibold',
              'tracking-wide',
              'uppercase',
              'text-6xl',
              'text-center',
              'sm:text-center',
              'md:text-center',
              'lg:text-center',
              'xl:text-left',
              '2xl:text-left'
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'mt-8',
              'sm:mt-4',
              'text-4xl',
              'sm:text-5xl',
              'leading-8',
              'font-extrabold',
              'tracking-tight',
              'text-gray-900',
              'sm:text-5xl',
              'sm:text-center',
              'md: text-left'
            )}
          >
            {subtitles[lang]}
          </p>
          <p
            className={cn(
              'mt-4',
              'max-w-6xl',
              'text-lg',
              'sm:text-2xl',
              'text-gray-500',
              'lg:mx-auto'
            )}
          >
            {descriptions[lang]}
          </p>
        </div>

        <div className="mt-0 sm:mt-10">
          <dl
            className={cn(
              'flex',
              'flex-col',
              'items-center',
              'sm:items-start',
              'sm:flex-row',
              'justify-between',
              'mx-8'
            )}
          >
            {featuresList.map((feature: any, index: number) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div
                    id={'feature' + index}
                    className={cn(
                      'flex',
                      'items-center',
                      'justify-center',
                      'grow-1',
                      'h-24',
                      'w-auto',
                      'sm:w-24',
                      'rounded-md',
                      'bg-background',
                      'text-tertiary',
                      'mb-8',
                      'sm:mb-0'
                    )}
                  >
                    <img
                      className={`inline-block`}
                      src={feature.icon}
                      alt={feature.name}
                    />
                  </div>
                </dt>
                <dd className="hidden mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
                <Tooltip
                  anchorId={'feature' + index}
                  variant="dark"
                  openOnClick={true}
                  style={{ maxWidth: '360px' }}
                  content={feature.description}
                />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
