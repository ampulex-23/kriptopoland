import React, { useState } from "react";
import { Lang, ReferalStatus, User } from "../../types/types";
import cn from 'classnames';
import moment from 'moment';
import ReferalItem from "./ReferalItem";
import Invite from "./Invite";

interface ReferalsProps {
  user: User;
  jwt: string; 
  invites: boolean;
  lang: Lang;
  config: any;
}

const Referals = ({
  user,
  jwt,
  invites = false,
  lang,
  config: {
    locale
  }
}: ReferalsProps): JSX.Element => {
  const { referals } = user;
  const [inviteVisible, setInviteVisible] = useState<boolean>(false);
  const sortedReferals = [...referals].sort((a, b) =>
    moment(a.createdAt).isBefore(b.createdAt) ? -1 : 1
  );
  const acceptedReferals = sortedReferals.filter(
    (r) => r.status === ReferalStatus.accepted
  );
  const pendingReferals = sortedReferals.filter(
    (r) => r.status === ReferalStatus.pending
  );
  const h4Classes = cn('text-2xl', 'py-4', 'font-extrabold', 'text-gray-500');
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'align-baseline',
        'justify-start',
        'w-[360px]',
        'mr-4'
      )}
    >
      {!invites ? (
        <>
          <h4 className={h4Classes}>{locale.branches.titles[lang]}</h4>
          {acceptedReferals.map((r, key) => (
            <ReferalItem referal={r} key={key} />
          ))}
        </>
      ) : (
        <>
          <h4 className={h4Classes}>{locale.referals.titles[lang]}</h4>
          {pendingReferals.map((r, key) => (
            <ReferalItem referal={r} key={key} />
          ))}
        </>
      )}
      {invites && (
        <>
          <button
            onClick={() => setInviteVisible(true)}
            className={cn(
              'px-4',
              'py-3',
              'rounded-md',
              'bg-primary',
              'text-white',
              'font-bold',
              'text-xl',
              'w-full',
              'mt-4',
              'mb-8'
            )}
          >
            {locale.referals.action[lang]}
          </button>
          <Invite
            lang={lang}
            open={inviteVisible}
            jwt={jwt}
            onClose={() => setInviteVisible(false)}
            user={user}
          />
        </>
      )}
    </div>
  );
};

export default Referals;