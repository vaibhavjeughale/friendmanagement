import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import {User} from '../user-typecasting'

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})

export class UserUpsertComponent implements OnInit{
  userForm!: FormGroup;
  user_dto!:User;
  userdata:any;
  user_reg_data:any;
  userList: any[] = []; // Initialize userList with the existing users



  constructor(private fb: FormBuilder, private dataService: DataService){
 
  }


  ngOnInit() {
    this.initForm();
    this.getAllUser();
    this.dataService.userData$.subscribe((userData) => {
      console.log('user list',userData)
      if (userData) {
        // Set form values with received user data
        this.userForm.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          address: userData.address,
          email: userData.email,
          payment:userData.payment,
          phone: userData.phone,
        });
      }
    });
  }

  
  private initForm(): void {
    this.userForm = this.fb.group({
      id: [null], // Unique ID for the user
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      payment:['',Validators.required,Validators.maxLength(4)],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/),Validators.maxLength(10)]] // Accepts only 10-digit numbers
    });
  }

 
  onSubmit() {
    this.user_reg_data = this.userForm.value;
    this.user_dto = {
      id:0,
      firstName:this.user_reg_data.firstName,
      lastName:this.user_reg_data.lastName,
      address:this.user_reg_data.address,
      email:this.user_reg_data.email,
      payment:this.user_reg_data.payment,
      phone:this.user_reg_data.phone
    }
     // Check if the email already exists in the user list
     const emailExists = this.userList.some(
      (user) => user.email === this.userForm.value.email
    );
    this.userList.forEach((item)=>{
       this.userdata = item.email;
       console.log('user data',this.userdata)

    })
    if(emailExists){
      alert('User with this email already exists!')
    }else{
      this.userList.push(this.userForm.value);
      this.dataService.setUserData(this.userList);
      this.dataService.userRegister(this.user_dto).subscribe((data)=>{
        alert('User Register successfully @');
        console.log('this is form data',data)
        this.userForm.reset();
      },error=>{
        console.log('this is my error',error);
      })
    }
    
  }

  getAllUser(){
    this.dataService.getUsers().subscribe((data)=>{
      this.userList=data;
      console.log('data user all',this.userList)
    },error=>{
      console.log('this is my error',error);
    })
  }
}
