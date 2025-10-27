import { environment } from "@/environments/environment.dev";
import { createElement } from "react";
import { type RouteObject, Navigate, Form } from "react-router-dom";

export const travelAppRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: () => createElement(Navigate, { to: "cities", replace: true }),
  },
  {
    path: "cities",
    Component: Cities,
    loader: TravelAppCitiesPageLoader,
    ErrorBoundary: ErrorPage,
    HydrateFallback: PageLoading,
  },
  {
    path: "cities/:id",
    Component: City,
    loader: TravelAppCityPageLoader,
    ErrorBoundary: ErrorPage,
    HydrateFallback: PageLoading,
  },
  {
    path: "countries",
    Component: Countries,
    loader: async ({ request }) => {
      try {
        const cities = await loadCitiesData(request);
        // const cities = await fetchWithRetry<CitiesData>(
        //   "/api/travel-app-cities.json",
        //   {
        //     signal: request.signal,
        //   },
        // );
        if (!cities?.cities) {
          return {
            countries: [],
          };
        }
        const countries = cities?.cities?.reduce(
          (arr: { country: string; continent: string }[], city) => {
            if (!arr.some((ac) => ac.country === city.country)) {
              arr.push({ country: city.country, continent: city.continent });
            }
            return arr;
          },
          [],
        );
        return {
          countries: countries ?? [],
        };
      } catch (error) {
        return handleLoaderError(error, {});
      }
    },
    ErrorBoundary: ErrorPage,
    HydrateFallback: PageLoading,
  },
  {
    path: "form",
    Component: Form,
    loader: async ({ request }) => {
      try {
        const url = new URL(request.url);
        const lat = url.searchParams.get("lat");
        const lng = url.searchParams.get("lng");

        if (!lat || !lng) {
          return {
            title: "Missing Coordinates",
            message: "Please provide location coordinates",
          };
        }

        const BASE_URL = environment.geoUrl;
        return await fetchWithRetry<GeoLocationResponse>(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
          { signal: request.signal },
        );
      } catch (error) {
        return handleLoaderError(error, {
          title: "Error",
          message: "Unable to load location data",
        });
      }
    },
  },
  {
    path: "*",
    Component: NotFound,
  },
];
