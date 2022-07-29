const input = document.querySelector(`.input`);
const taskForm = document.querySelector(`.add-task`);
const taskList = document.querySelector(`.task-list`);
const newList = document.querySelector(`.new-list`);
const doneList = document.querySelector(`.done-list`);
const tasks = {
	todoArr: [],
	doneArr: [],
};

const updateSav = function () {
	window.localStorage.setItem(`tasks`, JSON.stringify(tasks));
};

const render = function () {
	// clears exisiting tasks
	newList.textContent = ``;
	doneList.textContent = ``;

	console.log(tasks);
	console.log(localStorage);

	// creates placeholder if no tasks
	if (tasks.todoArr.length === 0 && tasks.doneArr.length === 0) newList.insertAdjacentHTML(`afterbegin`, `<div class="placeholder task">your tasks will show up here</div>`);

	// creates a task for new tasks
	tasks.todoArr.forEach(item =>
		newList.insertAdjacentHTML(
			`afterbegin`,
			`
			<div class="task">
				<p class="task-text">${item}</p>
				<div class="buttons">
					<button class="btn-edit">edit</button>
					<button class="btn-done">done</button>
				</div>
			</div>`
		)
	);

	// creates a task for done tasks
	tasks.doneArr.forEach(item =>
		doneList.insertAdjacentHTML(
			`afterbegin`,
			`
			<div class="task">
				<p class="task-text">${item}</p>
				<div class="buttons">
					<button class="btn-add">add</button>
					<button class="btn-del">delete</button>
				</div>
			</div>`
		)
	);
};

const init = function () {
	// gets tasks from storage
	const savTasks = JSON.parse(localStorage.getItem(`tasks`));

	// adds tasks to task arrays
	savTasks.todoArr.forEach(item => tasks.todoArr.push(item));
	savTasks.doneArr.forEach(item => tasks.doneArr.push(item));

	// refreshes ui
	render();
};
init();

taskForm.addEventListener(`submit`, function (e) {
	e.preventDefault();

	// save task to array
	tasks.todoArr.push(input.value);
	updateSav();

	// reset task field
	input.value = ``;

	// refreshes ui
	render();
});

taskList.addEventListener(`click`, function (e) {
	e.preventDefault();

	// checks if form was submitted
	if (e.target.type === `submit`) {
		// gets task name
		const taskName = e.target.parentElement.parentElement.querySelector(`.task-text`).textContent;

		// gets index of task in array
		const taskIndex = e.target.parentElement.parentElement.parentElement.className === `new-list` ? tasks.todoArr.indexOf(taskName) : tasks.doneArr.indexOf(taskName);

		// when `done` clicked
		if (e.target.textContent === `done`) {
			// adds task to done list
			tasks.doneArr.push(taskName);

			// removes task from task list
			tasks.todoArr.splice(taskIndex, 1);

			// when `edit` clicked
		} else if (e.target.textContent === `edit`) {
			// gets edited text
			newTask = prompt(`new name`);

			// edits array item
			tasks.todoArr.splice(taskIndex, 1, newTask);

			// when `add` clicked
		} else if (e.target.textContent === `add`) {
			// adds task to task list
			tasks.todoArr.push(taskName);

			// removes task from done list
			tasks.doneArr.splice(taskIndex, 1);

			// when `delete` clicked
		} else if (e.target.textContent === `delete`) {
			// removes item from array
			tasks.doneArr.splice(taskIndex, 1);
		}

		// saves tasks to local storage
		updateSav();

		// refreshes ui
		render();
	}
});
