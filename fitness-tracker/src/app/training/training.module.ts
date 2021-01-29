import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingComponent} from "./past-training/past-training.component";
import {StopTrainingComponent} from "./current-training/stop-training.component";
import {MaterialModule} from "../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {TrainingRoutingModule} from "./training-routing.module";


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule
    ],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule{}
