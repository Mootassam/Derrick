import { useEffect, useState } from "react";
import axios from "axios";

const SESSION_STORAGE_KEY = "detectedCountryCode";
const DEFAULT_COUNTRY_CODE = "us";
const IP_GEOLOCATION_URL = "https://ipapi.co/json/";
const REQUEST_TIMEOUT_MS = 5000;

/**
 * Detects the visitor's country from their IP address (via ipapi.co) once per
 * browser session, caching the result in sessionStorage so it is not
 * re-fetched on remount. Falls back to `DEFAULT_COUNTRY_CODE` immediately and
 * on any failure/timeout, so callers never block on the network request.
 */
const useDetectedCountryCode = () => {
  const [countryCode, setCountryCode] = useState(
    () => sessionStorage.getItem(SESSION_STORAGE_KEY) || null
  );
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem(SESSION_STORAGE_KEY)
  );

  useEffect(() => {
    if (countryCode) {
      return undefined;
    }

    let isMounted = true;

    const detectCountry = async () => {
      let detected = DEFAULT_COUNTRY_CODE;
      try {
        const { data } = await axios.get(IP_GEOLOCATION_URL, {
          timeout: REQUEST_TIMEOUT_MS,
        });
        detected = (data?.country_code || DEFAULT_COUNTRY_CODE).toLowerCase();
      } catch (error) {
        detected = DEFAULT_COUNTRY_CODE;
      }

      sessionStorage.setItem(SESSION_STORAGE_KEY, detected);
      if (isMounted) {
        setCountryCode(detected);
        setLoading(false);
      }
    };

    detectCountry();

    return () => {
      isMounted = false;
    };
  }, [countryCode]);

  return { countryCode: countryCode || DEFAULT_COUNTRY_CODE, loading };
};

export default useDetectedCountryCode;
