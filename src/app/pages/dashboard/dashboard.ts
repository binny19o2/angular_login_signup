import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  studentsList: Student[] = [];
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';
  isEditMode: boolean = false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  // ✅ Fetch all students
  getAllStudents() {
    this.data.getAllStudents().subscribe({
      next: (res) => {
        this.studentsList = res;
        console.log('Fetched students:', this.studentsList);
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      },
    });
  }

  // ✅ Add or Update student
  addStudent() {
    if (!this.firstName || !this.lastName || !this.email || !this.mobile) {
      alert('Please fill all fields');
      return;
    }

    const newStudent: Student = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobile: this.mobile,
    };

    if (this.isEditMode) {
      this.data
        .updStudent(newStudent)
        .then(() => {
          alert('Student updated successfully');
          this.resetForm();
        })
        .catch((err) => console.error('Update failed:', err));
    } else {
      this.data
        .addStudent(newStudent)
        .then(() => {
          alert('Student added successfully');
          this.resetForm();
        })
        .catch((err) => console.error('Add failed:', err));
    }
  }

  // ✅ Load form with student data for edit
  updStudent(student: Student) {
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
    this.mobile = student.mobile;
    this.isEditMode = true;
  }

  // ✅ Delete student
  delStudent(student: Student) {
    if (window.confirm('Are you sure you want to delete this student?')) {
      this.data
        .delStudent(student)
        .then(() => alert('Student deleted successfully'))
        .catch((err) => console.error('Delete failed:', err));
    }
  }
  resetForm() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.mobile = '';
    this.isEditMode = false;
  }
}
