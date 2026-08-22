import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ApiServer {
    constructor(private http: HttpClient){}

    testBacked(){
        return this.http.get<{ message: String }>('/api/test');
    }
}