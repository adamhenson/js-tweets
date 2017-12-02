import { CONTENT_ERROR } from '../content';

export const getHTTPResponse = async (response) => {
  // 204 = no content
  if (response.status === 204) {
    return { success: {} };
  }

  const json = await response.json();
  if (json.error) {
    return {
      error: (!json.error.message)
        ? CONTENT_ERROR
        : json.error.message,
    };
  }

  return {
    body: { ...json },
    success: {},
  };
};

export default {
  getHTTPResponse,
};
