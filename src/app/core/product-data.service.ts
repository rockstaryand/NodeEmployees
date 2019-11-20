import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product";
import { delay } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ProductDataService {
    
  constructor(private $http: HttpClient) {
    this.getAllProducts().subscribe(data => { console.log(data)});
  }
  baseurl: string = "http://localhost:3000/";
  
    getAllProducts(): Observable<Product> {
      return this.$http.get<Product[]>(this.baseurl + 'employees')
      .pipe(delay(2000)) as Observable<
        Product
      >;
    }
    getProductById(Employeeid: string){
        return this.$http.get<Product>(this.baseurl + 'employees' + '/' + Employeeid);
      }
      addProduct(product: Product){
        return this.$http.post(this.baseurl + 'employees', product);
      }
      deleteProduct(Employeeid: string){
        return this.$http.delete(this.baseurl + 'employees' + '/' + Employeeid);
      }
      updateProduct(product: Product){
        return this.$http.put(this.baseurl + 'employees' + '/' + product.Employeeid, product);
      }
    


  }