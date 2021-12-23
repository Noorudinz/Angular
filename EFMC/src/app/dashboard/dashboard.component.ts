import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { Dashboard } from './dashboard.model';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   dashboard: Dashboard;
   barChart: any;
   pieChart: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboard();
    this.barChartPopulation();
    this.pieChartBrowser();
  }

  private loadDashboard(){
    this.dashboardService.getDashboardDetails().subscribe(data => {
      if(data){
        this.dashboard = data;
      }
    });
  }

  barChartPopulation() {

    this.dashboardService.getDashboardBarChartDetails().subscribe(data => {
      if(data){

        // const chartData = ((JSON.stringify(data)).toString().replace(/\"undefined"/g, undefined));
        // this.barChart = JSON.stringify(chartData).toString().replace(/\\/g, "");
        let chartData = (JSON.stringify(data).toString().replace(/\"undefined"/g, undefined));
        this.barChart = JSON.stringify(chartData).toString().replace(/\\/g, '');

      }
    });

    HighCharts.chart('barChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Current year Bill generation'
      },
      xAxis: {
        categories: ['BTU', 'WATER', 'ELECTRICITY'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount (thousands)',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' BHD'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },

      //series:  this.barChart
       "series": [{"type":undefined,"name":"Month December","data":[21948.5,34263.75,27928.2]},{"type":undefined,"name":"Month November","data":[22188,33306.75,26696.4]},{"type":undefined,"name":"Month October","data":[22878,32990.25,26911.8]},{"type":undefined,"name":"Month September","data":[22550,33243,26767.8]},{"type":undefined,"name":"Month August","data":[31535,41220.75,22705.2]},{"type":undefined,"name":"Month July","data":[5406,10136.25,9190.2]}]
      // series: [{
      //   type: undefined,
      //   name: 'Year 1800',
      //   data: [107, 31, 635]
      // }, {
      //   type: undefined,
      //   name: 'Year 1900',
      //   data: [133, 156, 947]
      // }, {
      //   type: undefined,
      //   name: 'Year 2000',
      //   data: [814, 841, 3714]
      // }, {
      //   type: undefined,
      //   name: 'Year 2016',
      //   data: [1216, 1001, 4436]
      // }]
    });
  }

  pieChartBrowser() {

    this.dashboardService.getDashboardPieChartDetails().subscribe(data => {
      if(data){
       console.log(JSON.stringify(data));

       this.pieChart = JSON.stringify(data);

      }
    });

    HighCharts.chart('pieChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Bills receivable of all years'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Bills receivable',
        colorByPoint: true,
        type: undefined,
        data: [{"y":0.0058,"name":"Nov/2021"},{"y":0.0092,"name":"Dec/2021"},{"y":0.1296,"name":"Jul/2020"},{"y":1.6056,"name":"Feb/2020"},{"y":0.78,"name":"Mar/2020"},{"y":2.4345,"name":"Jan/2020"},{"y":0.184,"name":"Apr/2020"},{"y":1.6179,"name":"May/2019"},{"y":1.6514,"name":"Dec/2019"},{"y":2.0282,"name":"Mar/2019"},{"y":2.0307,"name":"Oct/2019"},{"y":3.2669,"name":"Sep/2019"},{"y":1.5133,"name":"Apr/2019"},{"y":1.8487,"name":"Jul/2019"},{"y":1.094,"name":"Feb/2019"},{"y":1.688,"name":"Jun/2019"},{"y":1.5905,"name":"Jan/2019"},{"y":2.3553,"name":"Nov/2019"},{"y":1.9394,"name":"Aug/2019"},{"y":4.4761,"name":"Oct/2018"},{"y":1.4662,"name":"May/2018"},{"y":2.6519,"name":"Dec/2018"},{"y":1.7333,"name":"Mar/2018"},{"y":2.0517,"name":"Jan/2018"},{"y":2.1377,"name":"Sep/2018"},{"y":1.4308,"name":"Jun/2018"},{"y":2.2381,"name":"Aug/2018"},{"y":2.0973,"name":"Apr/2018"},{"y":2.2244,"name":"Feb/2018"},{"y":1.7338,"name":"Nov/2018"},{"y":3.8854,"name":"Jul/2018"},{"y":1.0335,"name":"Mar/2017"},{"y":2.8039,"name":"Nov/2017"},{"y":2.3196,"name":"Jun/2017"},{"y":1.5802,"name":"Jan/2017"},{"y":1.7806,"name":"Dec/2017"},{"y":1.9326,"name":"Jul/2017"},{"y":2.0364,"name":"Oct/2017"},{"y":1.9375,"name":"Aug/2017"},{"y":1.6202,"name":"May/2017"},{"y":3.5718,"name":"Sep/2017"},{"y":1.0735,"name":"Feb/2017"},{"y":1.3151,"name":"Apr/2017"},{"y":3.2083,"name":"Aug/2016"},{"y":1.401,"name":"Jun/2016"},{"y":2.2271,"name":"Nov/2016"},{"y":1.7682,"name":"Feb/2016"},{"y":1.9836,"name":"Sep/2016"},{"y":1.2731,"name":"Apr/2016"},{"y":3.3263,"name":"Oct/2016"},{"y":1.1706,"name":"Mar/2016"},{"y":1.6144,"name":"Dec/2016"},{"y":1.0731,"name":"May/2016"},{"y":2.0468,"name":"Jul/2016"}]
        // data: [{
        //   name: 'Chrome',
        //   y: 61.41,
        //   //sliced: true,
        //   //selected: true
        // }, {
        //   name: 'Internet Explorer',
        //   y: 11.84
        // }, {
        //   name: 'Firefox',
        //   y: 10.85
        // }, {
        //   name: 'Edge',
        //   y: 4.67
        // }, {
        //   name: 'Safari',
        //   y: 4.18
        // }, {
        //   name: 'Sogou Explorer',
        //   y: 1.64
        // }, {
        //   name: 'Opera',
        //   y: 1.6
        // }, {
        //   name: 'QQ',
        //   y: 1.2
        // }, {
        //   name: 'Other',
        //   y: 2.61
        // }]
      }]
    });
  }

}
