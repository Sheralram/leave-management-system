import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']

})


export class AddComponent implements OnInit {
 
  
  employee: Employee = new Employee(0, '', '', '', '', '','',);
  leaveTypes = ['Medical','Vacation','Business Tour','Other','Back Dated'];
  // testSubscription: Subscription;     
  
  public employeeForm!: FormGroup;

  constructor(
    //private snack: MatSnackBar,
    private fb : FormBuilder,
    private employeeService : EmployeeService,
    private router: Router,
    private toastr: ToastrService) {  }

    // minDate: Moment;
// maxDate: Moment;

  ngOnInit(): void {
    // this.testSubscription = this.leaveType.valueChanges
    // // .pipe(debounceTime(100))
    // .subscribe(value => console.log(value));
    // const currentYear =moment().year();
    // this.minDate = moment([currentYear - 1, 0, 1]);
    // this.maxDate = moment([currentYear + 1, 11, 31]);
    
      this.employeeForm = this.fb.group({
        name: ['', Validators.required ],
        leaveType: ['', Validators.required ],
        leaveStartDate: ['', Validators.required ],
        leaveEndDate: ['', Validators.required ],
        notes: ['', Validators.required ],
        emailAddress: ['', Validators.required ],
            
     }, {validator: this.checkDates});
     
     this.employeeForm.setValue({
      //  date: formatDate(new Date(), 'dd/mm/yyyy', 'en-US'),
      leaveStartDate: formatDate(this.employee.leaveStartDate,'yyyy-MM-dd', 'en-US'),
      leaveEndDate: formatDate(this.employee.leaveEndDate,'yyyy-MM-dd', 'en-US'),
    
    })
    }

  

    checkDates(group: FormGroup) {
      if(group.controls['leaveEndDate'].value < group.controls['leaveStartDate'].value) {
        return { notValid:true }
      }
      return null;
    }

  onSubmit(){
    console.log(this.employee);
    console.log("Added Data")
    
    // this.sendEmail();
    this.saveEmployee();
    //  window.alert("Employee Leave Details added Successfully!");
     this.toastr.success('Leave Added!', 'Success!');
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
     this.employeeService.addEmployeePayrollData(this.employee).subscribe(
       data => {console.log(data);
        this.goToEmployeeList();

        window.location.reload();
      },
     error => console.log(error));
     this.goToEmployeeList();
  }

  buttonClick(){
     console.log('button click');
    // this.snack.open('Form submitted succesfully', 'Cancel');
  }



  

}
