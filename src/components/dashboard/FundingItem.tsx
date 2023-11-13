import React, { useState } from 'react';
import { Funding, FundingStatus } from '../../types/types';
import cn from 'classnames';
import moment from 'moment';
import FundingHash from './FundingHash';

export interface FundingProps {
  funding: Funding;
}
const FundingItem = ({ funding }: FundingProps): JSX.Element => {
  const m = moment(funding.accepted_at || funding.createdAt);
  const [qrShown, setQrShown] = useState<boolean>(false);
  return (
    <div
      className={cn(
        'flex flex-row px-2 py-1',
        'align-baseline',
        'justify-start',
        'bg-opacity-40',
        'rounded-md',
        { 'bg-green-400': funding.status === FundingStatus.approved }
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
              'bg-primary': funding.status !== FundingStatus.accepted,
              'bg-green-600': funding.status === FundingStatus.accepted,
            }
          )}
        />
      </div>
      <span className={cn('w-auto', 'font-bold', 'font-mono', 'mr-1')}>
        {m.format('DD')}
      </span>
      <span className={cn('w-auto', 'font-bold', 'font-mono', 'mr-1')}>
        {m.format('MMM')}
      </span>
      <span className={cn('w-12', 'font-mono', 'font-light', 'mr-2')}>
        {m.format('HH:mm')}
      </span>
      <span
        className={cn(
          'font-black',
          'w-auto',
          'flex-grow',
          'text-right',
          'mr-2',
          'text-base',
          {
            'text-primary': funding.status !== FundingStatus.accepted,
            'text-green-600': funding.status === FundingStatus.accepted,
          }
        )}
      >
        +{funding.amount}
      </span>
      <span className={cn('font-extrabold', 'w-14', 'text-gray-500')}>
        {funding.currency}
      </span>
      {funding.transfer_hash &&
      funding.transfer_qr &&
      funding.status === FundingStatus.approved ? (
        <button onClick={() => setQrShown(true)} className={cn('ml-1')}>
          <img src="/assets/images/qr.png" className={cn('w-5', 'h-5')} />
        </button>
      ) : (
        <div className={cn('w-6')}></div>
      )}
      {funding.transfer_hash && funding.transfer_qr && (
        <FundingHash
          open={qrShown}
          onClose={() => setQrShown(false)}
          hash={funding.transfer_hash}
          hashQrUrl={`http://212.39.67.73:88${funding.transfer_qr.url || ''}`}
        />
      )}
    </div>
  );
}

export default FundingItem;