import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpsertComponent } from '../user-upsert/user-upsert.component';
import { UserListComponent } from '../user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UserUpsertComponent,
    UserListComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  exports:[
    UserUpsertComponent,
    UserListComponent
  ]
})
export class UserModule { }
