import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, setDoc,updateDoc } from '@angular/fire/firestore';
import { Student } from '../model/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // constructor(private afs: AngularFirestore) { }

  // addStudent(student: Student){
  //   student.id = this.afs.createId();
  //   return this.afs.collection('/Students').add(student);
  // }

  // getAllStudents(){
  //   return this.afs.collection('/Students').snapshotChanges();
  // }

  // delStudent(student: Student){
  //   return this.afs.doc('/Students/'+student.id).delete();
  // }

  // updStudent(student: Student){
  //   this.delStudent(student);
  //   this.addStudent(student); 
  // }

  constructor(private firestore: Firestore) {}

  addStudent(student: Student) {
    const studentsRef = collection(this.firestore, 'Students');
    return addDoc(studentsRef, student);
  }

  getAllStudents(): Observable<Student[]> {
    const studentsRef = collection(this.firestore, 'Students');
    return collectionData(studentsRef, { idField: 'id' }) as Observable<Student[]>;
  }

  delStudent(student: Student) {
    const studentDocRef = doc(this.firestore, `Students/${student.id}`);
    return deleteDoc(studentDocRef);
  }

  updStudent(student: Student) {
    const studentDocRef = doc(this.firestore, `Students/${student.id}`);
    const { id, ...data } = student;
    return updateDoc(studentDocRef, data);
  }
}
