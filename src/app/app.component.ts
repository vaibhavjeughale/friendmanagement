import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'user-management-system';
  inputvalue:string='';
  isUserlist:boolean=false;

  ngOnInit(): void {
    
  }
  userData(username:any){
    if(username=='vaibhav'){
      console.log('data pass')
      localStorage.setItem('isloggedIn','true')
      this.isUserlist=true
    }else{
      localStorage.setItem('isloggedIn','false')
      alert('It is not valid user');
      this.inputvalue=''
      this.isUserlist=false;
    }
  }
}
