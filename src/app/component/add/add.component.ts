import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs'
import { Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
// import { threadId } from 'worker_threads';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']

})

export class AddComponent implements OnInit {
 
  
  employee: Employee = new Employee(0, '', '', '', '', '','');
  leaveTypes = ['Medical','Vacation','Business Tour','Other','Back Dated'];
  // testSubscription: Subscription;     
    
   differenceDate: number | undefined;
  public employeeForm!: FormGroup;

  minDateToFinish = new Subject<string>();
  minDate: Date | undefined;
  startDate: number | undefined;
  endDate: number | undefined;

  dateChange(e: { value: { toString: () => string; }; }) {
    this.minDateToFinish.next(e.value.toString());
  }

  // myFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // }


  constructor(
    //private snack: MatSnackBar,
    private fb : FormBuilder,
    private employeeService : EmployeeService,
    private router: Router,
    private toastr: ToastrService) 
    {  this.minDateToFinish.subscribe(r => {
      this.minDate = new Date(r);
      })
   }

    // minDate: Moment;
// maxDate: Moment;

  ngOnInit(): void {
   
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

    difference(){
     this.startDate = new Date(this.employee.leaveStartDate).getTime();
     this.endDate = new Date(this.employee.leaveEndDate).getTime();
     this.differenceDate = (this.endDate - this.startDate)/86400000;
     console.log("hello difference date");
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
    this.saveEmployee();
    
    //  window.alert("Employee Leave Details added Successfully!");
     this.toastr.success('Leave Added!', 'Success!');
    //  this.employeeService.getAllEmployee
    
    this.employeeService.getAllEmployee();  
      // window.location.reload();
      
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
        window.location.reload();
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
