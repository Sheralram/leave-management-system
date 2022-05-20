import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  employees: Employee[] = [];
  constructor(private userService: UserService,
    private routerlink: Router,
    private employeeService: EmployeeService,) { }

  ngOnInit(): void {
  }

  
  



}