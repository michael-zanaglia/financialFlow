import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
    id?: number;
    email?: string;
    firstname?: string;
    name?: string;
    profile_photo_url?: string;
    profile_photo_path?: string;
    solde?: string;
    friends?: Friends[];
    csrfToken?: string;
}

export interface Friends {
    id: number;
    email: string;
    firstname: string;
    name: string;
    profile_photo_url: string;
    solde: string;
}

type UserStore = {
    user: User | null;
    setUser: (newUser : User | null) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set)=>({
            user: null,
            setUser: (newUser)=>set({user: newUser}),
        }),
        {
            name: "user-storage",
        }
    )
    
)
