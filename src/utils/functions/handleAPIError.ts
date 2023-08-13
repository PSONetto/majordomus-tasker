import { RefObject } from 'react';

import axios from 'axios';
import { Toast } from 'primereact/toast';

/** Log and show API errors
 * @param error the error thrown;
 * @param toastRef a ref object for the Toast component; */

export default function handleAPIError(
  error: unknown,
  toastRef: RefObject<Toast>,
) {
  let errorMessage;

  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data;
    console.error(errorData);

    errorMessage = errorData.message;
  } else {
    console.error(error);

    errorMessage = error;
  }

  toastRef.current?.show({
    severity: 'error',
    summary: 'API Error',
    detail: errorMessage,
    sticky: true,
  });
}
