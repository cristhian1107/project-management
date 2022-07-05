import { useEffect, useState } from 'react';

export function useFetchAndLoading () {
  const [loading, setLoading] = useState(false);
  let controller;

  const executeAsyncCall = async (asyncCall) => {
    if (asyncCall.controller) controller = asyncCall.controller;
    setLoading(true);
    let result;
    try {
      result = await asyncCall.call;
    } catch (err) {
      setLoading(false);
      throw err;
    }
    setLoading(false);
    return result;
  };

  const closeAsyncCall = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => closeAsyncCall();
  }, []);
  return { loading, executeAsyncCall };
}
