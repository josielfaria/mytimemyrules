import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ControlService } from './control.service';

@Injectable({ providedIn: 'root' })
export class SelectBpmTouchService {
  constructor(private controlService: ControlService) {}

  private tapTimes: number[] = [];
  private tapTimeout: any = null;

  registerTap() {
    this.controlService.stopMetronome();
    this.controlService.toggleMetronome();

    const now = Date.now();

    // Limpa taps antigos (após 2 segundos sem tap, reinicia)
    if (
      this.tapTimes.length > 0 &&
      now - this.tapTimes[this.tapTimes.length - 1] > 2000
    ) {
      this.tapTimes = [];
    }

    this.tapTimes.push(now);

    // Mantém apenas os últimos 8 taps
    if (this.tapTimes.length > 8) {
      this.tapTimes.shift();
    }

    if (this.tapTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < this.tapTimes.length; i++) {
        intervals.push(this.tapTimes[i] - this.tapTimes[i - 1]);
      }
      const avgInterval =
        intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const bpm = Math.round(60000 / avgInterval);
      this.controlService.setBPM(bpm);
    }

    // Limpa taps se não clicar novamente em 2 segundos
    if (this.tapTimeout) clearTimeout(this.tapTimeout);
    this.tapTimeout = setTimeout(() => {
      this.tapTimes = [];
    }, 2000);
  }
}
