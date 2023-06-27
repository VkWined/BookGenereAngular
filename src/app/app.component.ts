import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedTabIndex = 0;
  isLoggedIn = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index === 1 || event.index === 2) {
      if (!this.isLoggedIn) {
        this.selectedTabIndex = 0;
      }
    }
  }
}
