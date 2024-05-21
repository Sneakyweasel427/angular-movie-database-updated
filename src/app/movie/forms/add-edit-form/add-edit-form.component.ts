import {Component, inject, Input, OnInit} from '@angular/core';
import {ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {lastValueFrom} from "rxjs";
import {Movie} from "../../models/movie.model";
import {Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-add-edit-form',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss'
})
export class AddEditFormComponent implements OnInit {
  private router = inject(Router);
  // private dialogRef = inject(MatDialogRef<AddMovieComponent>);
  // public modalData: ModalData = inject(MAT_DIALOG_DATA);
  private movieService = inject(MovieService);
  @Input() movie?: Movie;

  movieForm = new UntypedFormGroup({
    name: new UntypedFormControl("", [Validators.required]),
    image: new UntypedFormControl("", [Validators.required]),
    genre: new UntypedFormControl("", [Validators.required]),
    releaseYear: new UntypedFormControl("", [Validators.required]),
  });

  errorMessage: string;
  recentlyAdded: Movie[] = [];

  ngOnInit() {
    if (this.movie) {
      this.movieForm.patchValue(this.movie);
    }
  }

  cancel() {
    this.router.navigate(['/']);
    // this.dialogRef.close();
  }

  saveMovie(single = true) {
    if (this.movieForm.valid) {
      lastValueFrom(this.movieService.addMovie(this.movieForm.value)).then((res: Movie) => {
        this.movieForm.reset();
        console.log(res);
        if (single) {
          this.router.navigate([`/movies/${res.id}`]);
          // this.dialogRef.close(res);
        } else {
          this.recentlyAdded.push(res);
        }
      }).catch(() => {
        this.errorMessage = 'Something went wrong. Please try again';
      });
    }
  }

  saveAndAddAnother() {
    this.saveMovie(false);
  }
}
