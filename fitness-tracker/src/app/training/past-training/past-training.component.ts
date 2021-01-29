import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Exercise } from "../exercise.module";
import { TrainingService } from "../training.service";
import { MatSort } from "@angular/material/sort"

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  //This names should match the names of table rows in the html file.
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  //Automatically assumed Exercies list
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


}
