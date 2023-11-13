import React, { useState } from "react";
import flag from 'rendered-country-flags';
import { DashboardProps } from "./Dashboard.types";
import useMe from "../hooks/useMe";
import Fundings from "./dashboard/Fundings";
import Status from "./dashboard/Status";
import NewFunding from "./dashboard/NewFunding";
import cn from "classnames";
import Referals from "./dashboard/Referals";
import { Lang } from "../types/types";

const Dashboard = ({
  config,
  user,
  jwt,
  onSignOut,
  lang,
  onSetLang
}: DashboardProps): JSX.Element | null => {
  const [newFundingShown, setNewFundingShown] = useState<boolean>(false);
  const { company, locale } = config;
  const { logo } = company;
  const me = useMe(jwt);
  if (!me) {
    return null;
  }
  const blockClasses = cn(
    'flex',
    'flex-col',
    'sm:flex-col',
    'md:flex-row',
    'items-start',
    'justify-between',
    'mt-4',
    'w-[360px]',
    'md:w-[780px]'
  );
  const flagClasses = cn('w-7', 'mx-1', 'p-1', 'rounded-full', 'bg-opacity-60');
    return (
      <div
        className={cn(
          'relative',
          'pt-6',
          'px-4',
          'flex',
          'flex-col',
          'items-center',
          'overflow-visible'
        )}
      >
        <div className={cn('flex', 'flex-row', 'items-center')}>
          <img
            alt="logo"
            className={cn('h-16', 'w-auto', 'sm:h-16', 'mr-4')}
            src={logo}
          />

          <span className="font-medium mr-1">Hello</span>
          <span className="font-bold mr-2">{user.username}!</span>
          <img
            alt=""
            className="w-8 h-8 rounded-full object-cover mr-4"
            src={`http://212.39.67.73:88${me.userpic?.url || ''}`}
          ></img>
          <button
            className={cn(
              'bg-primary text-gray-50 cursor-pointer rounded-md px-4 py-1 ml-4'
            )}
            onClick={onSignOut}
          >
            {locale.logout[lang]}
          </button>
          <span className="flex-grow"></span>
          <div>
            <button
              onClick={() => onSetLang(Lang.PL)}
              className={cn(flagClasses, {
                'bg-primary': lang === Lang.PL,
              })}
            >
              <img src={flag.PL} className={cn('w-5')} />
            </button>
            <button
              onClick={() => onSetLang(Lang.EN)}
              className={cn(flagClasses, {
                'bg-primary': lang === Lang.EN,
              })}
            >
              <img src={flag.GB} className={cn('w-5')} />
            </button>
            <button
              onClick={() => onSetLang(Lang.RU)}
              className={cn(flagClasses, {
                'bg-primary': lang === Lang.RU,
              })}
            >
              <img src={flag.RU} className={cn('w-5')} />
            </button>
            <button
              onClick={() => onSetLang(Lang.DE)}
              className={cn(flagClasses, {
                'bg-primary': lang === Lang.DE,
              })}
            >
              <img src={flag.DE} className={cn('w-5')} />
            </button>
          </div>
        </div>
        <div className={blockClasses}>
          <Fundings
            config={config}
            lang={lang}
            fundings={me.fundings}
            onNewFunding={() => setNewFundingShown(true)}
          />
          <Status config={config} user={me} lang={lang} />
        </div>
        <div className={blockClasses}>
          <Referals
            config={config}
            user={me}
            invites={false}
            jwt={jwt}
            lang={lang}
          />
          <Referals
            config={config}
            user={me}
            invites={true}
            jwt={jwt}
            lang={lang}
          />
        </div>

        <NewFunding
          config={config}
          lang={lang}
          jwt={jwt}
          user={me}
          onClose={() => setNewFundingShown(false)}
          open={newFundingShown}
        />
      </div>
    );
};

export default Dashboard;