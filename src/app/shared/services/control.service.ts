import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ControlService {
  private bpm: number = 70; // Default BPM
  private slideRangerBpm: number = 10; // Default step for slide ranger
  private controlButtonsBpm: number = 10; // Default step for control buttons

  private bpmSubject = new BehaviorSubject<number>(this.bpm);
  bpm$ = this.bpmSubject.asObservable();

  private slideRangerBpmSubject = new BehaviorSubject<number>(this.bpm);
  slideRangerBpm$ = this.slideRangerBpmSubject.asObservable();

  private metronomeStoppedSubject = new Subject<boolean>();
  metronomeStopped$ = this.metronomeStoppedSubject.asObservable();

  private metronomeInterval: any = null;
  private metronomeSubject = new Subject<void>();
  metronome$ = this.metronomeSubject.asObservable();

  private beatSubject = new Subject<number>();
  beat$ = this.beatSubject.asObservable();

  private audioCtx: AudioContext | null = null;
  private tickBuffer: AudioBuffer | null = null;

  private beatCount: number = 0;
  private beatsPerBar: number = 4; // Dividir por 4

  private accentBuffer: AudioBuffer | null = null;

  constructor(private storageService: StorageService) {
    this.loadSettings();
  }

  loadSettings(): void {
    this.bpm = Number(this.storageService.getItem('initialBpm')) || 70;

    this.slideRangerBpm =
      Number(this.storageService.getItem('slideRangerBpm')) || 10;

    this.controlButtonsBpm =
      Number(this.storageService.getItem('controlButtonsBpm')) || 10;

    this.bpmSubject.next(this.bpm);
    this.slideRangerBpmSubject.next(this.slideRangerBpm);
  }

  async startAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
  }

  async increaseBpm() {
    this.bpm += this.controlButtonsBpm;
    this.bpmSubject.next(this.bpm);
    if (this.metronomeInterval) {
      await this.startMetronome();
    }
  }

  async decreaseBpm() {
    if (this.bpm > this.controlButtonsBpm) {
      this.bpm -= this.controlButtonsBpm;
      this.bpmSubject.next(this.bpm);
      if (this.metronomeInterval) {
        await this.startMetronome();
      }
    }
  }

  async loadTickSound() {
    if (!this.audioCtx) await this.startAudio();
    if (!this.audioCtx) return;
    if (this.tickBuffer) return;

    const response = await fetch('assets/sounds/tick2.wav');
    const arrayBuffer = await response.arrayBuffer();
    this.tickBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
  }

  private async playClick(accent: boolean = false) {
    await this.startAudio();
    if (!this.audioCtx) return;

    // Carrega o som normal
    if (!this.tickBuffer) await this.loadTickSound();
    if (!this.tickBuffer || !this.audioCtx) return;

    let bufferToPlay = this.tickBuffer;

    // Se for acento, carrega e usa o tick1.wav
    if (accent) {
      if (!this.accentBuffer) {
        const response = await fetch('assets/sounds/tick1.wav');
        const arrayBuffer = await response.arrayBuffer();
        this.accentBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
      }
      bufferToPlay = this.accentBuffer;
    }

    const source = this.audioCtx.createBufferSource();
    source.buffer = bufferToPlay;
    source.connect(this.audioCtx.destination);
    source.start();
    source.onended = () => {
      source.disconnect();
    };
  }

  async startMetronome() {
    this.stopMetronome();
    await this.startAudio();
    this.beatCount = 0;

    const intervalMs = 60000 / this.bpm;

    // Primeira batida (acentuada)
    this.beatCount = (this.beatCount % this.beatsPerBar) + 1;
    this.playClick(true);
    this.beatSubject.next(this.beatCount);

    this.metronomeInterval = setInterval(() => {
      this.metronomeSubject.next();

      this.beatCount = (this.beatCount % this.beatsPerBar) + 1;
      this.playClick(this.beatCount === 1);
      this.beatSubject.next(this.beatCount);
    }, intervalMs);
  }

  stopMetronome() {
    if (this.metronomeInterval) {
      clearInterval(this.metronomeInterval);
      this.metronomeInterval = null;
    }
  }

  async toggleMetronome() {
    this.metronomeStoppedSubject.next(false);
  }

  async setBPM(bpm: number) {
    this.bpm = bpm;
    this.bpmSubject.next(this.bpm);
    if (this.metronomeInterval) {
      await this.startMetronome();
    }
  }
}
