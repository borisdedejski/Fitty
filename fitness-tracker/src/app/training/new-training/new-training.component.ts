import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { TrainingService } from "../training.service";
import {AngularFirestore, QueryDocumentSnapshot} from "@angular/fire/firestore";
import { Exercise } from "../exercise.module";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] | undefined;
  exerciseSubscription: Subscription = new Subscription();
  // console = console;


  constructor(private trainingService: TrainingService, private db: AngularFirestore) {

  }

  ngOnInit(): void {
    //Subscribe first to get the,
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    //THis is the name in the NgModel
    this.trainingService.startExercise(form.value.exercise)
  }
}
