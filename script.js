let newTodo = document.querySelector('.todo-list')
let count = document.querySelector('.counter')
let todos = []
let toggleButton = document.querySelector('.toggleButton');

toggleButton.classList.add('hidden');

function addTodo() {
	let newItem = document.querySelector('.new-todo').value
	if (newItem === '') {
		alert('enter a task!')
	} else {
		todos.push({
			text: newItem,
			done: false,
		})
		displayList()
		document.querySelector('.new-todo').value = ''
		toggleButton.classList.remove('hidden');
	}
}

function editItem(i) {
	let text = prompt('Enter new task:, todos[i].text')
	if (text === null || text === '') {
		return
	} else {
		todos[i].text = text
		displayList()
	}
}

function deleteItem(i) {
	todos.splice(i, 1)
	displayList()
}

function toggleDone(i) {
	todos[i].done = !todos[i].done
	displayList()
}

function toggleAll() {
	let allDone = todos.every(todo => todo.done)
	todos.forEach(todo => (todo.done = !allDone))
	displayList()
}

function clearAll() {
	todos = todos.filter(todo => !todo.done)
	displayList()
}

function displayList() {
	newTodo.innerHTML = ''
	count.innerText = todos.filter(todo => !todo.done).length + ' ' + 'items left';
	

	for (let i = 0; i < todos.length; i++) {
		let li = document.createElement('li')
		let checkbox = document.createElement('input')

		checkbox.type = 'checkbox'
		checkbox.checked = todos[i].done
		checkbox.onchange = function () {
			toggleDone(i)
		}

		let text = document.createElement('span')
		text.innerText = todos[i].text
		text.ondblclick = function () {
			editItem(i)
		}

		if (todos[i].done) {
			text.classList.add('done')
		}

		let deleteBtn = document.createElement('i')
		deleteBtn.innerText = 'x'
		deleteBtn.onclick = function () {
			deleteItem(i)
		}

		li.appendChild(checkbox)
		li.appendChild(text)
		li.appendChild(deleteBtn)
		newTodo.appendChild(li)
	}
}

document.addEventListener('keydown', function (e) {
	if (e.code === 'Enter') {
		addTodo()
	}
})

displayList()
