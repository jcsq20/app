export class CustomInput extends HTMLInputElement {
  // eslint-disable-next-line class-methods-use-this
  private dateValidation(val: any) {
    let prevVal = val || undefined;
    if (val && !(val instanceof Date)) {
      const date = new Date(val);
      if (Number.isNaN(date.getTime())) {
        prevVal = undefined;
      } else {
        prevVal = date;
      }
    }
    return prevVal as Date | undefined;
  }

  public get minAsDate() {
    return (this.dateValidation(this.min) as Date) || undefined;
  }

  public get maxAsDate() {
    return (this.dateValidation(this.max) as Date) || undefined;
  }

  public get valueAsDate() {
    return this.dateValidation(this.value) || null;
  }

  public set valueAsDate(date: Date | null) {
    this.value = date ? date.toISOString() : '';
  }

  public get valueAsNumber() {
    return this.dateValidation(this.value)?.getTime() || NaN;
  }

  public set valueAsNumber(number: number) {
    this.value = number ? this.dateValidation(number)?.toISOString() || '' : '';
  }
}
