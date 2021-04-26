export interface IDateProvider {
  convertToUtc(date: Date): string
  compareInHours(start_date: Date, end_date: Date): number
  dateNow(): Date
  compareInDays(start_date: Date, end_date: Date): number
  addDays(day: number): Date
  addHours(hour: number): Date
  isBefore(start_date: Date, end_date: Date): boolean
}
