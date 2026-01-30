// Elements
const sun = document.getElementById('sun');
const sky = document.querySelector('.sky');
const rainCanvas = document.getElementById('rain');
const rainCtx = rainCanvas.getContext('2d');
const frog = document.getElementById('frog');

rainCanvas.width = window.innerWidth;
rainCanvas.height = window.innerHeight;

let raining = false;
let rainDrops = [];

// Toggle sunny <-> rainy on sun click
sun.addEventListener('click', () => {
  raining = !raining;
  if(raining){
    sky.classList.remove('sunny');
    sky.classList.add('rainy');
    frog.style.display = 'block'; // frog appears
    generateRain();
  } else {
    sky.classList.remove('rainy');
    sky.classList.add('sunny');
    frog.style.display = 'none'; // frog disappears
    rainDrops = [];
    rainCtx.clearRect(0,0,rainCanvas.width,rainCanvas.height);
  }
});

// Wind particles
const windCanvas = document.getElementById('wind');
windCanvas.width = window.innerWidth;
windCanvas.height = window.innerHeight;
const windCtx = windCanvas.getContext('2d');
const windParticles = [];
for(let i=0;i<150;i++){
  windParticles.push({
    x: Math.random()*windCanvas.width,
    y: Math.random()*windCanvas.height,
    size: Math.random()*2+1,
    speedX: Math.random()*1+0.5,
    speedY: Math.random()*0.5-0.25
  });
}
function animateWind(){
  windCtx.clearRect(0,0,windCanvas.width,windCanvas.height);
  windParticles.forEach(p=>{
    p.x += p.speedX;
    p.y += p.speedY;
    if(p.x>windCanvas.width) p.x=0;
    if(p.y>windCanvas.height) p.y=0;
    if(p.y<0) p.y=windCanvas.height;
    windCtx.fillStyle = 'rgba(255,255,255,0.5)';
    windCtx.beginPath();
    windCtx.arc(p.x,p.y,p.size,0,Math.PI*2);
    windCtx.fill();
  });
  requestAnimationFrame(animateWind);
}
animateWind();

// Rain effect
function generateRain(){
  rainDrops = [];
  for(let i=0;i<200;i++){
    rainDrops.push({
      x: Math.random()*rainCanvas.width,
      y: Math.random()*rainCanvas.height,
      length: Math.random()*15+5,
      speed: Math.random()*4+2
    });
  }
  animateRain();
}
function animateRain(){
  if(!raining) return;
  rainCtx.clearRect(0,0,rainCanvas.width,rainCanvas.height);
  rainDrops.forEach(drop=>{
    drop.y += drop.speed;
    if(drop.y>rainCanvas.height) drop.y=0;
    rainCtx.strokeStyle = 'rgba(173,216,230,0.5)';
    rainCtx.lineWidth = 1;
    rainCtx.beginPath();
    rainCtx.moveTo(drop.x, drop.y);
    rainCtx.lineTo(drop.x, drop.y + drop.length);
    rainCtx.stroke();
  });
  requestAnimationFrame(animateRain);
}

// Resize
window.addEventListener('resize', ()=>{
  windCanvas.width = window.innerWidth;
  windCanvas.height = window.innerHeight;
  rainCanvas.width = window.innerWidth;
  rainCanvas.height = window.innerHeight;
});
