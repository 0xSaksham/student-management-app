import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // Import these

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Add them here
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
