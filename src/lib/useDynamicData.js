"use client";

import { useState, useEffect } from 'react';
import { fetchMedia, fetchServices } from './api';

/**
 * Hook to fetch dynamic media for a specific public section with static fallback
 */
export function useDynamicMedia(section, fallbackData) {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetchMedia(section);
        if (isMounted && res && res.data && res.data.length > 0) {
          setData(res.data);
        }
      } catch (err) {
        // Silently use fallbackData on network/server error
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [section]);

  return data;
}

/**
 * Hook to fetch dynamic services with static fallback
 */
export function useDynamicServices(fallbackServices) {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetchServices();
        if (isMounted && res && res.data && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        // Silently use fallbackServices on network/server error
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return services;
}
