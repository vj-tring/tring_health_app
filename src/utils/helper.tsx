

/* Utility helpers used across the app (keep this file dependency-light). */

import { Linking } from "react-native";
import InAppBrowser from 'react-native-inappbrowser-reborn';

type ExtractedError = {message: string; statusCode: number};

// Format a date string to 'Mon DD, YYYY' (e.g., Dec 24, 2025)
export const formatDate = (dateStr?: any) => {
  if (!dateStr) return '-'; // Return dash if no date provided
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // Return original if invalid date

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  };

  const formatted = date.toLocaleDateString('en-US', options).replace(',', '');
  const [month, day, year] = formatted.split(' ');

  return `${month} ${day}, ${year}`; // e.g., Dec 24, 2025
};

// Format a date string to 'Mon-DD-YYYY-HH:MM' (e.g., Dec-24-2025-14:30)
export const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date
    .toLocaleDateString('en-US', options)
    .replace(',', '')
    .replace(/ /g, '-');
};

// Capitalize the first letter of each word in a string
export const capitalizeWords = (str?: string) => {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()); // Capitalizes first letter of each word
};

export const getDisplayBadgeLabel = (label: string) => {
  if (!label) return '';
  const normalized = String(label)
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
  return capitalizeWords(normalized);
};

export const extractErrorMessage = (error: any): ExtractedError => {
  const fallback: ExtractedError = {
    statusCode: 500,
    message: 'Something went wrong',
  };
  if (!error) return fallback;

  const statusCode =
    error?.response?.status ??
    error?.status ??
    error?.statusCode ??
    error?.code ??
    fallback.statusCode;

  const message =
    error?.response?.data?.message ??
    error?.response?.data?.error ??
    error?.message ??
    (typeof error === 'string' ? error : undefined) ??
    fallback.message;

  return {
    statusCode: Number(statusCode) || fallback.statusCode,
    message: String(message || fallback.message),
  };
};

export const createPaginationHandler = <
  TResponse,
  TItem = unknown,
  TData = TItem[],
>(
  fetchPage: (page: number, pageSize: number) => Promise<TResponse>,
  extractData: (response: TResponse) => TData,
) => {
  return async (page: number, pageSize: number): Promise<TData> => {
    const response = await fetchPage(page, pageSize);
    return extractData(response);
  };
};

// Format a Date object to 'YYYY-MM-DD hh:mm AM/PM'
export const formatDowntimeApiDate = (date: Date) => {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
};

// Helper to format hours as 'X hr Y mins'
export function formatHoursToHrMin(
  hoursOrMinutes: number | string | undefined | null,
): string {
  if (
    !hoursOrMinutes ||
    isNaN(Number(hoursOrMinutes)) ||
    Number(hoursOrMinutes) <= 0
  )
    return '-';
  const value = Number(hoursOrMinutes);
  // If value is an integer and >= 10, treat as minutes
  if (Number.isInteger(value) && value < 100 && value < 60) {
    return `${value} mins`;
  }
  // If value is an integer and >= 60, treat as minutes
  if (Number.isInteger(value) && value >= 60) {
    const hr = Math.floor(value / 60);
    const min = value % 60;
    if (min === 0) return `${hr} hr`;
    return `${hr} hr ${min} mins`;
  }
  // Otherwise, treat as hours (decimal)
  const totalMinutes = Math.round(value * 60);
  const hr = Math.floor(totalMinutes / 60);
  const min = totalMinutes % 60;
  if (hr > 0 && min === 0) return `${hr} hr`;
  if (hr > 0) return `${hr} hr ${min} mins`;
  return `${min} mins`;
}

export const getMimeType = (fileName: string): string | undefined => {
  if (!fileName || typeof fileName !== 'string') return undefined;

  const extension = fileName.split('.').pop()?.toLowerCase();

  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain',
  };

  return mimeTypes[extension ?? ''];
};

// Open a URL in the in-app browser if available, otherwise fallback to system browser
export const openInAppBrowser = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        // iOS options
        dismissButtonStyle: 'close',
        preferredBarTintColor: '#fff',
        preferredControlTintColor: '#000',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        enableBarCollapsing: true,
        // Android options
        showTitle: true,
        toolbarColor: '#ffffff',
        secondaryToolbarColor: '#ffffff',
        navigationBarColor: '#ffffff',
        navigationBarDividerColor: '#ffffff',
      });
    } else {
      Linking.openURL(url); // Fallback to system browser if in-app browser not available
    }
  } catch (error) {
    Linking.openURL(url); // Fallback in case of error
  }
};

