export const localStorageHelpers = (() => {
  const PLACES = "places";
  const ADDED_PLACES = "addedPlaces";

  const addPlace = (item: string): void => {
    const items = localStorage.getItem(ADDED_PLACES);
    const data = JSON.parse(items as string) === null ? [] : (JSON.parse(items as string) as string[]);

    data.push(item);

    localStorage.setItem(ADDED_PLACES, JSON.stringify(data));
  };

  const removePlace = (item: string): void => {
    const items = localStorage.getItem(ADDED_PLACES);

    if (items === null) return;

    const data = JSON.parse(items as string) as string[];
    const newData = data.filter((a) => a.toLocaleLowerCase() !== item.toLocaleLowerCase());

    localStorage.setItem(ADDED_PLACES, JSON.stringify(newData));
  };

  return {
    addPlace,
    removePlace,
  };
})();
