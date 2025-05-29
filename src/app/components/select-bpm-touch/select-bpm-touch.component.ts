import { Component } from '@angular/core';
import { SelectBpmTouchService } from 'src/app/shared/services/select-bpm-touch.service';

@Component({
  selector: 'app-select-bpm-touch',
  templateUrl: './select-bpm-touch.component.html',
  styleUrls: ['./select-bpm-touch.component.scss'],
})
export class SelectBpmTouchComponent {
  isTouched = false;

  constructor(private selectBpmTouchService: SelectBpmTouchService) {}

  onTapBpm(): void {
    this.isTouched = true;
    this.selectBpmTouchService.registerTap();
    this.startHideTouchTimeout();
  }

  startHideTouchTimeout(): void {
    setTimeout(() => {
      this.isTouched = false;
    }, 100);
  }
}
