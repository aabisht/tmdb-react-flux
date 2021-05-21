export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

export class ApiParameters {
  setApiKey(api_key) {
    return "?api_key=" + api_key;
  }

  setSessionID(session_id) {
    return "&session_id=" + session_id;
  }

  setLanguage(language) {
    return "&language=" + language;
  }

  setPageNumber(page) {
    return "&page=" + page;
  }

  setSortBy(sort) {
    return "&sort_by=" + sort;
  }

  setWithWatchMonetizationTypes(with_watch_monetization_types) {
    return "&with_watch_monetization_types=" + with_watch_monetization_types;
  }

  setIncludeAdult(include_adult) {
    return "&include_adult=" + include_adult;
  }

  setWatchRegion(watch_region) {
    return "&watch_region=" + watch_region;
  }

  setRegion(region) {
    return "&region=" + region;
  }

  setWatchProviders(watch_providers) {
    return "&with_watch_providers=" + watch_providers;
  }

  setWithGenres(with_genres) {
    return "&with_genres=" + with_genres;
  }

  setExternalSource(external_source) {
    return "&external_source=" + external_source;
  }

  setCountry(country) {
    return "&country=" + country;
  }

  setQuery(query) {
    return "&query=" + query;
  }

  setYear(year) {
    return "&year=" + year;
  }

  setPrimaryReleaseYear(primary_release_year) {
    return "&primary_release_year=" + primary_release_year;
  }

  setFirstAirDateYear(first_air_date_year) {
    return "&first_air_date_year=" + first_air_date_year;
  }
}
