var todoText = document.querySelector(".form-control");

var ul = document.querySelector("ul");

var btn = document.getElementById("add-todo");

var mainContainer = document.getElementById("todo-main");

btn.addEventListener("click", function() {
    if (todoText.value.length > 0) {

        var todo = createTODO(todoText.value);
        todo.style.opacity = 0;
        setTimeout(function() {
            todo.style.opacity = 1;
        }, 0)
        if (!mainContainer.querySelector(".todo")) {
            var noTodosP = document.querySelector("p.no-todos");
            mainContainer.removeChild(noTodosP)
            var ul = createUl("todo-list");
            ul.append(todo);
            mainContainer.append(ul)
        } else {
            var ul = document.querySelector(".todo-list")
            ul.append(todo)
        }

        todoText.value = "";

    }
})

todoText.addEventListener("keyup", function(e) {

    if (todoText.value.length > 0) {
        if (e.keyCode === 13) {
            var todo = createTODO(todoText.value);
            todo.style.opacity = 0;
            setTimeout(function() {
                todo.style.opacity = 1;
            }, 0)
            if (!mainContainer.querySelector(".todo")) {
                var noTodosP = document.querySelector("p.no-todos");

                mainContainer.removeChild(noTodosP);
                var ul = createUl("todo-list");
                ul.append(todo);
                mainContainer.append(ul)
            } else {
                var ul = document.querySelector(".todo-list")
                ul.append(todo)
            }

            todoText.value = "";
        }
    }




});

function createElement(type, className) {

    var e = document.createElement(type);

    if (className) {

        e.classList.add(className);

    }
    return e;

};

//console.log(createElement("p", "todo-list"));

function createParagraph(message, className) {

    var p = createElement("p", className);
    p.innerText = message;

    return p;

}

//console.log(createParagraph("No Todos", "miClasesita"));

function createUl(className) {

    var ul = createElement("ul", className);

    return ul;
}

function createDiv(className) {

    var div = createElement("div", className);

    return div;
}

function createButton(text, className, dataPurpose) {

    var btn = createElement("button", className);

    btn.innerText = text;

    btn.setAttribute("data-purpose", dataPurpose);
    return btn;

}

//console.log(createButton("up", "subir"));

function createTODO(text) {

    var li = createElement("li", "todo");

    var p = createParagraph(text);

    li.append(p);

    var buttonsContainer = createDiv("buttons");

    var upBtn = createButton("Subir", "up", "up");

    var downBtn = createButton("Bajar", "down", "down");

    var btnDelete = createButton("Borrar", "remove", "remove");

    buttonsContainer.append(upBtn);

    buttonsContainer.append(downBtn);

    buttonsContainer.append(btnDelete);

    li.append(buttonsContainer);

    return li;
}

mainContainer.addEventListener("click", function(e) {


    if (e.target.nodeName === "BUTTON") {

        var button = e.target;
        var typeButton = button.getAttribute("data-purpose");
        var li = button.parentElement.parentElement;
        var ul = li.parentElement;

        switch (typeButton) {

            case "remove":

                ul.removeChild(li);
                if (ul.children.length === 0) {

                    var p = createParagraph("No hay tareas pendientes", "no-todos");
                    var ul = document.querySelector(".todo-list");
                    mainContainer.removeChild(ul);
                    mainContainer.append(p);

                }
                break;
            case "up":

                var previousElement = li.previousElementSibling;
                if (previousElement !== null) {

                    ul.removeChild(li);
                    ul.insertBefore(li, previousElement);
                }

                break;
            case "down":

                var nextElement = li.nextElementSibling;
                if (nextElement !== null) {

                    ul.removeChild(li);
                    ul.insertBefore(li, nextElement.nextElementSibling);
                }

                break;



        }
    }


});