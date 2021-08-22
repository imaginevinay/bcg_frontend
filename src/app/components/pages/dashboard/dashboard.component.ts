import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { SpinnerOverlayService } from '../../../shared/services/spinner-overlay.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sub: any;
  selected: any = "East"
  lineChartData : ChartDataSets;
  lineChartLabels : Label[];
  lineChartOptions : ChartOptions  = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Policy Count'
         }
      }],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Months'
          }
        }
      ]
   }
  };
  lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: '#3700B3',
    },
  ];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType: ChartType = 'bar';

  constructor(private api: HttpService, private spinner : SpinnerOverlayService) {
    
  }
  ngOnInit() {
    this.getChartData(this.selected);
  }

  getChartData(region) {
    this.spinner.show();
    this.sub = this.api.getDashBoardData(region).subscribe((data: any) => {
      
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
