interface ImportMetaEnv {
  /** Analytics script URL, e.g. https://analytics.example.com/js/script.js */
  readonly PUBLIC_ANALYTICS_SRC?: string;
  /** Value for the script's data-domain, e.g. example.com */
  readonly PUBLIC_ANALYTICS_DOMAIN?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
