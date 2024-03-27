import localforage from "localforage";

export const storageKeys = {
  FOLDERS: "photoroom_folders",
  IMAGES: "photoroom_images",
};

/**
 * In real world project, I would make these functions more type safe
 */

export const getJSONFromStorage = async (
  key: string,
  defaultValue?: unknown
) => {
  try {
    const data = await JSON.parse(
      (await localforage.getItem(key)) as unknown as string
    );
    return data;
  } catch (err) {
    console.error(err);
    return defaultValue;
  }
};

export const setInStorage = async (key: string, value: unknown) => {
  try {
    const data = await localforage.setItem(key, JSON.stringify(value));
    return data;
  } catch (err) {
    console.error(err);
  }
};
