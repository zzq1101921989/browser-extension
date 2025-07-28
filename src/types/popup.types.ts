// src/types.ts
export type ExportFormat = 'json' | 'csv';
export type CrawlStatus = 'idle' | 'crawling' | 'completed' | 'error';

export interface Selector {
  id: string;
  name: string;
  value: string;
}

export interface Config {
  autoScroll: boolean;
  delay: number;
}