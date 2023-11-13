import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import { Referal, ReferalStatus } from '../../types/types';
import useBallance from '../../hooks/useBallance';

export interface ReferalItemProps {
  referal: Referal;
}

const ReferalItem = ({ referal: { createdAt, email: invite, slave, status } }: ReferalItemProps): JSX.Element => {
  const m = moment(createdAt);
  
  const email =
    status === ReferalStatus.accepted && slave ? slave.email : invite;
  const ballance = useBallance(slave).toFixed(2);
  let branches = ''
  if (slave && status === ReferalStatus.accepted) {
    branches = `${slave.referals?.length || 0}`;
  }
  return (
    <div
      className={cn(
        'flex',
        'flex-row',
        'py-1',
        'align-baseline',
        'justify-between'
      )}
    >
      <div className={cn('w-6', 'text-left')}>
        <span
          className={cn(
            'rounded-full',
            'text-lg',
            'w-3',
            'h-3',
            'inline-block',
            {
              'bg-primary': status !== ReferalStatus.accepted,
              'bg-green-600': status === ReferalStatus.accepted,
            }
          )}
        />
      </div>
      {status !== ReferalStatus.accepted && (
        <>
          <span className={cn('w-auto', 'font-bold', 'font-mono', 'mr-1')}>
            {m.format('DD')}
          </span>
          <span className={cn('w-auto', 'font-bold', 'font-mono', 'mr-1')}>
            {m.format('MMM')}
          </span>
          <span className={cn('w-12', 'font-mono', 'font-light', 'mr-2')}>
            {m.format('HH:mm')}
          </span>
        </>
      )}
      <span className={cn('w-auto', 'font-medium', 'flex-grow')}>{email}</span>
      {status === ReferalStatus.accepted && (
        <>
          <span className={cn('w-16', 'font-bold', 'ml-2', 'text-gray-500')}>
            {ballance}
            <span className={cn('font-extrabold', 'text-gray-700')}>€</span>
          </span>
          <span className={cn('w-16', 'font-bold', 'ml-4')}>
            {branches} <span className={cn('font-extrabold')}>⋔</span>
          </span>
        </>
      )}
    </div>
  );
}

export default ReferalItem;