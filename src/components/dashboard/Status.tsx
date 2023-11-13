import React from "react";
import { Lang, ReferalStatus, User } from "../../types/types";
import useBallance from "../../hooks/useBallance";
import usePercent from "../../hooks/usePercent";
import cn from 'classnames';

export interface StatusProps {
  user: User;
  lang: Lang;
  config: any;
}

const Status = ({ user, lang, config: { locale } }: StatusProps): JSX.Element => {
  const ballance = useBallance(user);
  const percent = usePercent(user);
  const branches = user.referals.filter(r => r.status === ReferalStatus.accepted).length;
  const payoutDays = 3;
  const labelClasses = cn('font-semibold', 'text-xl', 'mr-2');
  const valClasses = cn('font-extrabold', 'text-xl', 'text-gray-500');
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'align-top',
        'justify-start',
        'w-[360px]',
        'whitespace-nowrap',
        'mr-4'
      )}
    >
      <h4
        className={cn(
          'text-2xl',
          'pt-4',
          'pb-2',
          'font-extrabold',
          'text-gray-500'
        )}
      >
        {locale.status.titles[lang]}
      </h4>
      <p
        className={cn(
          'w-[360px]',
          'text-base',
          'whitespace-normal',
          'mb-2',
          'text-gray-500'
        )}
      >
        {locale.status.dialog.title[lang]}
      </p>
      <div
        className={cn('grid', 'grid-cols-2', 'gap-x-11', 'w-[440px]', 'pr-4')}
      >
        <span className={labelClasses}>{locale.status.balance[lang]}</span>
        <span className={valClasses}>{ballance.toFixed(2)}€</span>
        <span className={labelClasses}>{locale.status.branches[lang]}</span>
        <span className={valClasses}>{branches}</span>
        <span className={labelClasses}>{locale.status.extra[lang]}</span>
        <span className={valClasses}>{0}</span>
        <span className={labelClasses}>{locale.status.percent[lang]}</span>
        <span
          className={cn(
            'font-extrabold',
            'text-sm',
            'flex',
            'items-center',
            'justify-center',
            'mr-2',
            'text-white',
            'rounded-full',
            'bg-primary',
            'w-14 h-8'
          )}
        >
          +{percent}%
        </span>
        <span className={labelClasses}>{locale.status.profit[lang]}</span>
        <span className={valClasses}>
          {(ballance * 0.01 * percent).toFixed(2)}€
        </span>
        <span className={labelClasses}>{locale.status.payout[lang]}</span>
        <span className={valClasses}>{payoutDays}</span>
        <div className="mt-6"></div>
      </div>
      <button
        disabled
        onClick={() => {}}
        className={cn(
          'px-4',
          'py-3',
          'rounded-md',
          'bg-primary',
          'text-white',
          'font-bold',
          'text-xl',
          'w-[360px]',
          'opacity-50'
        )}
      >
        {locale.status.action[lang]}
      </button>
    </div>
  );
}

export default Status;