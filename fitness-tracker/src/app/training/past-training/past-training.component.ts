import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Exercise } from "../exercise.module";
import { TrainingService } from "../training.service";


@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  //This names should match the names of table rows in the html file.
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  //Automatically assumed Exercies list
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }



}
