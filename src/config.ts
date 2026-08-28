const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

/** Public URLs are centralized so the invitation and its data service always
 * travel under the Melkazom domain family. */
export const SITE_URL = 'https://melkazom.com.ng';

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || 'https://ledger.melkazom.com.ng',
);
