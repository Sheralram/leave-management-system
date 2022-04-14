import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  
  employee: Employee = new Employee(0, '', '', '', '', '',);
        
  
  public employeeForm!: FormGroup;

  constructor(
    //private snack: MatSnackBar,
    private fb : FormBuilder,
    private employeeService : EmployeeService,
    private router: Router) {  }

  ngOnInit(): void {
    
      this.employeeForm = this.fb.group({
        name: ['', Validators.required ],
        leavetype: ['', Validators.required ],
        leaveStartdate: ['', Validators.required ],
        leaveEnddate: ['', Validators.required ],
        notes: ['', Validators.required ],
            
     }, {validator: this.checkDates});
     
     this.employeeForm.setValue({
      leaveStartdate: this.employee.leaveStartdate,
      leaveEnddate: this.employee.leaveEnddate
    })
    }

  

    checkDates(group: FormGroup) {
      if(group.controls['leaveEnddate'].value < group.controls['leaveStartdate'].value) {
        return { notValid:true }
      }
      return null;
    }

  onSubmit(){
    console.log(this.employee);
    // this.sendEmail();
    this.saveEmployee();
    window.alert("Employee Leave Details added Successfully!");
    // this.employeeForm.reset();
  }

  clearForm() {
    this.employeeForm.reset();
   }
  
 

  goToEmployeeList() {
    this.router.navigate(['/home']);
  }

  sendEmail(){
    this.employeeService.send(this.employee).subscribe(
      data => {console.log(data);
       this.goToEmployeeList();
     },
    error => console.log(error));
    this.goToEmployeeList();
  }
  
   saveEmployee(){
    // this.employee.department = this.selectedDepartment;
     this.employeeService.createEmployee(this.employee).subscribe(
       data => {console.log(data);
        this.goToEmployeeList();
      },
     error => console.log(error));
     this.goToEmployeeList();
  }

  buttonClick(){
     console.log('button click');
    // this.snack.open('Form submitted succesfully', 'Cancel');
  }


}
