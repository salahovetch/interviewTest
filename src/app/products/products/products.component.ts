import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'category', 'price', 'image'];
  allProducts;
  userLogged;
  showLoader = true;
  showDeleteSuccess = false;
  addMode = false;
  addProductForm: FormGroup;
  addSuccess = false;
  productToUpdate;
  updateProductForm: FormGroup;
  updateMode = false;
  updateSuccess = false;
  addedShoot;
  addedShootMode = false;
  updatedShoot;
  updateShootMode = false;
  allCategories;
  selectedProduct;
  detailsMode = false;
  selectedCategory = 'all';
  filteredCategories;
  p: number = 1;
  constructor(private productsServ: ProductsService, private route: Router, public translate: TranslateService) { }
  ngOnInit(): void {
    this.getAllCategories()
    this.getAllProducts()

    this.userLogged = localStorage.getItem('userType')
    this.addProductForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      image: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
    });

    this.updateProductForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      image: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
    });


  }

  getAllProducts() {
    this.productsServ.getAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.allProducts = response;
        this.showLoader = false;
      },
      error: (e) => {
        console.log('no products exist');
        this.showLoader = false;
      }
    }

    )
  }
  getAllCategories() {
    this.productsServ.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.allCategories = response;
        this.filteredCategories = this.allCategories;

      },
      error: (e) => {
        console.log('no categoris exist');
        this.showLoader = false;
      }
    }

    )
  }

  logout() {
    this.route.navigate([""]);
    localStorage.clear()

  }

  delete(product) {
    this.productsServ.deleteProduct(product.id).subscribe({
      next: (response) => {
        console.log("deleted");
        this.showDeleteSuccess = true;

        setTimeout(() => {
          this.showDeleteSuccess = false;
          this.getAllProducts()
        }, 1500);

      },
      error: (e) => {
        console.log('error in delete');
        this.showLoader = false;
      }


    }
      // (response)=>{
      //   console.log("deleted");
      //   this.getAllProducts()

      // },
      // err=>{
      //   console.log("error in delete");

      // }
    )

  }

  showAddForm() {
    this.addMode = true;
  }
  closeAddForm() {
    this.addMode = false;
  }

  addProduct() {
    this.showLoader = true;
    console.log(this.addProductForm.value);
    this.productsServ.addProduct(this.addProductForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.addedShootMode = true;
        this.addedShoot = response;
        this.showLoader = false;
        this.addSuccess = true;
        this.addProductForm.reset()
        setTimeout(() => {
          this.addMode = false;
          this.addedShootMode = false;
          this.addedShoot = null;
          this.addSuccess = false;
          this.getAllProducts()
        }, 3000);

      },
      error: (e) => {
        console.log('err');
        this.showLoader = false;
      }
    }

    )


  }


  openUpdateDialog(product) {
    this.productToUpdate = product;
    this.updateMode = true;
    this.updateProductForm.get("title").setValue(this.productToUpdate.title)
    this.updateProductForm.get("price").setValue(this.productToUpdate.price)
    this.updateProductForm.get("description").setValue(this.productToUpdate.description)
    this.updateProductForm.get("image").setValue(this.productToUpdate.image)
    this.updateProductForm.get("category").setValue(this.productToUpdate.category)
  }
  closeUpdateDilog() {
    this.updateMode = false;
    this.productToUpdate = null
    this.updateSuccess = false;
  }

  updateProduct() {
    console.log(this.updateProductForm.value);


    this.showLoader = true;
    console.log(this.updateProductForm.value);
    this.productsServ.editProduct(this.updateProductForm.value, this.productToUpdate.id).subscribe({
      next: (response) => {
        console.log(response);
        this.updateShootMode = true;
        this.updatedShoot = response;
        this.showLoader = false;
        this.updateSuccess = true;
        this.updateProductForm.reset()
        setTimeout(() => {
          this.updateMode = false
          this.updateShootMode = false;
          this.updateSuccess = false;
          this.updatedShoot = null;
          this.getAllProducts()
        }, 2000);

      },
      error: (e) => {
        console.log('err');
        this.showLoader = false;
      }
    }

    )

  }

  showDetails(product) {
    console.log(product);

    this.detailsMode = true;
    this.selectedProduct = product;

  }
  closeDetails() {
    this.detailsMode = false;
    this.selectedProduct = null;

  }
  filterProducts() {
    this.showLoader = true;

    if (this.selectedCategory == 'all') {
      this.filteredCategories = this.allCategories;
      this.showLoader = false;
    }
    else {
      this.filteredCategories = this.allCategories.filter(
        res => {
          return res == this.selectedCategory;
        }
      )
      this.showLoader = false;
    }


  }
}
