gsap.registerPlugin(ScrollTrigger);





// Hamburger menu
var menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", menuActive);

function menuActive() {
  var navBar = document.querySelector(".header");
  navBar.classList.toggle("active");
}

// Get all the links in the menu
var menuLinks = document.querySelectorAll(".pager-menu ul li a");

// Add event listener to each link
menuLinks.forEach(function(link) {
  link.addEventListener("click", function(event) {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Close the hamburger menu
    var navBar = document.querySelector(".header");
    navBar.classList.remove("active");

    // Get the target section's id from the link's href attribute
    var targetId = link.getAttribute("href").substring(1);

    // Scroll to the target section
    var targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});






 // GSAP animation for .photocard
const photocard = document.querySelector('.photocard');

const photocardTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });

photocardTimeline.to(photocard, {
  scale: 0.85,
  rotation: -5,
  duration: 0.35,
})

.to(photocard, {
  scale: 1,
  rotation: 5,
  duration: 0.35,
});

// Hover animation
photocard.addEventListener('mouseenter', () => {
  photocardTimeline.pause(); // Pause the repeating animation on hover
});

photocard.addEventListener('mouseleave', () => {
  photocardTimeline.play(); // Resume the repeating animation on mouse leave
});


const init = () => {
  const marquees = document.querySelectorAll('.marquee');
  
  marquees.forEach(marquee => {
    const marqueeInner = marquee.querySelector('.marquee-inner');
    const marqueeContent = marqueeInner.querySelector('.marquee-inner ul');
    
    // Duration
    const duration = marquee.getAttribute('data-marquee-duration');
    
    // Element Clone
    const marqueeContentClone = marqueeContent.cloneNode(true);
    marqueeInner.appendChild(marqueeContentClone); // Append the clone
    
    // Marquee animation for original content
    gsap.to(marqueeContent, {
      x: "-101%",
      repeat: -1,
      duration: duration,
      ease: 'linear'
    });

    // Marquee animation for cloned content
    gsap.to(marqueeContentClone, {
      x: "-101%",
      repeat: -1,
      duration: duration,
      ease: 'linear'
    });
  });
};

document.addEventListener('DOMContentLoaded', init);


function animateCards() {
  const cards = document.querySelectorAll('.projects-cards li');

  cards.forEach((card, index) => {
    gsap.fromTo(card, { scale: 0 }, { 
      scale: 1.1, 
      duration: 0.3, 
      ease: "back.out(1.7)",
      delay: index * 0.1,
      onComplete: () => { 
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    });
  });
}


// Intersection Observer for pop in animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCards();
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1, 
});

const projectsSection = document.querySelector('.projects');
observer.observe(projectsSection);
