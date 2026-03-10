

import {FetchSuccess} from '../../types/common.entities';
import {default as axios, DEFAULT_HEADERS} from './axios';

//GET
export const getCall = async <T>(
  url: string,
  customHeaders: Record<string, string | boolean> = {},
  authorization: any = '',
) => {
  const headers = {
    ...DEFAULT_HEADERS,
    ...customHeaders,
    Authorization: authorization,
  };
  return await axios
    .get(url, {headers: headers})
    .then((response: unknown) => {
      return Promise.resolve(response as FetchSuccess<T>);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

//POST
export const postCall = async <T>(
  url: string,
  data: any = {},
  signal?: AbortSignal,
  authorization: string = '',
  customHeaders: Record<string, string> = {},
) => {
  const headers = {
    ...DEFAULT_HEADERS,
    ...customHeaders,
    Authorization: authorization,
  };
  return await axios
    .post(url, data, {headers, signal})
    .then((response: unknown) => {
      return Promise.resolve(response as FetchSuccess<T>);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

//PUT
export const putCall = async <T>(
  url: string,
  data: any,
  authorization: string = '',
  customHeaders: Record<string, string> = {}, // Accept custom headers
) => {
  let headers = {
    ...DEFAULT_HEADERS,
    Authorization: authorization, // Add authorization if needed
    ...customHeaders, // Add custom headers passed by the user
  };

  // Force multipart/form-data for FormData
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  // Make the PUT request with the headers
  return await axios
    .put(url, data, {headers}) // Pass headers to the request
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

//DELETE
export const deleteCall = async <T>(
  url: string,
  authorization: string = '',
  customHeaders: Record<string, string> = {},
) => {
  const headers = {
    ...DEFAULT_HEADERS,
    Authorization: authorization, // Add authorization if needed
    ...customHeaders,
  };
  return await axios
    .delete(url, {headers: headers})
    .then((response: unknown) => {
      return Promise.resolve(response as FetchSuccess<T>);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export const patchCall = async <T>(
  url: string,
  data: any,
  authorization: string = '',
  customHeaders: Record<string, string> = {},
) => {
  const headers = {
    ...DEFAULT_HEADERS,
    Authorization: authorization,
    ...customHeaders,
  };
  return await axios
    .patch(url, data, {headers: headers})
    .then((response: unknown) => {
      return Promise.resolve(response as FetchSuccess<T>);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};
