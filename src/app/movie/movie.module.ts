import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltip } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";

import { MovieRoutingModule } from "./movie-routing.module";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MovieComponent } from "./movie/movie.component";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { AddEditFormComponent } from "./forms/add-edit-form/add-edit-form.component";
import { DialogComponent } from "../shared/dialog/dialog.component";
import {OrderByPipe} from "../shared/pipes/order-by.pipe";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        MovieListComponent,
        MovieDetailComponent,
        MovieComponent,
        AddMovieComponent,
    ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    LoadingSpinnerComponent,
    AddEditFormComponent,
    DialogComponent,
    MatTooltip,
    OrderByPipe,
    MatSelectModule
  ],
    exports: [
        AddMovieComponent
  ],
  // providers: [Dial]
})
export class MovieModule {}
