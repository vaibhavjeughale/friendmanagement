import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = 'http://localhost:3000';

  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  
  constructor(private http: HttpClient) { }
  
  setUserData(userData: any) {
    this.userDataSubject.next(userData);
  }
    // Method to get all users
    getUsers(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl+'/user');
    }
 
    // Method to add a new user to the list
    addUser(user: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, user);
    }
    userRegister(user_dto:any):Observable<any>{
      return this.http.post(this.apiUrl+'/user',user_dto)
    }
 
   // update data for indivisula user
   updateUser(user_id:any,user_dto:any){
    return this.http.put(this.apiUrl+'/user'+'/'+user_id,user_dto);

  }
  singleUser(user_id:any){
    return this.http.get(this.apiUrl+'/user'+'/'+user_id)
  }
    // Method to delete a user from the list
   
    deleteUser(user_id:any){
      return this.http.delete(this.apiUrl+'/user'+'/'+user_id)
  
    }
}
