import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = 'https://test-zustand-default-rtdb.firebaseio.com/zustand';

const storeApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json());
            return JSON.stringify(data);
        } catch (error) {
            console.log(error);
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        await fetch(`${firebaseUrl}/${name}.json`,{
            method: 'PUT',
            body: value,
        }).then(res => res.json());
        return;
    },
    removeItem: function (name: string): void {
        sessionStorage.removeItem(name);
    }
}

export const firebaseStorage = createJSONStorage(() => storeApi);