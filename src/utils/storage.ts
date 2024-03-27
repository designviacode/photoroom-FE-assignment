import localforage from "localforage";

export const storageKeys = {
  FOLDERS: "photoroom_folders",
  IMAGES: "photoroom_images",
};

export const getFromStorage = async (key: string) => {
  try {
    const data = await localforage.getItem(key);
    return data;
  } catch (err) {
    console.error(err);
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
