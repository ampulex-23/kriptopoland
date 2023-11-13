import { useEffect, useState } from "react";
import CryptoConvert from "crypto-convert";
import { FundingStatus, User } from "../types/types";

const convert = new CryptoConvert();

export const calculateBallance = async (user: User) => {
  if (!user) {
    return 0;
  }
  await convert.ready();
  let total = 0;
  user.fundings?.forEach(f => {
    if (f.status === FundingStatus.accepted) {
      if (f.currency in convert) {
        total += convert[f.currency].EUR(f.amount) || 0;
      }
    }
  });
  return total;
}

const useBallance = (user: User | null) => {
  const [ballance, setBallance] = useState<number>(0);
  useEffect(() => {
    if (user) {
      calculateBallance(user).then(setBallance);
    } else {
      setBallance(0);
    }
  }, [user]);
  return ballance;
}

export default useBallance;

