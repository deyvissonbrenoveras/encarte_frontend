export function loadLogsRequest(startDate, endDate) {
  return {
    type: '@log/LOAD_LOGS_REQUEST',
    payload: { startDate, endDate },
  };
}

export function loadLogsSuccess(logs) {
  return {
    type: '@log/LOAD_LOGS_SUCCESS',
    payload: logs,
  };
}

export function logFailure() {
  return {
    type: '@log/FAILURE',
  };
}
