export interface IDateProvider {
  convertToUtc(date: Date): string
  compareInHours(start_date: Date, end_date: Date): number
  dateNow(): Date
}
