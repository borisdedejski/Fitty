import {Subject} from "rxjs";
import {Exercise} from "./exercise.module";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import { Subscription } from "rxjs";
import {UIService} from "../shared/ui.service";

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private EMPTY_EXERCISE = {id: '', name: '', duration: 0, calories: 0};
    private runningExercise: Exercise | undefined = this.EMPTY_EXERCISE;
    private exercises: Exercise[] = [this.EMPTY_EXERCISE];
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService) {}

    fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs.push(this.db
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
                this.uiService.loadingStateChanged.next(false);
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            }, error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackbar('Fetching Exercises failed, please try again', null, 3000);
                this.exercisesChanged.next(undefined);
            }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    startExercise(selectedId: any) {
        // Ex. select the last document
        // this.db.doc('availableExercises/' + selectedId.id).update({lastSelected: new Date()})
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        if (this.runningExercise) {
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
        if (this.runningExercise) {
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
        return {...this.runningExercise};
    }

    fetchCompletedOrCancelledExercises() {
        this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: any) => {
                this.finishedExercisesChanged.next(exercises);
            });
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

}
