import {Injectable} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateFormatter extends NgbDateParserFormatter {
  // Display format: dd-MM-yy
  format(date: NgbDateStruct | null): string {
    if (!date || !this.isValidStruct(date)) return '';
    const day = String(date.day).padStart(2, '0');
    const month = String(date.month).padStart(2, '0');
    const year2 = String(date.year % 100).padStart(2, '0'); // 2-digit year
    return `${day}-${month}-${year2}`;
  }

  // Input parsing: accepts dd-MM-yy (and tolerant to dd/MM/yy or dd.MM.yy)
  parse(value: string | null): NgbDateStruct | null {
    if (!value) return null;

    const cleaned = value.trim();
    if (!cleaned) return null;

    // Normalize common separators to '-'
    const norm = cleaned.replace(/[\/.]/g, '-');
    const parts = norm.split('-');
    if (parts.length !== 3) return null;

    const [ds, ms, ys] = parts.map(s => s.trim());
    const day = Number(ds);
    const month = Number(ms);
    const yy = Number(ys);

    if ([day, month, yy].some(n => Number.isNaN(n))) return null;
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    // map 00..99 -> 2000..2099 (keeps your backend logic intact)
    const year = yy < 100 ? 2000 + yy : yy;

    // final day check with actual month length (incl. leap years)
    const dim = this.daysInMonth(year, month);
    if (day > dim) return null;

    return {day, month, year};
  }

  // --- helpers ---
  private isValidStruct(d: NgbDateStruct): boolean {
    if (!d) return false;
    if ([d.day, d.month, d.year].some(n => typeof n !== 'number' || !Number.isFinite(n))) return false;
    if (d.month < 1 || d.month > 12) return false;
    if (d.day < 1 || d.day > this.daysInMonth(d.year, d.month)) return false;
    return true;
  }

  private daysInMonth(year: number, month1to12: number): number {
    return new Date(year, month1to12, 0).getDate(); // JS month is 1-based when day=0 trick
  }
}
