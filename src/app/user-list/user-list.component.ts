import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  implements OnInit{
  userList:any[]=[];
  addEditUserForm!:FormGroup;
  single_user_data:any;
  popup_header:any;
  user_dto:any;
  userId:any;
  update_user_data:any;

    constructor(private dataService:DataService,private formBuilder:FormBuilder ){
  
    }



  ngOnInit() {
   this.allUserData();
   this.addEditUserForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^\d{10}$/)]], // Assumes 10-digit phone number
  });
  }
  editUserPopup(userId:any){
    this.popup_header="Edit User";
    this.userId=userId;
// Assuming userList is an array of users and you want to find the user by ID
const user = this.userList.find((u) => u.id === userId);

// Send user data to user-upsert component
    this.dataService.setUserData(user);

    this.dataService.singleUser(userId).subscribe((data)=>{
      this.single_user_data=data;
      console.log('this single user data',this.single_user_data)

      this.addEditUserForm.setValue({
        firstName: this.single_user_data.firstName,
          lastName: this.single_user_data.lastName,
          address: this.single_user_data.address,
          email: this.single_user_data.email,
          phone: this.single_user_data.phone,
      })
    })
  }
 
  allUserData(){
    this.dataService.getUsers().subscribe((res)=>{
      this.userList=res;
      // this.userList.forEach((userId)=>{
      //   this.userId=userId.id
      //   console.log('user Id is',this.userId)
      // })
      console.log('thisuserList',this.userList);
    })
  }

  deleteUser(user_id:any){
    this.dataService.deleteUser(user_id).subscribe(data=>{
      this.allUserData();
    },error=>{
      console.log('my error',error);
    })
  
  }
  updateUser(){

    this.update_user_data = this.addEditUserForm.value;
    this.user_dto = {
      firstName: this.update_user_data.firstName,
          lastName: this.update_user_data.lastName,
          address: this.update_user_data.address,
          email: this.update_user_data.email,
          phone: this.update_user_data.phone,
    }
    this.dataService.updateUser(this.userId,this.user_dto).subscribe((data)=>{
      this.addEditUserForm.reset();
      this.allUserData();
    },error=>{
      console.log('this is my error',error);
    })
    

  }

}
