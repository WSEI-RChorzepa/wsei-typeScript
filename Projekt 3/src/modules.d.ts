declare module "*.html" {
  const content: string;
  export default content;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      OPENWEATHER_API_KEY: string;
    }
  }
}
