import { Component, OnInit, Output } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";

import { StopTrainingComponent } from "./stop-training.component";
import { TrainingService } from "../training.service";

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
    progress = 0;
    timer: number;

    constructor(private dialog: MatDialog, private trainingService: TrainingService) {
        this.timer = 0;
    }

    ngOnInit(): void {
        this.startOrResumeTimer();
    }

    startOrResumeTimer() {
        const step = (this.trainingService.getRunningExercise().duration / 100 * 1000);
        this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
        }
      }, step);
    }

    onStop() {
        clearInterval(this.timer);
        const dialogRef = this.dialog.open(StopTrainingComponent, {
            data: {
                progress: this.progress
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
              this.trainingService.cancelExercise(this.progress);
            }
            else {
              this.startOrResumeTimer();
            }
        });
    }
}
