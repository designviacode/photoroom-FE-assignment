/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { nanoid } from "nanoid";
import { action, computed, makeAutoObservable, observable } from "mobx";
import {
  getJSONFromStorage,
  setInStorage,
  storageKeys,
} from "../utils/storage";

export const DEFAULT_FOLDER_NAME = "Untitled Folder";
export const DEFAULT_FOLDER_ID = "DEFAULT_FOLDER_ABC";

export type Image = { imagePath: string; id: string; folderId: string };
export type Folder = { name: string; id: string };

export class AppStore {
  currentFolderId: Folder["id"] = DEFAULT_FOLDER_ID;
  folders: Folder[] = [{ name: DEFAULT_FOLDER_NAME, id: DEFAULT_FOLDER_ID }];
  /**
   * Due to time constraint, keeping simple array, in real project might keep a Map with folderId as key
   */
  images: Image[] = [];

  constructor() {
    makeAutoObservable(this, {
      folders: observable,
      makeNewFolder: action,
      renameFolder: action,
      setCurrentFolderId: action,
      totalFoldersCount: computed,
    });

    this.getFoldersFromStorage();
    this.getImagesFromStorage();
  }

  get totalFoldersCount() {
    return this.folders?.length;
  }

  get currentFolderImages() {
    return this.images.filter(
      (image) => image.folderId === this.currentFolderId
    );
  }

  async getFoldersFromStorage() {
    const updatedFoldersInStorage = (await getJSONFromStorage(
      storageKeys.FOLDERS,
      []
    )) as Folder[];

    if (updatedFoldersInStorage) {
      this.folders = updatedFoldersInStorage;
    }
  }

  async getImagesFromStorage() {
    const updatedImagesInStorage = (await getJSONFromStorage(
      storageKeys.IMAGES,
      []
    )) as Image[];

    if (updatedImagesInStorage) {
      this.images = updatedImagesInStorage;
    }
  }

  makeNewFolder(name: string) {
    const newFolder: Folder = { name, id: nanoid() };
    this.folders.push(newFolder);

    this.syncToStorage();
  }

  renameFolder({
    folderId,
    updatedName,
  }: {
    folderId: string;
    updatedName: string;
  }) {
    const foundFolder = this.folders.find((folder) => folder.id === folderId);
    if (foundFolder) {
      foundFolder.name = updatedName;
    }

    this.syncToStorage();
  }

  addImage(image: Image) {
    this.images.push(image);
    this.syncToStorage();
  }

  moveTo({ folderId, imageId }: { folderId: string; imageId: string }) {
    this.images.find((image) => image.id === imageId)!.folderId = folderId;
    this.syncToStorage();
  }

  setCurrentFolderId(folderId: Folder["id"]) {
    this.currentFolderId = folderId;
  }

  // Due to lack of time, had to sync to storage non-granularly
  // with more time, would do it more granularly though.
  syncToStorage() {
    setInStorage(storageKeys.FOLDERS, this.folders);
    setInStorage(storageKeys.IMAGES, this.images);
  }
}

const StoreContext = createContext<AppStore | null>(null);

export const AppStoreProvider = ({
  children,
  store,
}: {
  children: React.ReactNode;
  store: AppStore;
}): JSX.Element => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useAppStore = () => {
  return useContext(StoreContext) as AppStore;
};
