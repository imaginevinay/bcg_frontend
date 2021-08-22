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
  lineChartData: ChartDataSets;
  lineChartLabels: Label[];
  lineChartOptions: ChartOptions = {
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

  constructor(private api: HttpService, private spinner: SpinnerOverlayService) { }


  ngOnInit() {
    // on component init get chart data
    this.getChartData(this.selected);
  }

  /**
   * 
   * @param region : get chart data : based on region sent from dropdown
   */
  getChartData(region) {
    this.spinner.show();
    this.sub = this.api.getDashBoardData(region).subscribe((data: any) => {
      this.lineChartData = data?.chartData_y || [];
      this.lineChartLabels = data?.chartLabels_x;
      this.spinner.hide();
    }, err => {
      console.log('err in dash data', err)
      this.spinner.hide();
    })
  }


  /**
   * 
   * @param event  : event to get value of dropdown on change
   */
  optionChange(event) {
    this.getChartData(event.value)
  }

  // on component exit destroy the subscriber
  ngOnDestroy() {
    // unsubscribe to data data api sub
    this.sub.unsubscribe();
  }
}
