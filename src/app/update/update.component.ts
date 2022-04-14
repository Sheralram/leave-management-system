import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  
   id!: number;
  employee: Employee = new Employee(0, '', '', '', '', '');
  public employeeForm!: FormGroup;

  constructor(private employeeService: EmployeeService,
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));


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
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
      this.goToEmployeeList();
    },
    error => console.log(error));
    window.alert("Employee Leave Detail is updated Successfully!");
    this.router.navigate(['/home']);
    }

    clearForm() {
      this.employeeForm.reset();
     }



    goToEmployeeList() {
      this.router.navigate(['/home']);
    }

    buttonClick() {
      console.log('button click');
     // this.snack.open('Form updated succesfully', 'Cancel');
    }
  

}
