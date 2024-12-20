import { User } from "./store/useUserStore"
import Echo from "laravel-echo";
import Pusher from "pusher-js";

export interface Auth {
    user: User;
}

declare global {
    interface window {
        Pusher : typeof Pusher;
        Echo : typeof Echo;
    }
  }