/* excel 밀리초 날짜 변환 */
export function excelNumericToDate(excelDate: number): Date {
  // Excel date starts from January 1, 1900
  const excelStartDate = new Date("1899-12-31T00:00:00Z");

  // Calculate milliseconds from the start date
  const milliseconds =
    excelStartDate.getTime() + excelDate * 24 * 60 * 60 * 1000;

  return new Date(milliseconds);
}
