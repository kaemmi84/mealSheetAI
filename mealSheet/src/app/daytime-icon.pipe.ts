import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daytimeIcon'
})
export class DaytimeIconPipe implements PipeTransform {

  transform(daytime: Date): string {
    switch (daytime.getHours()){
      case 1: return 'clock-time-one-outline';
      case 2: return 'clock-time-two-outline';
      case 3: return 'clock-time-tree-outline';
      case 4: return 'clock-time-four-outline';
      case 5: return 'clock-time-five-outline';
      case 6: return 'clock-time-six-outline';
      case 7: return 'clock-time-seven-outline';
      case 8: return 'clock-time-eight-outline';
      case 9: return 'clock-time-nine-outline';
      case 10: return 'clock-time-ten-outline';
      case 11: return 'clock-time-eleven-outline';
      case 12: return 'clock-time-twelve-outline';

      case 13: return 'clock-time-one';
      case 14: return 'clock-time-two';
      case 15: return 'clock-time-tree';
      case 16: return 'clock-time-four';
      case 17: return 'clock-time-five';
      case 18: return 'clock-time-six';
      case 19: return 'clock-time-seven';
      case 20: return 'clock-time-eight';
      case 21: return 'clock-time-nine';
      case 22: return 'clock-time-ten';
      case 23: return 'clock-time-eleven';
      case 24: return 'clock-time-twelve';

      default: return 'clock-alert-outline';
    }
  }

}
