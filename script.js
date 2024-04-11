const play = document.querySelector(".play")
const rules = document.querySelector(".rules")
const rule = document.querySelector(".rule")
const menu = document.querySelector(".menu-container")

let flag = 1;
play.addEventListener('click', _ => {
    window.location.href = "./main.html";
})


rules.addEventListener('click', _ => {
    if(flag){
        rule.style.display = "flex";
        menu.style.height = "100%";
        flag = 0;
        return;
    }
    rule.style.display = "none";
    menu.style.height = "70%";
    flag = 1;
})
