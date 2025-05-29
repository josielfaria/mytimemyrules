import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlService } from 'src/app/shared/services/control.service';

@Component({
  selector: 'app-select-bpm',
  templateUrl: './select-bpm.component.html',
  styleUrls: ['./select-bpm.component.scss'],
})
export class SelectBpmComponent implements OnInit {
  bpm: number = 55;
  slideRangerBpm: number = 1;

  constructor(private controlService: ControlService) {}

  ngOnInit(): void {
    this.controlService.bpm$.subscribe((bpm) => {
      this.bpm = bpm;
    });

    this.controlService.slideRangerBpm$.subscribe((slideRangerBpm) => {
      this.slideRangerBpm = slideRangerBpm;
    });

    this.controlService.loadSettings();
  }

  setBPM(bpm: number) {
    this.controlService.setBPM(bpm);
  }
}
