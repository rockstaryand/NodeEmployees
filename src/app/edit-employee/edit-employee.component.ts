import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDataService } from '../core/product-data.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  [x: string]: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductDataService) { }

  ngOnInit() {
    let employeeid = localStorage.getItem("EmployeeId");
    if(!employeeid){
      alert("Something wrong!");
      this.router.navigate(['']);
      return;
  }
  this.editForm = this.formBuilder.group({
    EmployeeId: [],
    EmployeeNum: ['', Validators.required],
    EmployeeDate: ['', Validators.required],
    PersonId: ['', Validators.required],
    TerminatedDate: ['', Validators.required]
  });
  this.productService.getProductById(employeeid).subscribe(data=>{
    console.log(data);
    this.editForm.patchValue(data); //Don't use editForm.setValue() as it will throw console error
  });
}
onSubmit(){
  this.submitted = true;
  
  if(this.editForm.valid){
    this.productService.updateProduct(this.editForm.value)
    .subscribe( data => {
      console.log(data);
      this.router.navigate(['']);
    });
  }
}
}

