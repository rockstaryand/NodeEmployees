import { Component, OnInit } from '@angular/core';
import { Product } from '../core/product';
import { Router } from "@angular/router";
import { ProductDataService } from '../core/product-data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  products: Product[];
  ProductDataService: any;
  
  
  constructor(private productService: ProductDataService, private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts(){
    this.ProductDataService.getAllProducts().subscribe(data=>{
      this.products = data;
    });
  };
  deleteProduct(product: Product){
    
    this.productService.deleteProduct(product.Employeeid).subscribe(data=>{
      console.log(data);
      this.getAllProducts();
    });
  }
  updateProduct(product: Product){
    localStorage.removeItem("EmployeeId");
    localStorage.setItem("EmployeeId", product.Employeeid);
    this.router.navigate(['edit-product']);
  }
  
}

