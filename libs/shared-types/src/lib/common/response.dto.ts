export class GenericResponse<T> {
  success: boolean;
  message?: string;
  data: T;

  constructor(data: T, message?: string) {
    this.success = true;
    this.data = data;
    this.message = message;
  }
}

export class PaginatedResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };

  constructor(data: T[], total: number, page: number, pageSize: number, message?: string) {
    this.success = true;
    this.data = data;
    this.meta = { total, page, pageSize };
    this.message = message;
  }
}
