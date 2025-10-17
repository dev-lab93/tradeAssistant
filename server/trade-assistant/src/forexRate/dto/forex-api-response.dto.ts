export interface ForexApiResponse {
  base: string;
  rates: Record<string, number>;
  date?: string; // ако API-то враќа date
}
