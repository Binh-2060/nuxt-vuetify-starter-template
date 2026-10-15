```ts
export interface ApiResponse<T> {
  timestamp: string;      // "2006-01-02-15-04-05" layout, server local time
  status: 1 | 0;          // 1 = success, 0 = error
  items: T | null;        // payload; null on error
  error: string | null;   // message on error; null on success
}

interface Paginated<T> {
  listData: T[];          // never null; empty = []
  pagination: {
    currentPage: number;
    currentPageTotalItem: number;
    totalPage: number;    // all three are -1 when the endpoint doesn't paginate
  };
}
```