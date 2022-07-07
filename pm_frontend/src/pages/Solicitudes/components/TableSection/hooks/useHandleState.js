import { useContext } from 'react';
import { useBackend } from 'hooks/useBackend';
import FiltersContext from 'context/FiltersContext';
import { getFormattedDate } from 'utilities/dateOperations';

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
    const data = new FormData(e.currentTarget);
    const date_issue = getFormattedDate(new Date());

    // Request body
    const payload = {
      request_id,
      date_issue,
      code_sta,
      reason: data.get('reason_reject')
    };

    // Request to the backend to make the state change
    postEvent(payload).then(() => {
      getRequests(filters).then(setListRequests);
      setOpen(false);
    });
  };

  return {
    handleState
  };
}
