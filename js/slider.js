document.addEventListener("DOMContentLoaded", () => {

  const wrappers = document.querySelectorAll('.author-wrapper');
  
  wrappers.forEach(wrapper => {
    wrapper.addEventListener('click', function(e) {
      // On ferme tous les autres profils ouverts
      wrappers.forEach(other => {
        if (other !== wrapper) {
          other.classList.remove('active');
        }
      });
      // On bascule l'état du profil cliqué
      this.classList.toggle('active');
    });
  });
  
  // --- TRANSITION AVALANCHE ---
  if (window.location.pathname.includes("sources.html")) {
    const overlay = document.getElementById("page-transition-overlay");
    
    if (overlay) {
      const boneCount = 60; // On augmente la dose !
      
      for (let i = 0; i < boneCount; i++) {
        const bone = document.createElement("div");
        bone.className = "avalanche-bone";
        bone.textContent = "🦴";
        
        // Dispersion totale sur la largeur
        bone.style.left = Math.random() * 100 + "vw";
        // On étale les départs pour un effet de cascade continu
        bone.style.animationDelay = Math.random() * 1.5 + "s";
        // Tailles variées pour la profondeur
        bone.style.fontSize = (Math.random() * 2 + 1.5) + "rem";
        // Rotation de départ aléatoire
        bone.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        overlay.appendChild(bone);
      }

      // Déclenchement du tremblement de terre au milieu de l'avalanche
      setTimeout(() => {
        document.body.classList.add("shaking");
      }, 600); // Se déclenche après 0.6s

      // Révélation de la page
      setTimeout(() => {
        overlay.classList.add("transition-hidden");
        document.body.classList.remove("shaking"); // On arrête de trembler
        
        setTimeout(() => overlay.remove(), 800);
      }, 2500); // On laisse le temps à l'avalanche de passer
    }
  }
  
  // Reste de ton code (toggleStep, etc.)
});

  /* =========================
     SLIDER (si présent)
  ========================= */

const track = document.querySelector(".timeline-track");
  const slides = document.querySelectorAll(".timeline-slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let index = 0;

  if (track && slides.length && nextBtn && prevBtn) {

    function updateTimeline() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateTimeline();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateTimeline();
    });
  }

  window.toggleStep = function (step) {
  // 1. GESTION DE LA FERMETURE
  if (step.classList.contains("active")) {
    step.classList.remove("active");
    // On s'assure d'enlever le trait doré s'il est resté
    step.classList.remove("impact"); 
    return;
  }

  const rect = step.getBoundingClientRect();
  const stepId = step.querySelector('.step-number').textContent.trim();
  
  // 2. CRÉATION DU PROJECTILE
  const projectile = document.createElement("div");
  projectile.className = "falling-bone";

  if (stepId === "01") {
    projectile.textContent = "🦴";
  } else if (stepId === "02") {
    projectile.textContent = "🪨";
  } else if (stepId === "03") {
    projectile.textContent = "🧭"; 
  }

  const startX = rect.right - 40;
  projectile.style.left = startX + "px";

  // Configuration des trajectoires
  let xDest = 100; 
  if (stepId === "01") xDest = 250; 
  if (stepId === "02") xDest = 0;   
  if (stepId === "03") xDest = -150;

  projectile.style.setProperty('--collision-y', rect.top + 'px');
  projectile.style.setProperty('--x-dest', xDest + 'px');
  projectile.style.animation = "boneTrajectory 1.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards";
  
  document.body.appendChild(projectile);

  // 3. GESTION DE L'IMPACT (Synchronisation)
  setTimeout(() => {
    // On ajoute l'impact (trait doré) et on ouvre le texte
    step.classList.add("impact");
    step.classList.add("active"); 

    // Explosion de poussière
    for (let i = 0; i < 10; i++) {
      createDust(startX, rect.top);
    }

    // --- CORRECTION : On retire le trait doré après 500ms ---
    setTimeout(() => {
      step.classList.remove("impact");
    }, 500);

  }, 450);

  // Nettoyage du projectile
  setTimeout(() => projectile.remove(), 1600);
};

// Fonction de poussière avec nettoyage automatique strict
function createDust(x, y) {
  const dust = document.createElement("div");
  dust.className = "dust";
  dust.style.left = x + "px";
  dust.style.top = y + "px";
  
  dust.style.setProperty('--dx', (Math.random() * 120 - 40) + 'px');
  dust.style.setProperty('--dy', (Math.random() * -100 - 20) + 'px');
  
  document.body.appendChild(dust);

  // Suppression impérative de l'élément après l'animation
  dust.addEventListener('animationend', () => {
    dust.remove();
  });
}

   let iconTimeout;

  const sections = document.querySelectorAll(
    "#contexte, #decouvertes, #debats"
  );

  sections.forEach(section => {
    section.addEventListener("mousemove", () => {
      const icons = section.querySelectorAll(".section-icon, .bone");

      icons.forEach(icon => icon.classList.add("animate"));

      clearTimeout(iconTimeout);

      iconTimeout = setTimeout(() => {
        icons.forEach(icon => icon.classList.remove("animate"));
      }, 400);
    });
  });

const slider = document.getElementById("retouchLevel");
const caption = document.getElementById("artifact-caption");
const early = document.querySelectorAll(".retouche-early");
const mid = document.querySelectorAll(".retouche-mid");
const final = document.querySelectorAll(".retouche-final");

slider.addEventListener("input", () => {
  const val = slider.value;
  
  // Reset opacity
  [early, mid, final].forEach(group => group.forEach(p => p.style.opacity = "0"));

  if (val >= "1") {
    caption.textContent = "Ébauche : lame brute issue du débitage.";
  }
  if (val >= "2") {
    early.forEach(p => p.style.opacity = "1");
    caption.textContent = "Début de la retouche abrupte sur le bord.";
  }
  if (val === "3") {
    mid.forEach(p => p.style.opacity = "1");
    final.forEach(p => p.style.opacity = "1");
    caption.textContent = "Pointe de Châtelperron : dos courbe totalement abattu.";
  }
});


  