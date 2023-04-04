export {};

export type GoogleAnalitycsCommands = 'config' | 'get' | 'set' | 'event' | 'consent';

declare global {
  interface Window {
    gtag: (command: GoogleAnalitycsCommands, target: any, data?: Object, callback?: (field: any) => {}) => void
  }
}