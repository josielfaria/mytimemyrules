import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ControlService {
  constructor() {}

  private bpm: number = 70; // Default BPM

  private bpmSubject = new Subject<number>();
  bpm$ = this.bpmSubject.asObservable();

  private metronomeInterval: any = null;
  private metronomeSubject = new Subject<void>();
  metronome$ = this.metronomeSubject.asObservable();

  private beatSubject = new Subject<number>();
  beat$ = this.beatSubject.asObservable();

  private audioCtx: AudioContext | null = null;
  private tickBuffer: AudioBuffer | null = null;

  private beatCount: number = 0;
  private beatsPerBar: number = 4; // Dividir por 4

  async startAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
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

  // Adicione esta propriedade na sua classe:
  private accentBuffer: AudioBuffer | null = null;

  // Modifique o startMetronome:
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

  async setBPM(bpm: number) {
    this.bpm = bpm;
    this.bpmSubject.next(this.bpm);
    if (this.metronomeInterval) {
      await this.startMetronome();
    }
  }
}
