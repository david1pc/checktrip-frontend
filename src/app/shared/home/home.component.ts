import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username!: string;
  ngOnInit() {
    this.username = '';
    this.username = sessionStorage.getItem('username') ?? '';
  }
}
