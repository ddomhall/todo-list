const body = document.querySelector(`body`);
const input = document.querySelector(`.input`);
const taskForm = document.querySelector(`.add-task`);
const taskList = document.querySelector(`.task-list`);
const newList = document.querySelector(`.new-list`);
const doneList = document.querySelector(`.done-list`);
const taskArr = [];
const doneArr = [];

const render = function () {
	// clears exisiting tasks
	newList.textContent = ``;
	doneList.textContent = ``;

	// creates a task for new tasks
	taskArr.forEach(item =>
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
	doneArr.forEach(item =>
		doneList.insertAdjacentHTML(
			`afterbegin`,
			`
			<div class="task">
				<p class="task-text">${item}</p>
				<div class="buttons">
					<button class="btn-add">add</button>
					<button class="btn-del">del</button>
				</div>
			</div>`
		)
	);
};

taskForm.addEventListener(`submit`, function (e) {
	e.preventDefault();

	// save task to array
	taskArr.push(input.value);

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
		const taskIndex = e.target.parentElement.parentElement.parentElement.className === `new-list` ? taskArr.indexOf(taskName) : doneArr.indexOf(taskName);

		// when done clicked
		if (e.target.textContent === `done`) {
			// adds task to done list
			doneArr.push(taskName);

			// removes task from task list
			taskArr.splice(taskIndex, 1);

			// when edit clicked
		} else if (e.target.textContent === `edit`) {
			// gets edited text
			newTask = prompt(`edited name`);

			// edits array item
			taskArr.splice(taskIndex, 1, newTask);

			// when add clicked
		} else if (e.target.textContent === `add`) {
			// adds task to task list
			taskArr.push(taskName);

			// removes task from done list
			doneArr.splice(taskIndex, 1);

			// when delete clicked
		} else if (e.target.textContent === `del`) {
			// removes item from array
			doneArr.splice(taskIndex, 1);
		}

		// refreshes ui
		render();
	}
});
