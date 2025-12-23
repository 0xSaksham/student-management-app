import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  posts = signal<any[]>([]);

  ngOnInit() {
    this.api.getPosts().subscribe((data) => this.posts.set(data));
  }

  goToDetail(id: number) {
    this.router.navigate(['/posts', id], { queryParams: { viewedAt: new Date().getTime() } });
  }
}
