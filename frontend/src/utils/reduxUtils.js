class ReduxUtils {
  prepareAuthHeaders(headers, { getState }) {
    const token = getState().auth.userToken;
    if (token) {
      // include token in req header
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }
}

const reduxUtils = new ReduxUtils();

export default reduxUtils;
