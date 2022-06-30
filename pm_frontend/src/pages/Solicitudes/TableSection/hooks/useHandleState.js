import { useContext } from 'react';
import { useBackend } from 'hooks/useBackend';
import FiltersContext from 'context/FiltersContext';

/**
 * Custom hooks that provide functions to manipulate the
 * state of a record
 */
export function useHandleState () {
  const { postEvent, getRequests } = useBackend();
  const { filters, setListRequests } = useContext(FiltersContext);

  /**
   * Make a request to change record status.
   * @event
   * @param {object} e - Submit event
   * @param {number} request_id - Record indentifier
   * @param {number} code_sta - State to which the record is changed
   * @param {function} setOpen - Allows to close the modal if the request was successful
   */
  const handleState = (e, request_id, code_sta, setOpen) => {
    e.preventDefault();
    let date_current = new Date();
    date_current.setDate(date_current.getDate() - 1)
    const date_issue = date_current.toISOString()

    // Request body
    const payload = {
      request_id,
      date_issue,
      code_sta
    }
    
    // Request to the backend to make the state change
    postEvent(payload).then(() => {
      getRequests(filters).then(setListRequests);
      setOpen(false);
    })
  }

  return {
    handleState
  }
}
