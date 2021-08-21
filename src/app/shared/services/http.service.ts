import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { UrlConstants } from '../constants/api-constants'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string;
  constructor(public http: HttpClient) {
    this.url = environment.apiRoute;
  }

  getDashBoardData(region) {
    return this.http.get(this.url+UrlConstants.getChartData+region)
  }

  getAllPolicies() {
    return this.http.get(this.url+UrlConstants.getPolicy)
  }

  getOnePolicy(data) {
    let url='';
    if(!data['policyId'] && data['customerId']) {
      url = `${this.url}${UrlConstants.getCustomer}/${data['customerId']}`
      return this.http.get(url);
    } else {
      url = `${this.url}${UrlConstants.getPolicy}/${data['policyId']}${data['customerId'] ?'/'+data['customerId']:''}`
      return this.http.get(url);
    }    
  }

  updatePolicy(data) {
    let url = `${this.url}${UrlConstants.updatePolicy}/${data._id}`
    delete data._id;
    return this.http.patch(url, data);
  }
}
