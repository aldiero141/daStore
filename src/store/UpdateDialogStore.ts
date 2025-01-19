import { create } from 'zustand'

interface IUpdateDialogStore {
    dialogName: string;
    isOpen: boolean;
    dialogData: string;
    setOpenDialog: (dialogState: boolean) => void;
    setDialogName: (name: string) => void;
    setDialogData: (data: string) => void;
}


export const UpdateDialogStore = create<IUpdateDialogStore>((set) => ({
    dialogName: '',
    isOpen: false,
    dialogData: '',
    setOpenDialog: (dialogState: boolean) => set({ isOpen: dialogState }),
    setDialogName: (name: string) => set({ dialogName: name }),
    setDialogData: (data: string) => set({ dialogData: data }),
}))

