import React from "react";
import { Referal, ReferalStatus } from "../types/types";
import useBallance from "../hooks/useBallance";



export interface SlaveProps {
  referal: Referal;
}
const Slave = ({ referal }: SlaveProps): JSX.Element => {
  const { createdAt, slave, status, email } = referal;
  const ballance = useBallance(slave);
  return (
    <div className="flex flex-row items-baseline justify-between w-full mb-2 text-left">
      <span>{createdAt.replace('T', ' ').replace(/:[0-9]{2}\.[0-9]{3}Z/, '').replaceAll('-', '/')}</span>
      <span className="w-16 text-left block mr-12">{slave?.email || email}</span>
      <strong className="w-24 text-right block">{slave ? `${ballance.toFixed(3)}€` : '-'}</strong>
      <span
        className={[
          `inline-block rounded-md text-white px-2 py-1`,
          status === ReferalStatus.accepted ? 'bg-green-700' : 'bg-red-500',
        ].join(' ')}
      >
        {status === ReferalStatus.accepted ? '✓' : '⧖'}
      </span>
    </div>
  );
}

export default Slave;