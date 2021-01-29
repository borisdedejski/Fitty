import { Subject } from "rxjs";
import { Exercise } from "./exercise.module";
import {map} from "rxjs/operators";
import { Injectable } from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>() ;
    exercisesChanged = new Subject<Exercise[]>() ;

    private availableExercises: Exercise[] = [];
    private EMPTY_EXERCISE = { id: '', name: '', duration: 0, calories: 0};
    private runningExercise: Exercise | undefined = this.EMPTY_EXERCISE;
    private exercises: Exercise[] = [this.EMPTY_EXERCISE];

    constructor(private db: AngularFirestore) {}

    fetchAvailableExercises() {
       this.db
            .collection("availableExercises")
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map((doc: any) => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data().name,
                        duration: doc.payload.doc.data().duration,
                        calories: doc.payload.doc.data().calories
                    };
                });
            }))
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            });
    }

    startExercise(selectedId: any){
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        if(this.runningExercise) {
            this.exerciseChanged.next({...this.runningExercise});
        }
    }

    completeExercise() {
        if (this.runningExercise) {
            this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        }
        this.runningExercise = this.EMPTY_EXERCISE;
        this.exerciseChanged.next();
    }

    cancelExercise(progress: number) {
        if(this.runningExercise){
            this.addDataToDatabase({
                ...this.runningExercise,
                duration: this.runningExercise.duration * (progress / 100),
                calories: this.runningExercise.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
        }
        this.runningExercise = this.EMPTY_EXERCISE;
        this.exerciseChanged.next();
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }

    private addDataToDatabase(exercise: Exercise) {
        console.log(exercise)
        this.db
            .collection('finishedExercises')
            .add(exercise);
    }

}
