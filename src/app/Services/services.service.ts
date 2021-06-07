import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private Http:HttpClient ) 
  { } 
  url: string = "http://localhost:3000/User"
  get(){
    return this.Http.get(this.url)
  }

  postservice(user){
    return this.Http.post( this.url,user)
    }
    getcurrentdata(id){
      return this.Http.get(`${this.url}/${id}`)
    }
    updatedata(id,data){
      return this.Http.put(`${this.url}/${id}`,data)
    }
    Delete(id){
      console.log(id)
      return this.Http.delete("http://localhost:3000/User/ "+ id).subscribe(x=>{console.log(x)})
    }
}
