
//--State--------------------------------------------
state = {
    title: "Your To Do List",
    color: "#000000",
    tasks: [
        {
            checked: false,
            text: "Try Adding a new task."
        },
        {
            checked: true,
            text: "Also try deleting completed tasks."
        }
    ]
}

//--Functions-----------------------------------------

const loadFromStorage = () => {
    let savedState = localStorage.getItem("savedState");
    if (savedState)
        state = JSON.parse(savedState);
    renderScreen();
}

const saveToStorage = () => {
    localStorage.setItem("savedState", JSON.stringify(state));
}

const renderScreen = () => {
    if (!state) return null;
    
    //-decosntructing state
    const {
        title,
        color,
        tasks
    } = state;

    //--Setting Values/Elements
    domTitle.value = title;

    domColorPickerIcon.style.backgroundColor = color;
    domHeader.style.backgroundColor = color;

    //--Task List
    domTaskList.innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        const { checked, text } = tasks[index];

        //--Creating DOM elements
        const
            domTask = document.createElement("div"),
            domCheckbox = document.createElement("input"),
            domText = document.createElement("label"),
            domDelete = document.createElement("button")
        ;

        //--Setting up attributes
        domTask.className  = "task";
        domCheckbox.className = "task-checkbox";
        domCheckbox.type = "checkbox";
        domText.className = "task-text";
        domDelete.className = "task-delete";
        domDelete.innerText = "×";

        //--Setting up values
        domText.innerText = text;
        if (checked) {
            domCheckbox.checked = true;
            domText.classList.add("completed");
        }

        //--Placing Elements
        domTask.append(domCheckbox);
        domTask.append(domText);
        domTask.append(domDelete);

        domTaskList.append(domTask);

        //--Adding Events

        //-Completing task
        domCheckbox.addEventListener("change", () => {
            if (domCheckbox.checked) {
                domText.classList.add("completed");
                state.tasks[index].checked = true
            } else {
                domText.classList.remove("completed");
                state.tasks[index].checked = false;
            }
            saveToStorage();
        })

        //-Deleting task
        domDelete.addEventListener("click", () => {
            state.tasks.splice(index, 1);
            saveToStorage();
            renderScreen();
        });
    }
}

const addNewTask = () => {
    if (!domNewTask.value) return null;

    state.tasks.push(
        {
            checked: false,
            text: domNewTask.value
        }
    );
    domNewTask.value = "";
    saveToStorage();
    renderScreen();
}

//--Dom Events-----------------------------------------

//--DOM Elements
const
    domTitle = document.getElementById("title"),
    domHeader = document.querySelector(".header"),
    domColorPickerIcon = document.querySelector(".color-picker"),
    domColorPicker = document.querySelector("#header-color-picker"),
    domTaskList = document.getElementById("task-list"),
    domAddButton = document.getElementById("new-task-add"),
    domNewTask = document.getElementById("new-task-text")
;


//-Title
domTitle.addEventListener("change", () => {
    state.title = domTitle.value
    saveToStorage();
    renderScreen();
});

//--Color
domColorPicker.addEventListener("change", () => {
    state.color = domColorPicker.value;
    saveToStorage();
    renderScreen();
});

//--AddTask
domAddButton.addEventListener("click", () => {
    addNewTask();
});
domNewTask.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter") {
        addNewTask();
    }
});

//--Load App
loadFromStorage();

//localStorage.clear();