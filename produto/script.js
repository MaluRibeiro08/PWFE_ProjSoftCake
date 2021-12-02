const containerTipos = document.querySelector(".tipos");

containerTipos.addEventListener("click", function(event) {
    if(event.target.className == "") {
        event.target.className = "selected";
        containerTipos.querySelectorAll(".selected").forEach(function(item) {
            if(item != event.target) {
                item.className = "";
            }
        });
    }
})