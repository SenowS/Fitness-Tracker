import ActivityTracker from "./ActivityTracker.js";

const activityList = new ActivityTracker();

const submitActivity = document.getElementById('submit');

submitActivity.addEventListener('click', event => {
  const activityInput = document.getElementById('description-input');
  const timeInput = document.getElementById('time-input');
  const intensityInput = document.getElementById('intensity-input');
  if (timeInput.value !== '' && activityInput.value !== '' && timeInput.value > 0 && intensityInput.value !== '') {
    activityList.addActivity(activityInput.value, timeInput.valueAsNumber, intensityInput.value);
    activityInput.value = '';
    timeInput.value = '';
    intensityInput.value = "";
  }
  event.preventDefault();
})