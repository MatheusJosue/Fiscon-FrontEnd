import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FormService } from 'src/app/service/form.service';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent{

  users: FormGroup;
  error: string | boolean = false;

  displayedColumns = ['position', 'name', 'telephone', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor
  (
    private formBuilder: FormBuilder,
    private formService: FormService
  ) 
  { 
    this.dataSource = new MatTableDataSource(formService.users);

    this.users = this.formBuilder.group({
      name: [null, Validators.required],
      telephone: [null, Validators.required],
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onSubmit(): void {
    if(this.formService.addToTable(this.users.value) != true){
      this.error = this.formService.addToTable(this.users.value) 
    }
    else{
      this.dataSource.data = [...this.formService.users]
    }
  }

  onClear(){
    this.users.reset();
  }
  
  applyFilter(event : any){
    var filterValue : string = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  DeleteUser(user : User){
    this.formService.DeleteUser(user)
    this.dataSource.data = [...this.formService.users]
  }
}
