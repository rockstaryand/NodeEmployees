import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDataService } from '../core/product-data.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductDataService) { }
  
  addForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
     
      PersonId: ['', Validators.required],
      EmployeeNum: ['', Validators.required],
      EmployeeDate: [], 
      EmployeeId: [],
      TerminatedDate: []
    });
  }
  onSubmit(){
    this.submitted = true;
    
    if(this.addForm.valid){
      this.productService.addProduct(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
    
  }


}
