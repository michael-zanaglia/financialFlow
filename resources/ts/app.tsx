import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defineConfig, defaultConfig, mergeConfigs } from '@chakra-ui/react'
import { Toaster } from '../../src/components/ui/toaster'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
      Pusher: typeof Pusher;
      Echo: Echo<'pusher'>;
  }
}

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    cluster: 'eu',
    enabledTransports: ['ws', 'wss'],
});


const customConfig = defineConfig({
  globalCss: {
    "*": {
      margin: "0",
      fontFamily: 'Nunito, serif'
    },
  },
  theme: {
    tokens: {
      colors: {
        deepViolet:{ value: '#906a9b' },
        white: {value: '#fbfbfd'},
        softBlack: { value: '#292929'}
      },
      fonts:{
        heading: {value: 'Nunito, serif'},
        body: {value: 'Nunito, serif'},
      },
    },
  }
})
const configs= mergeConfigs(defaultConfig, customConfig)
const system = createSystem(configs)

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    return pages[`./Pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ChakraProvider value={system}>
            <Toaster />
            <App {...props} />
      </ChakraProvider>
    )
  },
})