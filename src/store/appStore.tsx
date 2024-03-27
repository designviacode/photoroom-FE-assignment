/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { nanoid } from "nanoid";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { getJSONFromStorage, storageKeys } from "../utils/storage";

export const DEFAULT_FOLDER_NAME = "Untitled Folder";
export const DEFAULT_FOLDER_ID = "DEFAULT_FOLDER_ABC";

export type File = { imagePath: string; caption?: string; id: string };
export type Folder = { name: string; id: string };

export class AppStore {
  folders: Folder[] = [{ name: DEFAULT_FOLDER_NAME, id: DEFAULT_FOLDER_ID }];

  constructor() {
    makeAutoObservable(this, {
      folders: observable,
      makeNewFolder: action,
      renameFolder: action,
      totalFoldersCount: computed,
    });

    this.getFoldersFromStorage();
  }

  get totalFoldersCount() {
    return this.folders?.length;
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

  async makeNewFolder(name: string) {
    this.folders.push({ name, id: nanoid() });
  }

  async renameFolder({
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
