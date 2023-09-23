declare module 'process' {
  global {
    interface ImportMetaEnv {
      [key: string]: string;
    }
  }
}
