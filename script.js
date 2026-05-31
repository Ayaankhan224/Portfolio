let cursor = document.querySelector(".cursor");
let cursorInv = document.querySelector(".cursorInv");

//lenis deafult settings
const lenis = new Lenis({
  autoRaf: true,
});

lenis.on("scroll", (e) => {});

gsap.registerPlugin(ScrollTrigger);

//cursor
window.addEventListener("mousemove", (dets) => {
  cursor.style.left = dets.clientX + "px";
  cursor.style.top = dets.clientY + "px";
  cursorInv.style.left = dets.clientX + "px";
  cursorInv.style.top = dets.clientY + "px";
});
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});
document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});

// loading animation

let loadingText = document.querySelector(".l2 h1");
let loadingArr=["PREPARING THE CONTENT","warming up the pixels","brewing the content","SUMMONING THE GOOD STUFF","MAKING THINGS LOOK EXPENSIVE","WELCOME"];
// let loadingArr = ["welcome"];
let tlPage1 = gsap.timeline({ paused: true });

loadingArr.forEach((text, idx) => {
  setTimeout(() => {
    loadingText.innerText = text.toUpperCase();
    if (loadingText.innerText === "welcome".toUpperCase()) {
      gsap.to(".l1", {
        y: "-100%",
        duration: 2,
        ease: "expo.inOut",
      });
      gsap.to(".l2", {
        y: "100%",
        duration: 2,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(".loading", {
            display: "none",
          });

          tlPage1.play();
        },
      });
    }
  }, idx * 850);
});

//page1
tlPage1
  .from(".vline", {
    scaleY: 0,
    duration: 0.5,
    stagger: 0.2,
  })
  .from(
    ".hline",
    {
      scaleX: 0,
      duration: 0.5,
      stagger: 0.2,
    },
    "<",
  )
  .to(".fancy", {
    color: "rgb(131,41,214)",
    duration: 0.35,
    ease: "power1.out",
  });

//about me section
let aboutMe = document.querySelector(".aboutMe p");
let words = aboutMe.innerText.split(" ");
aboutMe.innerHTML = words
  .map((word) => `<span class="word">${word}</span>`)
  .join(" ");
gsap.to(".aboutMe p span", {
  filter: "blur(0)",
  opacity: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".aboutMe",
    start: "top 60%",
  },
});

//heading random letter wala effect
let randomLetters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
let heading = document.querySelector(".aboutMe h1");
let original = heading.innerText;
heading.addEventListener("click", () => {
  let iteration = 0;
  let interval = setInterval(() => {
    heading.innerText = original
      .split("")
      .map((letter, idx) => {
        if (idx < iteration) {
          return original[idx];
        }
        return randomLetters[Math.floor(Math.random() * randomLetters.length)];
      })
      .join("");
    if (iteration >= original.length) {
      clearInterval(interval);
    }
    iteration += 0.15;
  }, 25);
});

//scroll wala effect
let move = gsap.to(".marquee", {
  xPercent: -50,
  duration: 20,
  repeat: -1,
  ease: "none",
});
let lastScroll = window.scrollY;
window.addEventListener("scroll", () => {
  let current = window.scrollY;
  if (current < lastScroll) {
    move.timeScale(-1);
    gsap.to(".marquee svg", {
      rotate: 0,
      duration: 0.25,
    });
  } else {
    move.timeScale(1);
    gsap.to(".marquee svg", {
      rotate: 180,
      duration: 0.25,
    });
  }
  lastScroll = current;
});

//project hover animation
let projects = document.querySelectorAll(".pro");
let ogText = cursor.innerText;
let projectInfo = "";
let projectInfoArr = [
  "ATLIST:\nAI playlist generator →",
  "this is project 2 \nabout xyz →",
  "this is project 3 \nabout xyz →",
  "this is project 4 \nabout xyz →",
  "this is project 5 \nabout xyz →",
];
projects.forEach((el, idx) => {
  const vignette = document.createElement("div");
  Object.assign(vignette.style, {
    position: "absolute",
    inset: "0",
    background:
      "radial-gradient(circle, rgba(0, 0, 0, 0.42) 35%, rgba(0, 0, 0, 0.9) 100%)",
    opacity: "0",
    pointerEvents: "none",
  });
  el.appendChild(vignette);
  gsap.set(el, {
    position: "relative",
    overflow: "hidden",
  });

  el.addEventListener("mouseenter", () => {
    projectInfo = projectInfoArr[idx];
    gsap.to(".cursor", {
      scale: 0.9,
      opacity: 0.8,
      duration: 0.15,
      onComplete: () => {
        cursor.innerText = projectInfo;
        // expand + new text
        gsap.to(".cursor", {
          borderRadius: "25px",
          width: "220px",
          height: "70px",
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        });
      },
    });
    gsap.to(el, {
      scale: 1.02,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.to(vignette, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(".cursor", {
      scale: 0.9,
      opacity: 0.8,
      duration: 0.15,
      onComplete: () => {
        cursor.innerText = ogText;
        gsap.to(".cursor", {
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          scale: 2,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        });
      },
    });
    gsap.to(el, {
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.to(vignette, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  });
});

//skills cards stacking animation
let cards = gsap.utils.toArray(".cards");
cards.forEach((card,i)=>{

    if(i < cards.length-1){

        gsap.to(card,{
            scale:0.88,
            y:-40,
            opacity:0.75,
            filter:"blur(5px)",

            scrollTrigger:{
                trigger:cards[i+1],
                start:"top 80%",
                end:"top 20%",
                scrub:true
            }
        });

    }

});

//inverted cursor wala effect on page 5
let page5 = document.querySelector(".page5");
page5.addEventListener("mouseenter",()=>{
    gsap.to(".cursor",{
        scale:.6,
        opacity:0,
        duration:.12,
        ease:"power2.out",
        onComplete:()=>{
            cursor.remove();
            gsap.set(".cursorInv",{
                visibility:"visible",
                scale:.7,
                opacity:0
            });
            gsap.to(".cursorInv",{
                scale:1,
                opacity:1,
                duration:.22,
                ease:"power2.out"
            });
        }
    });
});
page5.addEventListener("mouseleave",()=>{
    gsap.to(".cursorInv",{
        scale:.7,
        opacity:0,
        duration:.12,
        ease:"power2.out",
        onComplete:()=>{
            cursorInv.style.visibility="hidden";
            document.body.appendChild(cursor);
            gsap.fromTo(".cursor",
                {
                    scale:.6,
                    opacity:0
                },
                {
                    scale:2,
                    opacity:1,
                    duration:.22,
                    ease:"power2.out"
                }
            );
        }
    });
});
//IMP::::::line27 remove aur line26 un-comment code push krne se pehle
