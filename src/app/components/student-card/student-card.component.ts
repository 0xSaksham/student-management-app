import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class StudentCardComponent {
  student = input.required<Student>();

  onRemove = output<number>();

  isProbation = computed(() => this.student().status === 'Probation');

  gpaColor = computed(() => {
    const gpa = this.student().gpa;
    return gpa >= 3.5 ? 'green' : gpa < 2.0 ? 'red' : 'black';
  });
}
