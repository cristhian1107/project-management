// Services
import requestsToThePrivateApi from 'services/private.service';

function useBackend () {

  return {
    ...requestsToThePrivateApi
  }
}

export { useBackend };
