import Activity from "./Activity.js";

export default class ActivityTracker {

  constructor () {
    this.activityArray = [];
    this.id = 0;
    this.activityCount = 0;
    this.totalTime = 0;
    this.totalCalories = 0;
  }

  addActivity(description, lengthOfTime, intensity) {
    const calories = (intensity * 66) / 60 * lengthOfTime;
    var myDate = new Date();
    this.activityArray.push(new Activity(description, lengthOfTime, intensity, this.id, myDate.toDateString(), calories));
    this.id++;
    this.activityCount++;
    this.totalTime += lengthOfTime;
    this.totalCalories += calories;
    this.redrawActivityList();
  }

  deleteActivity(id) {
    let activityItem = this.activityArray.find(activityItem => activityItem.id == id);
    let calories = activityItem.calories;
    let lengthOfTime = activityItem.lengthOfTime;
    this.activityArray = this.activityArray.filter(activityItem => activityItem.id != id);
    this.activityCount--;
    this.totalTime -= lengthOfTime;
    this.totalCalories -= calories;
    this.redrawActivityList();
  }

  redrawActivityList() {

    const totalActivityEl = document.getElementById('running-activities');
    const totalCalorieEl = document.getElementById('running-total-calories');
    const averageCalorieEl = document.getElementById('running-calories');
    const totalTimeEl = document.getElementById('running-time');

    totalActivityEl.innerText = this.activityCount;
    totalCalorieEl.textContent = this.totalCalories.toFixed();

    let timeStringTotal;
    if (this.totalTime >= 60) {
      timeStringTotal = `${Math.floor (this.totalTime / 60)}h ${this.totalTime % 60}m`;
    }else {
      timeStringTotal = `${(this.totalTime % 60)}m`;
    }
    totalTimeEl.textContent = timeStringTotal;

    let avgCalc = "--";
    if (this.activityCount != 0) {
      avgCalc = (this.totalCalories / this.activityCount).toFixed();
    }
    averageCalorieEl.textContent = avgCalc;

    const activityTableEl = document.getElementById('activity-table');
    activityTableEl.textContent = '';
    this.activityArray.forEach(activity => {
    const { description, lengthOfTime, date, calories, id} = activity;
    let timeString;
    if (lengthOfTime >= 60) {
      timeString = `${Math.floor (lengthOfTime / 60)}h ${lengthOfTime % 60}m`;
    }else {
      timeString = `${(lengthOfTime % 60)}m`;
    }

    activityTableEl.insertAdjacentHTML (
      'beforeend',
      `
      <tr class="activity">
        <td class="description">${description}</td>
        <td class="calories">${calories.toFixed()}</td>
        <td class="time">${timeString}</td>
        <td class="date">${date}</td>
        <td class="close" id=${id}><i class="las la-times"></i></td>
      </tr>
     `);
     document.getElementById(id).addEventListener('click', () => {
      this.deleteActivity(id);
     })
    })
  }
}

