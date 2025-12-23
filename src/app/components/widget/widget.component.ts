import { AfterContentInit, Component, ContentChild, ElementRef, signal } from '@angular/core';

@Component({
  selector: 'app-widget',
  imports: [],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  standalone: true,
})
export class WidgetComponent implements AfterContentInit {
  @ContentChild('cardTitle') titleRef!: ElementRef;

  statusMsg = signal('');

  ngAfterContentInit(): void {
    if (this.titleRef) {
      this.statusMsg.set('(Custom Title Detected ✔)');
    }
  }
}
