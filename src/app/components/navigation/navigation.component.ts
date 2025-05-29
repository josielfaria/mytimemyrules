import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(private router: Router) {}

  pathFocus: string = 'home';

  nagivateTo(path: string): void {
    this.pathFocus = path;

    this.router.navigate([path]).then((success) => {
      if (success) {
        console.log(`Navigation to ${path} was successful`);
      } else {
        console.error(`Navigation to ${path} failed`);
      }
    });
  }
}
