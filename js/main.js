document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        formConsult();
    }, 1000);
})

function formConsult() {
    let form = document.querySelector("#form-consult")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let txtName = e.target.input_name.value;
        if (txtName == "") {
            alert("Campos vacio");
            return false;
        }
        let Url = "https://pokeapi.co/api/v2/pokemon/";
        try {
            let urlEnd = Url + txtName;
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
    })
}