import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/shared/services/control.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  toggle = false;

  constructor(private controlService: ControlService) {}

  ngOnInit(): void {
    this.controlService.metronomeStopped$.subscribe((stopped) => {
      this.toggle = stopped;
    });
  }

  private startMetronome(): void {
    this.controlService.startMetronome();
  }

  private stopMetronome(): void {
    this.controlService.stopMetronome();
  }

  togglePlay(): void {
    this.toggle ? this.stopMetronome() : this.startMetronome();
    this.toggle = !this.toggle;
  }

  decreaseBpm(): void {
    this.controlService.decreaseBpm();
  }

  increaseBpm(): void {
    this.controlService.increaseBpm();
  }
}
