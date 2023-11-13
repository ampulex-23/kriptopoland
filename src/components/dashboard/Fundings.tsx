import React from "react";
import { Funding, Lang } from "../../types/types";
import moment from 'moment';
import cn from 'classnames';
import FundingItem from "./FundingItem";

export interface FundingsProps {
  fundings: Funding[];
  onNewFunding(): void;
  lang: Lang;
  config: any;
}

const Fundings = ({ fundings, onNewFunding, lang, config: { locale } }: FundingsProps): JSX.Element => {
  const sortedFundings = [...fundings].sort((a, b) => {
    return moment(a.accepted_at).isBefore(moment(b.accepted_at)) ? -1 : 1;
  });
  return (
    <div className="fundings flex flex-col align-baseline justify-start w-[360px] mr-4">
      <h4 className={cn('text-2xl', 'py-4', 'font-extrabold', 'text-gray-500')}>
        {locale.fundings.titles[lang]}
      </h4>
      {sortedFundings.map((f, key) => (
        <FundingItem funding={f} key={key} />
      ))}
      <div className="mt-6"></div>
      <button
        onClick={() => onNewFunding()}
        className={cn(
          'px-4',
          'py-3',
          'rounded-md',
          'bg-primary',
          'text-white',
          'font-bold',
          'text-xl',
          'w-full'
        )}
      >
        {locale.fundings.action[lang]}
      </button>
    </div>
  );
}

export default Fundings;