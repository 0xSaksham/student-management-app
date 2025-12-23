import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  post = signal<any>(null);
  comments = signal<any[]>([]);
  timestamp = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.timestamp.set(this.route.snapshot.queryParamMap.get('viewedAt'));

    if (id) {
      this.api.getPostById(id).subscribe((data) => this.post.set(data));
      this.api.getCommentsByPost(id).subscribe((data) => this.comments.set(data));
    }
  }
}
