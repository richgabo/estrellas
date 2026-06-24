/* ==========================================
POEMAS
========================================== */

const poems = {

    moon:{
        title:"Fiodor Dostoievski",
        theme:"moonTheme",
        zoom:1.15,
        text:`Con su propio rincón, junto a un ser querido que le escucha como usted me escucha ahora, ángel mío, con la boca y los ojos abiertos en una noche de invierno..

La luna observa desde lo alto.
Cada sueño encuentra refugio entre sus destellos dorados.`
    },

    whale:{
        title:"Fiodor Dostoievski",
        theme:"whaleTheme",
        zoom:1.12,
        text:`En dos segundos me ha hecho usted feliz para siempre. Si, feliz. Quien sabe, quizá me ha reconciliado conmigo mismo, quizá ha resuelto mis dudas... quizá hay también para mi minutos así....
Cruza mares de pintura.
Su canto viaja por el cielo como un recuerdo eterno.`
    },

    star1:{
        title:"Mario Benedetti",
        theme:"starTheme",
        zoom:1.18,
        text:`Mi táctica es quedarme en tu vida,
            acompañar tus días sencillos,
            aprender de memoria tus silencios
            y encontrar hogar en tu sonrisa..

            La luz atraviesa la oscuridad.
            Y deja en el alma un deseo imposible de olvidar.`
    },

    star2:{
        title:"Fiodor Dostoievski",
        theme:"starTheme",
        zoom:1.18,
        text:`A veces pienso que toda mi felicidad cabría en un instante el momento en que tus ojos encuentran los míos y el mundo deja de parecer un lugar extraño.

            Ilumina horizontes lejanos.
            Y transforma la noche en un océano de posibilidades.`
    },

    nebula:{
        title:"Albert Camus",
        theme:"nebulaTheme",
        zoom:1.08,
        text:`Entre el ruido del mundo encontré algo simple:
        la tranquilidad de tu presencia.
        Y comprendí que amar a alguien
        es encontrar un verano invencible incluso en invierno.`
    }

};

/* ==========================================
ELEMENTOS
========================================== */

const panel = document.getElementById("panel");
const overlay = document.getElementById("overlay");
const poemTitle = document.getElementById("poemTitle");
const poemText = document.getElementById("poemText");
const closeBtn = document.getElementById("closeBtn");

const background = document.getElementById("background");

const interactiveElements =
document.querySelectorAll(".interactive");

/* ==========================================
MÁQUINA DE ESCRITURA
========================================== */

function typeWriter(text){

    poemText.innerHTML = "";

    let i = 0;

    function write(){

        if(i < text.length){

            if(text[i] === "\n"){

                poemText.innerHTML += "<br>";

            }else{

                poemText.innerHTML += text[i];

            }

            i++;

            setTimeout(write,20);

        }

    }

    write();

}

/* ==========================================
ABRIR POEMA
========================================== */

function openPoem(key,element){

    const poem = poems[key];

    document.body.classList.add("focus");

    overlay.classList.add("active");

    panel.classList.add("show");

    panel.className = "";
    panel.id = "panel";

    panel.classList.add("show");
    panel.classList.add(poem.theme);

    poemTitle.textContent = poem.title;

    typeWriter(poem.text);

    interactiveElements.forEach(el=>{
        el.classList.remove("active");
    });

    element.classList.add("active");

    background.style.transform =
    `scale(${poem.zoom})`;

}

/* ==========================================
CERRAR
========================================== */

function closePoem(){

    overlay.classList.remove("active");

    panel.classList.remove("show");

    document.body.classList.remove("focus");

    interactiveElements.forEach(el=>{
        el.classList.remove("active");
    });

    background.style.transform =
    "scale(1)";

}

closeBtn.addEventListener(
    "click",
    closePoem
);

overlay.addEventListener(
    "click",
    closePoem
);

/* ==========================================
EVENTOS
========================================== */

interactiveElements.forEach(el=>{

    el.addEventListener("click",()=>{

        openPoem(
            el.dataset.poem,
            el
        );

    });

});

/* ==========================================
PARALLAX
========================================== */

document.addEventListener(
    "mousemove",
    e=>{

        const x =
        (e.clientX / window.innerWidth - 0.5);

        const y =
        (e.clientY / window.innerHeight - 0.5);

        background.style.transform +=
        ` translate(${x*15}px,${y*15}px)`;

        interactiveElements.forEach(el=>{

            const speed = 25;

            el.style.transform =
            `translate(
                ${x*speed}px,
                ${y*speed}px
            )`;

        });

    }
);

/* ==========================================
PARTÍCULAS
========================================== */

const particleContainer =
document.getElementById("particles");

function createParticle(){

    const p =
    document.createElement("div");

    p.classList.add("particle");

    p.style.left =
    Math.random()*100 + "%";

    p.style.width =
    Math.random()*4+2+"px";

    p.style.height =
    p.style.width;

    p.style.animationDuration =
    10 + Math.random()*15 + "s";

    particleContainer.appendChild(p);

    setTimeout(()=>{

        p.remove();

    },25000);

}

setInterval(createParticle,250);

/* ==========================================
DESTELLO AL HOVER
========================================== */

interactiveElements.forEach(el=>{

    el.addEventListener("mouseenter",()=>{

        el.animate([
            {
                transform:"scale(1)"
            },
            {
                transform:"scale(1.12)"
            },
            {
                transform:"scale(1)"
            }
        ],
        {
            duration:800
        });

    });

});

/* ==========================================
RESPIRACIÓN DEL FONDO
========================================== */

let scale = 1;
let direction = 1;

setInterval(()=>{

    scale += direction * 0.0005;

    if(scale > 1.03)
        direction = -1;

    if(scale < 1)
        direction = 1;

    if(!document.body.classList.contains("focus")){

        background.style.transform =
        `scale(${scale})`;

    }

},30);
const memoryButton =
document.getElementById("memoryButton");

const memoryImage =
document.getElementById("memoryImage");

const memoryMessage =
document.getElementById("memoryMessage");

const messageText =
document.getElementById("messageText");

let memoryOn = false;

function typeMessage(text){

    messageText.textContent = "";

    let i = 0;

    const interval = setInterval(()=>{

        messageText.textContent += text[i];

        i++;

        if(i >= text.length){

            clearInterval(interval);

        }

    },70);

}

memoryButton.addEventListener(
    "click",
    ()=>{

        memoryOn = !memoryOn;

        if(memoryOn){

            memoryButton.classList.add("active");

            memoryImage.src =
            "assets/astronautMoon.png";

            memoryMessage.classList.add("show");

            typeMessage(
                "Ya pasaron 2 años..."
            );

        }else{

            memoryButton.classList.remove("active");

            memoryImage.src =
            "assets/moonClouds.png";

            memoryMessage.classList.remove("show");

        }

    }
);