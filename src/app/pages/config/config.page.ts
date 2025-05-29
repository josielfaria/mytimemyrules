import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  stepSlideRangerBpm: number = 10;
  stepControlButtonsBpm: number = 10;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const storedStepSlideRangerBpm = this.storageService.getItem('slideRangerBpm');
    const storedStepControlButtonsBpm = this.storageService.getItem('controlButtonsBpm');

    if (storedStepSlideRangerBpm) {
      this.stepSlideRangerBpm = parseInt(storedStepSlideRangerBpm, 10);
    }

    if (storedStepControlButtonsBpm) {
      this.stepControlButtonsBpm = parseInt(storedStepControlButtonsBpm, 10);
    }
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
