const firefliesContainer = document.getElementById('fireflies-container');
for (let i = 0; i < 30; i++) {
    let firefly = document.createElement('div');
    firefly.classList.add('firefly');
    firefly.style.left = `${Math.random() * 100}vw`;
    firefly.style.animationDelay = `${Math.random() * 15}s`;
    firefly.style.animationDuration = `${12 + Math.random() * 8}s`;
    firefliesContainer.appendChild(firefly);
}

const introScreen = document.getElementById('intro-screen');
const enterBtn = document.getElementById('enter-btn');
const bgMusic = document.getElementById('bg-music');
const garden = document.getElementById('garden');
const finaleScreen = document.getElementById('finale-screen');

enterBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    bgMusic.play().catch(e => console.log("Audio play failed:", e));
});

const messages = [
    "No es solo que seas una persona muy bonita por fuera, es que tienes una vibra tan linda que es imposible no querer estar cerca de ti, Lani.",
    "Y pase lo que pase, prometí cuidar ese corazoncito de pollo, y créeme que es el trabajo que más disfruto hacer. 💙🐥",
    "Eres una persona increíble, súper bonita y con una vibra única. No dejes que nadie te haga dudar de eso, Lani.",
    "Y bueno, siendo 21 de septiembre, obviamente no iba a permitir que te quedaras sin tus flores amarillas. 🌻",
    "A veces mi día es un caos, pero platicar contigo me da la misma paz que ver el cielo azul. Eres mi lugar seguro.",
    "Eres un lujo de persona, Lani. Cualquiera tendría muchísima suerte de tener a alguien tan increíble y con un corazón tan bonito como el tuyo."
];

const flowers = document.querySelectorAll('.flower');
const modal = document.getElementById('modal');
const messageContainer = document.getElementById('message-container');
const closeBtn = document.getElementById('close-btn');

let typeInterval;
let readFlowers = new Set();
let currentFlower = null;

function typeWriter(text, index = 0) {
    if (index === 0) messageContainer.innerHTML = ""; 
    if (index < text.length) {
        messageContainer.innerHTML += text.charAt(index);
        typeInterval = setTimeout(() => typeWriter(text, index + 1), 45);
    }
}

flowers.forEach(flower => {
    flower.addEventListener('click', () => {
        const index = flower.getAttribute('data-index');
        currentFlower = flower;
        modal.classList.add('active');
        
        clearTimeout(typeInterval);
        messageContainer.innerHTML = "";
        
        setTimeout(() => {
            typeWriter(messages[index]);
        }, 500);
    });
});

const closeModal = () => {
    modal.classList.remove('active');
    clearTimeout(typeInterval);
    
    if (currentFlower) {
        currentFlower.classList.add('read');
        readFlowers.add(currentFlower.getAttribute('data-index'));
    }

    if (readFlowers.size === 6) {
        setTimeout(() => {
            garden.classList.add('fade-out');
            setTimeout(() => {
                finaleScreen.classList.remove('hidden');
            }, 1500);
        }, 800);
    }
};

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});