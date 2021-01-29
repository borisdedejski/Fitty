import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Exercise } from "../exercise.module";
import { TrainingService } from "../training.service";
import { MatSort } from "@angular/material/sort"
import { MatPaginator } from "@angular/material/paginator";

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
  //Use Material UI table & Material UI Paginatior
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  //Init Paginators & Tables
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
