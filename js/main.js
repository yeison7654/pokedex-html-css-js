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
            views[2].classList.toggle("hidden");
            setTimeout(() => {
                views[0].classList.toggle("hidden");
                views[2].classList.toggle("hidden");
            }, 1500);
            document.querySelector(".text-load").innerHTML = "Iniciado equipo";
           // searchPokemon(nRandom());
        } else {
            //accion apagar
            form.reset();
            document.querySelector(".input-name").disabled = true;
            viewsHidden();
            views[2].classList.toggle("hidden");
            setTimeout(() => {
                views[1].classList.toggle("hidden");
                views[2].classList.toggle("hidden");
            }, 1500);
            document.querySelector(".text-load").innerHTML = "Apagando equipo";
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
        views[2].classList.toggle("hidden")
        document.querySelector(".text-load").innerHTML = "Realizando la busqueda";
        views[0].classList.toggle("hidden")
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
                setTimeout(() => {
                    views[2].classList.toggle("hidden")
                    views[0].classList.toggle("hidden")
                }, 500);
            })
    } catch (error) {
        console.log("Se encontro un error inesperado : " + error)
    }
}

function nRandom(nMin = 0, nMax = 100) {
    let nRandom = Math.random();//geneara numero aleatorios entre 0 - 1
    let nmin = nMin;
    let nmax = nMax;
    let nInt = Math.floor(nRandom * (nmax - nmin)) + nmin; //Math.floor Redondea el numero decimal
    return nInt;
}