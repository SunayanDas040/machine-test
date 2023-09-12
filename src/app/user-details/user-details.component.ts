import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['name', 'email', 'address', 'zip'];
  public dataSource: any;
  public noData: boolean = false;
  public displayTable: boolean = false;
  public detailsSub: Subscription | undefined;
  public logoutSub: Subscription | undefined;

  constructor(private backend: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.detailsSub = this.backend.getUserDetails().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.displayTable = true;
          this.dataSource = new MatTableDataSource(res.data);
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  logout() {
    this.logoutSub = this.backend.logout().subscribe((res: any) => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.detailsSub?.unsubscribe();
    this.logoutSub?.unsubscribe();
  }
}
