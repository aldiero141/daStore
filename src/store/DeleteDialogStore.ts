import { create } from 'zustand'

interface IDeleteDialogStore {
    dialogName: string;
    isOpen: boolean;
    dialogData: string;
    setOpenDialog: (dialogState: boolean) => void;
    setDialogName: (name: string) => void;
    setDialogData: (data: string) => void;
}


export const DeleteDialogStore = create<IDeleteDialogStore>((set) => ({
    dialogName: '',
    isOpen: false,
    dialogData: '',
    setOpenDialog: (dialogState: boolean) => set({ isOpen: dialogState }),
    setDialogName: (name: string) => set({ dialogName: name }),
    setDialogData: (data: string) => set({ dialogData: data }),
}))

