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
  type MessageStatus = 'Intelligent';
}