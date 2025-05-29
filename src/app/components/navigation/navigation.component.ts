import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlService } from 'src/app/shared/services/control.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, private controlService: ControlService) {}

  pathFocus: string = '';

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.pathFocus = this.router.url.replace('/', '');
    });
  }

  nagivateTo(path: string): void {
    this.pathFocus = path;

    if (path !== 'home') {
      this.controlService.stopMetronome();
    }

    this.router.navigate([path]).then((success) => {});
  }
}
