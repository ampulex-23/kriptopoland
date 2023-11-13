import { useState, useEffect } from 'react';
import { ReferalStatus, User } from '../types/types';

const hasExtraPercent = async (user: User) => {
  // calculatet in back-end
  return false;
}

const usePercent = (user: User | null) => {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    if (user) {
      const numBranches = user.referals.filter(r => r.status === ReferalStatus.accepted).length;
      const branchesPercent = Math.min(25, 10 + Math.max(0, (numBranches - 10)));
      setPercent(branchesPercent);
      hasExtraPercent(user).then(hasExtra => hasExtra && setPercent(branchesPercent + 4));
    }
  }, [user]);
  return percent;
}

export default usePercent;