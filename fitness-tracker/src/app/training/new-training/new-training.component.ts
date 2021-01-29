import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from "../training.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Exercise } from "../exercise.module";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  // console = console;

  exercises: Observable<any> = new Observable<any>();

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {

  }

  ngOnInit(): void {
    if(this.exercises){
      this.exercises = this.db
          .collection("availableExercises")
          .valueChanges();
    }
  }

  onStartTraining(form: NgForm) {
    //THis is the name in the NgModel
    this.trainingService.startExercise(form.value.exercise)
  }
}
