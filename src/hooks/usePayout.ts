import { useState, useEffect } from "react"
import { FundingStatus, User } from "../types/types";
import moment from 'moment';

const usePayoutDate = (user: User | null) => {
  const [payout, setPayout] = useState<Date | null>(null);
  useEffect(() => {
    if (user) {
      const firstFunding = [
        ...user.fundings.filter((f) => f.status === FundingStatus.accepted),
      ].sort((a, b) => {
        return moment(a.accepted_at).isBefore(moment(b.accepted_at)) ? 1 : -1;
      })[0];
      if (firstFunding) {
        setPayout(new Date())  ;
      }
    }
  }, [user]);
  return payout;
}

export default usePayoutDate;