import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  target = '2022-02-19T10:50:30';
  seconds = '00';
  time = '';  

  private readonly update = () => {

    let duration = Date.parse(this.target) - Date.now();

    if (duration < 0) {
      clearInterval(this.timer);

      this.time = 'Expired';
      return;
    }

    // calculates datetime

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    duration -= days * 1000 * 60 * 60 * 24;

    const hours = Math.floor(duration / (1000 * 60 * 60));
    duration -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(duration / (1000 * 60));
    duration -= minutes * 1000 * 60;

    this.seconds = pretty(Math.floor(duration / 1000));


    function pretty(value: number) {
      return value.toString().padStart(2, '0');
    }


    this.time = `${days} days | ${pretty(hours)} hours | ${pretty(minutes)} minutes`;
  }



  private timer = setInterval(this.update, 1000);


  ngOnInit() {
    this.update();
  }

}