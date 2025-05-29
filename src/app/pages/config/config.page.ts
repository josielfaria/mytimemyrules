import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/shared/services/control.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  initialBpm: number = 70;
  stepSlideRangerBpm: number = 10;
  stepControlButtonsBpm: number = 10;

  constructor(private storageService: StorageService, private controlService: ControlService) {}

  ngOnInit(): void {
    const storedInitialBpm = this.storageService.getItem('initialBpm');
    const storedStepSlideRangerBpm = this.storageService.getItem('slideRangerBpm');
    const storedStepControlButtonsBpm = this.storageService.getItem('controlButtonsBpm');

    if (storedStepSlideRangerBpm) {
      this.stepSlideRangerBpm = parseInt(storedStepSlideRangerBpm, 10);
    }

    if (storedStepControlButtonsBpm) {
      this.stepControlButtonsBpm = parseInt(storedStepControlButtonsBpm, 10);
    }

    if (storedInitialBpm) {
      this.initialBpm = parseInt(storedInitialBpm, 10);
      this.controlService.setBPM(this.initialBpm);
    }
  }

  selectInitialBpm(value: number): void {
    this.initialBpm = value;
    this.storageService.setItem('initialBpm', String(value));
  }

  selectIncreaseDecreaseSlideRangerBpm(step: number): void {
    this.stepSlideRangerBpm = step;
    this.storageService.setItem('slideRangerBpm', String(step));
  }

  selectIncreaseDecreaseControlButtonsBpm(step: number): void {
    this.stepControlButtonsBpm = step;
    this.storageService.setItem('controlButtonsBpm', String(step));
  }
}
