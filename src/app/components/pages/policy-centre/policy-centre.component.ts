import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import { PolicyData, TableColumns } from 'src/app/shared/constants/templates'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpService } from 'src/app/shared/services/http.service';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';
import {PolicyEditComponent} from './policy-edit/policy-edit.component'
import {MatDialog} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';



@Component({
  selector: 'app-policy-centre',
  templateUrl: './policy-centre.component.html',
  styleUrls: ['./policy-centre.component.scss']
})
export class PolicyCentreComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<PolicyData>;
  columns = TableColumns
  displayedColumns = TableColumns.map(c => c.columnDef);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  customerID: String;
  policyID: String
  sub: any;
  singleDataSub: any;
  constructor(private api: HttpService, private spinner : SpinnerOverlayService, private dialog: MatDialog, private _snackBar: MatSnackBar) {}


  ngOnInit() {
    this.getAllPolicyData();
  }

  getAllPolicyData() {
    this.spinner.show();
    this.sub = this.api.getAllPolicies().subscribe((data: any) => {
      // console.log('all data', data)
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    }, err => {
      console.log('table data error', err);
      this.spinner.hide();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log('datasource>', this.dataSource)
  }

  getPolicy() {
    if(!this.policyID && !this.customerID) {
      this.getAllPolicyData();
    } else {
      this.spinner.show();
      let filter = {}
      this.policyID && (filter['policyId'] = this.policyID)
      this.customerID && (filter['customerId'] = this.customerID)
      this.singleDataSub = this.api.getOnePolicy(filter).subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('final ds >', this.dataSource)
        this.spinner.hide();
      },err => {
        console.log('table data error', err);
        this.spinner.hide();
      })
    }   
  }

  openDialog(rowData) {
    const dialogRef = this.dialog.open(PolicyEditComponent, {
      width: '1000px',
      data: rowData 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('on dialog close result', result);
      result && this.updatePolicyForm(result.data);
    });
  }

  updatePolicyForm(data) {
    this.api.updatePolicy(data).subscribe((result:any) => {
      console.log(result);
      this.openSnackBar(`Policy No. ${result.Policy_id} updated successfully`, 'success')
      this.getAllPolicyData();
    }, err => {
      this.openSnackBar(`Error Occured! Please try again`, 'error')
      this.spinner.hide();
      console.log(err)
    })
  }


  openSnackBar(msg, type) {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: type === 'success' ? ['success-snack'] : ['error-snack']
    });
  }
  
  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
    this.singleDataSub && this.singleDataSub.unsubscribe();
  }
}
