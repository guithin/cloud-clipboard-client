declare module 'process' {
  global {
    interface ImportMetaEnv {
      VITE_APP_BASE_URL: string;
      [key: string]: string;
    }
  }
}
