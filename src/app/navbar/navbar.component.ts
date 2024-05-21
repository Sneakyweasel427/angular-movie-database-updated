import { Component, EventEmitter, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public listChanged: EventEmitter<any> = new EventEmitter();
  public router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit() {}

}
