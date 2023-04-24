export interface IData {
  statusCode: number | null,
  executionTime: number,
  executionTimeTag: string,
  createdAt: number,
}

export interface IStats {
  data: IData[],
  status: number,
}
