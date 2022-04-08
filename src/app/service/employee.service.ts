import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private baseURL =  'http://localhost:9090/lms';
  // private createURL = 'http://localhost:8080/employee-payroll-app/create';http://localhost:9090/lms/employees
  // private getURL =    'http://localhost:8080/employee-payroll-app/get/5';
  // private updateURL = 'http://localhost:8080/employee-payroll-app/update/{id}';
  // private deleteURL = 'http://localhost:8080/employee-payroll-app/delete/\';

  constructor(private httpClient: HttpClient) { }

  getEmployeesList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/employees-list`);
  }
  // getAllEmployees(): Observable<Employee[]> {
  //   return this.httpClient.get<Employee[]>(`${this.baseURL}/employees-list`);
  // }
  createEmployee (employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/employees`, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/employees/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/employees-update/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/employees-delete/${id}`);
  }
}
