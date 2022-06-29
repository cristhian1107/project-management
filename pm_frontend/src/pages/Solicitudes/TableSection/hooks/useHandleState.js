import { useContext } from 'react';
import { useBackend } from 'hooks/useBackend';
import FiltersContext from 'context/FiltersContext';

export function useHandleState () {
  const { postEvent, getRequests } = useBackend();
  const { filters, setListRequests } = useContext(FiltersContext);

  const handleState = (e, request_id, code_sta, setOpen) => {
    e.preventDefault();
    let date_current = new Date();
    date_current.setDate(date_current.getDate() - 1)
    const date_issue = date_current.toISOString()

    const payload = {
      request_id,
      date_issue,
      code_sta
    }

    postEvent(payload).then(() => {
      console.log("ANTEEEEEEEEEEES")
      getRequests(filters).then(setListRequests);
      console.log("AAAAAAAAAAAAAAAAAA")
      setOpen(false);
      console.log("FINALLLL")
    })
  }

  return {
    handleState
  }
}
