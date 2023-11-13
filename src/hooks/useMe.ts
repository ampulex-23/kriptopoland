import { useEffect, useState } from "react";
import { User } from "../types/types";

const useMe = (jwt: string) => {
  const [me, setMe] = useState<User | null>(null);
  const poll = () => {
    fetch('http://212.39.67.73:88/api/users/me?populate=userpic,referals,referals.slave,referals.slave.referals,fundings,fundings.transfer_qr,referals.slave.fundings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${jwt}`
      },
    }).then(response => {
      response.json().then(setMe);
    })
  }
  useEffect(() => {
    const iid = setInterval(poll, 5000);
    return () => {
      clearInterval(iid);
    }
  }, []);
  return me;
}

export default useMe;