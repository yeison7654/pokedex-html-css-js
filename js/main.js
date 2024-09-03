let idPokemon = 0;
let views = document.querySelectorAll(".height-23");
let form = document.querySelector("#form-consult")
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        formConsult();
        onOff();
        btnControls();
    }, 1000);
})

function formConsult() {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let txtName = e.target.input_name.value;
        if (txtName == "") {
            alert("Campos vacio");
            return false;
        }
        searchPokemon(txtName);
    })
}
function onOff() {
    let btn_power = document.querySelector(".btn-power");
    btn_power.addEventListener("click", () => {
        if (views[0].classList.contains("hidden")) {
            //accion prender
            document.querySelector(".input-name").disabled = false;
            viewsHidden();
            views[0].classList.toggle("hidden")
        } else {
            //accion apagar
            form.reset();
            document.querySelector(".input-name").disabled = true;
            viewsHidden();
            views[1].classList.toggle("hidden")
        }

    })
}

function viewsHidden() {
    //verifica que las pantallas que no estan ocultas se oculten de manera forzada
    views.forEach(element => {
        if (!element.classList.contains("hidden")) {
            element.classList.toggle("hidden");
        }
    });
}
function btnControls() {
    let btn_next = document.querySelector(".next");
    let btn_back = document.querySelector(".back");
    btn_next.addEventListener("click", () => {
        searchPokemon(idIncrement(1))
    })
    btn_back.addEventListener("click", () => {
        searchPokemon(idIncrement(-1))
    })
}

function idIncrement(params) {
    idPokemon = idPokemon + params
    if (idPokemon <= 0) {
        idPokemon = 1;
    }
    return idPokemon
}

function searchPokemon(params) {
    let Url = "https://pokeapi.co/api/v2/pokemon/";
    try {
        let urlEnd = Url + params;
        fetch(urlEnd)
            .then((response) => response.json())
            .then(data => {
                document.querySelector(".name-pokemon").innerHTML = data.name
                document.querySelector(".img-pokemon").src = data.sprites.front_default
                document.querySelector(".abilities-1").innerHTML = data.abilities[0].ability.name
                document.querySelector(".abilities-2").innerHTML = data.abilities[1].ability.name
                document.querySelector(".sound-pokemon").src = data.cries.latest
                document.querySelector(".base_experience").innerHTML = data.base_experience
                document.querySelector(".weight").innerHTML = data.weight + " Kg"
            })
    } catch (error) {
        console.log("Se encontro un error inesperado : " + error)
    }
}