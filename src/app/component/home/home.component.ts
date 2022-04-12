import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
    private router: Router) {
    this.getEmployees();
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.getEmployees();
    }, 3000);

  }
  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      console.log(data.values);
      this.employees = data;
    })  
  }

  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
    console.log(id);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((data) => {
      console.log(data);
      this.getEmployees();
      });
  }

  onClick(){
    //this.employeeService.updateEmployee 
    // console.log("Update successfully");
     window.alert("You just  Enter in Update Employee Form Successfully!");
  }

  onClickDelete(){
    console.log("delete successfully" );
    window.alert("Employee Leave Detail is deleted Successfully!");
  }



}


