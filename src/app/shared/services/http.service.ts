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

  /**
   * 
   * @param region: region for which policy data is needed
   * @returns: returns an array of object with data and label  
   */

  getDashBoardData(region) {
    return this.http.get(this.url + UrlConstants.getChartData + region)
  }

  /**
   * 
   * @returns get all policies data
   */

  getAllPolicies() {
    return this.http.get(this.url + UrlConstants.getPolicy)
  }

  /**
   * 
   * @param data : polciy id or customer id
   * @returns : one policy object inside an array
   */

  getOnePolicy(data) {
    let url = '';
    if (!data['policyId'] && data['customerId']) {
      url = `${this.url}${UrlConstants.getCustomer}/${data['customerId']}`
      return this.http.get(url);
    } else {
      url = `${this.url}${UrlConstants.getPolicy}/${data['policyId']}${data['customerId'] ? '/' + data['customerId'] : ''}`
      return this.http.get(url);
    }
  }

  /**
   * 
   * @param data : modified data from edit policy
   * @returns : new modified data after saving on db
   */

  updatePolicy(data) {
    let url = `${this.url}${UrlConstants.updatePolicy}/${data._id}`
    delete data._id;
    return this.http.patch(url, data);
  }
}
