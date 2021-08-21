import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { SpinnerOverlayService } from '../../../shared/services/spinner-overlay.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sub: any;
  selected: any = "East"
  lineChartData : any;
  lineChartLabels : any;
  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: '#3700B3',
    },
  ];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'bar';

  constructor(private api: HttpService, private spinner : SpinnerOverlayService) {
    
  }
  ngOnInit() {
    this.getChartData(this.selected);
  }

  getChartData(region) {
    this.spinner.show();
    this.sub = this.api.getDashBoardData(region).subscribe((data: any) => {
      console.log('dash data >', data);
      this.lineChartData = data?.chartData_x || [];
      this.lineChartLabels = data?.chartLabels_y;
      this.spinner.hide();
    }, err => {
      console.log('err in dash data', err)
      this.spinner.hide();
    })
  }

  optionChange(event) {
    this.getChartData(event.value)
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
