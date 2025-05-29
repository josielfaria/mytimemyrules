import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { ConfigPage } from './pages/config/config.page';
import { SelectBpmComponent } from './components/select-bpm/select-bpm.component';
import { ControlComponent } from './components/control/control.component';
import { VolumeComponent } from './components/volume/volume.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { VisualMetronomeComponent } from './components/visual-metronome/visual-metronome.component';
import { SelectBpmTouchComponent } from './components/select-bpm-touch/select-bpm-touch.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    ConfigPage,
    SelectBpmComponent,
    ControlComponent,
    VolumeComponent,
    VisualMetronomeComponent,
    SelectBpmTouchComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
