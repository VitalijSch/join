async function initSummary() {
    await includeHTML();
    await loadData();
    showUserName();
    initTemplate();   
    showUserName();
    showUserNameMobile();
    greetUser();
    upcomingUrgentDeadline();
    loadSummary();
}


/**
 * Retrieves the username from local storage and displays it on the page.
 *
 * @return {void} This function does not return a value.
 */
function showUserName() {
    let userName = document.getElementById('user-name');
    let index = parseFloat(loadPage('user'));
    if (localStorage.getItem('user') !== null) {
        let user = users[index];
        userName.innerHTML = user.name;
    } else {
        userName.innerHTML = 'Guest';
    }
}


/**
 * Displays the username on mobile devices for a short duration before hiding it.
 *
 * @return {void} This function does not return anything.
 */
function showUserNameMobile(){
    const summaryUser = document.querySelector('.summary-user');

    summaryUser.classList.remove('hidden');

    setTimeout(function() {
        summaryUser.classList.add('hidden');
    }, 700);
}


/**
 * Displays a personalized greeting based on the current time of day.
 *
 * @return {void} This function does not return a value.
 */
function greetUser() {
  const greeting = greetUserTime();

  const greetingSpan = document.getElementById('user-greeting');
  greetingSpan.innerHTML = greeting;
}


/**
 * Returns a personalized greeting based on the current time of day.
 *
 * @return {string} The greeting message.
 */
function greetUserTime(){
  const now = new Date();
  const hour = now.getHours();
  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning,';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good Afternoon,';
  } else {
    greeting = 'Good Evening,';
  }
  return greeting;
}


/**
 * Function to handle upcoming urgent deadlines.
 *
 * @param {Date} currentDate - The current date.
 * @param {Array} tasks - List of tasks to filter urgent ones.
 * @return {void} This function does not return a value.
 */
function upcomingUrgentDeadline() {
    const currentDate = new Date();
    const urgentTasks = tasks.filter(task => task.priority === 'Urgent');

    const nearestDate = findNearestDate(currentDate, urgentTasks);
    displayDueDate(nearestDate);
    
    if (urgentTasks.length === 0 || nearestDate < currentDate) {
        document.getElementById('due-date').innerHTML = "No urgent tasks";
        return;
    }
}


/**
 * Finds the nearest date to the current date from a list of tasks.
 *
 * @param {Date} currentDate - The current date to compare against.
 * @param {Array} tasks - List of tasks containing due dates.
 * @return {Date} The nearest due date to the current date.
 */
function findNearestDate(currentDate, tasks) {
    let nearestDate = null;
    let minDistance = Infinity;
    tasks.forEach(task => {
        const dueDate = new Date(task.date);
        const distance = Math.abs(currentDate - dueDate);
        if (distance < minDistance) {
            nearestDate = dueDate;
            minDistance = distance;
        }
    });
    return nearestDate;
}


/**
 * Displays the formatted due date on the page.
 *
 * @param {Date} date - The due date to be displayed.
 * @return {void} This function does not return a value.
 */
function displayDueDate(date) {
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    document.getElementById('due-date').innerHTML = formattedDate;
}


/**
 * Calculates the number of tasks with the status 'todo' and updates the HTML element with the ID 'to-do-count' with the count.
 *
 * @return {void} This function does not return a value.
 */
function showToDos() {
    let totalToDos = 0;
    tasks.forEach(task => {
        if (task.status === 'todo') {
            totalToDos++;
        }
    });
    document.getElementById('to-do-count').innerHTML = totalToDos;
}


/**
 * Calculates the number of tasks with the status 'done' and updates the HTML element with the ID 'done-count' with the count.
 *
 * @return {void} This function does not return a value.
 */
function showDone() {
    let totalDone = 0;
    tasks.forEach(task => {
        if (task.status === 'done') {
            totalDone++;
        }
    });
    document.getElementById('done-count').innerHTML = totalDone;
}


/**
 * Calculates the number of tasks with the priority 'Urgent' and updates the HTML element with the ID 'urgent-count' with the count.
 *
 * @return {void} This function does not return a value.
 */
function showUrgent() {
    let totalUrgent = 0;
    tasks.forEach(task => {
        if (task.priority === 'Urgent') {
            totalUrgent++;
        }
    });
    document.getElementById('urgent-count').innerHTML = totalUrgent;
}


/**
 * Updates the HTML element with the ID 'task-total-count' to display the total number of tasks.
 *
 * @return {void} This function does not return a value.
 */
function showTaksTotal() {
    document.getElementById('task-total-count').innerHTML = tasks.length;
}


/**
 * Calculates the number of tasks with the status 'inProgress' and updates the HTML element with the ID 'in-progress-count' with the count.
 *
 * @return {void} This function does not return a value.
 */
function showInProgress() {
    let totalInProgress = 0;
    tasks.forEach(task => {
        if (task.status === 'inProgress') {
            totalInProgress++;
        }
    });
    document.getElementById('in-progress-count').innerHTML = totalInProgress;
}


/**
 * Calculates the number of tasks with the status 'awaitFeedback' and updates the HTML element with the ID 'awaiting-feedback-count' with the count.
 *
 * @return {void} This function does not return a value.
 */
function showAwaitFeedback() {
    let totalAwaitFeedback = 0;
    tasks.forEach(task => {
        if (task.status === 'awaitFeedback') {
            totalAwaitFeedback++;
        }
    });
    document.getElementById('awaiting-feedback-count').innerHTML = totalAwaitFeedback;
}


/**
 * Loads the summary by calling various functions to display the number of tasks in different states.
 *
 * @return {void} This function does not return anything.
 */
function loadSummary() {
    showToDos();
    showDone();
    showUrgent();
    showTaksTotal();
    showInProgress();
    showAwaitFeedback();
}