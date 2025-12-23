import {
  Component,
  signal,
  computed,
  effect,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { Student } from '../../models/student.model';
import { StudentCardComponent } from '../student-card/student-card.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, StudentCardComponent, WidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('nameInput') nameInputRef!: ElementRef;

  students = signal<Student[]>([
    { id: 1, name: 'Alice', major: 'CS', gpa: 3.8, status: 'Active', attendance: 90 },
    { id: 2, name: 'Bob', major: 'Math', gpa: 1.8, status: 'Probation', attendance: 60 },
  ]);

  newName = '';
  pollingId: any;

  totatStudents = computed(() => this.students().length);
  averageGpa = computed(() => {
    const list = this.students();
    return list.length ? (list.reduce((a, b) => a + b.gpa, 0) / list.length).toFixed(2) : '0';
  });

  constructor() {
    effect(() => {
      console.log(`[Effect] Student Count is now: ${this.totatStudents()}`);
    });
  }

  ngOnInit() {
    console.log('1. ngOnInit: Starting Polling...');
    this.pollingId = setInterval(() => {
      this.randomizeAttendance();
    }, 5000);
  }

  ngAfterViewInit() {
    console.log('2. ngAfterViewInit: Focusing input...');
    this.nameInputRef.nativeElement.focus();
  }

  ngOnDestroy() {
    console.log('3. ngOnDestroy: Cleaning up...');
    if (this.pollingId) clearInterval(this.pollingId);
  }

  addStudent() {
    if (!this.newName) return;
    const newS: Student = {
      id: Date.now(),
      name: this.newName,
      major: 'General',
      gpa: 3.0,
      status: 'Active',
      attendance: 100,
    };
    this.students.update((prev) => [...prev, newS]);
    this.newName = '';
  }

  removeStudent(id: number) {
    this.students.update((prev) => prev.filter((s) => s.id !== id));
  }

  randomizeAttendance() {
    // Updates the signal immutably, triggering the UI to refresh
    this.students.update((list) =>
      list.map((s) => ({
        ...s,
        attendance: Math.min(100, Math.max(0, s.attendance + (Math.random() > 0.5 ? 5 : -5))),
      }))
    );
  }
}
