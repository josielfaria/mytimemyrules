import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/shared/services/control.service';

@Component({
  selector: 'app-visual-metronome',
  templateUrl: './visual-metronome.component.html',
  styleUrls: ['./visual-metronome.component.scss'],
})
export class VisualMetronomeComponent implements OnInit {
  constructor(private controlService: ControlService) {}

  beatTick: number = 0;
  offBeatTick: number = 0;

  ngOnInit(): void {
    this.controlService.beat$.subscribe((numberBeat) => {
      this.beatTick = numberBeat;
    });
  }
}
