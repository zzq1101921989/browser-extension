declare namespace AppContextType {
  type Config = {
    autoScroll: boolean;
    delay: number;
  };
  type Selector = {
    id: string;
    name: string;
    value: string;
  };
  type ExportFormat = 'json' | 'csv';
  type CrawlStatus = 'idle' | 'crawling' | 'completed'
}

declare namespace App {
  type MessageStatus = 'Intelligent' | 'CreateRule';
}

// declarations.d.ts 或者 types/css-modules.d.ts
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}