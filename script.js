//cursor 
let cursor=document.querySelector(".cursor");
window.addEventListener("mousemove",(dets)=>{
    cursor.style.left=dets.clientX + "px";
    cursor.style.top=dets.clientY + "px"; 
});
document.addEventListener("mouseleave",()=>{
    cursor.style.opacity = "0"
});
document.addEventListener("mouseenter",()=>{
    cursor.style.opacity = "1"
});


// loading animation

let loadingText=document.querySelector(".l2 h1");
let loadingArr=["PREPARING THE CONTENT","warming up the pixels","brewing the content","SUMMONING THE GOOD STUFF","MAKING THINGS LOOK EXPENSIVE","WELCOME"];
// let loadingArr=["welcome"];
let tlPage1= gsap.timeline({paused:true});

loadingArr.forEach((text,idx)=>{
    setTimeout(()=>{
        loadingText.innerText=text.toUpperCase();
        if (loadingText.innerText==="welcome".toUpperCase()){
            gsap.to(".l1",{
                y:"-100%",
                duration: 2,
                ease: "expo.inOut"
            });
            gsap.to(".l2",{
                y:"100%",
                duration: 2,
                ease:"expo.inOut",
                onComplete: () => {
                     gsap.set(".loading",{
                        display:"none"
                    });
    
                    tlPage1.play();
                }
            });
        };
    },idx*850);
    
});

//page1
tlPage1
.from(".vline",{
    scaleY:0,
    duration:0.5,
    stagger:0.2
})
.from(".hline",{
    scaleX:0,
    duration:0.5,
    stagger:0.2
},"<")
.to(".fancy",{
    color:"rgb(131,41,214)",
    duration:0.35,
    ease:"power1.out"
});

//about me section
let aboutMe = document.querySelector(".aboutMe p");
let words = aboutMe.innerText.split(" ");
aboutMe.innerHTML = words
  .map(word => `<span class="word">${word}</span>`)
  .join(" ");
gsap.to(".aboutMe p span",{
    filter:"blur(0)",
    opacity:1,
    stagger:0.2,
    ease:"power3.out",
    scrollTrigger:{
        trigger:".aboutMe",
        start:"top 60%"
    }
});

//heading random letter wala effect
let randomLetters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
let heading=document.querySelector(".aboutMe h1");
let original=heading.innerText;
heading.addEventListener("click", () => {
    let iteration = 0;
    let interval = setInterval(() => {
        heading.innerText = original
            .split("")
            .map((letter, idx) => {
                if(idx < iteration){
                    return original[idx];
                }
                return randomLetters[
                    Math.floor(Math.random() * randomLetters.length)
                ];
            })
            .join("");
        if(iteration >= original.length){
            clearInterval(interval);
        }
        iteration += 0.15;
    }, 25);     
});

//scroll wala effect
let move = gsap.to(".marquee",{
    xPercent: -50,
    duration:20,
    repeat:-1,
    ease:"none"
});
let lastScroll = window.scrollY;
window.addEventListener("scroll",()=>{
    let current = window.scrollY;
    if(current < lastScroll){
        move.timeScale(-1)
        gsap.to(".marquee svg",{
            rotate:0,
            duration:0.25
        });
    } else {
        move.timeScale(1);
        gsap.to(".marquee svg",{
            rotate:180  ,
            duration:0.25
        });
    }
    lastScroll = current;
});

//card wale anim
document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector(".card-container");
    const stickyHeader = document.querySelector(".sticky-header");
    const cards = document.querySelectorAll(".card");
    let isGapAnimationCompleted = false;
    let isFlipAnimationCompleted = false;

    function initAnimations() {
        ScrollTrigger.getAll().forEach(t => t.kill());
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            ScrollTrigger.create({
                trigger: ".sticky-section",
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;

                    
                    if (progress >= 0.1 && progress <= 0.25) {
                        let mapped = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
                        gsap.set(stickyHeader, { y: -90 * mapped, opacity: mapped });
                    } else if (progress < 0.1) {
                        gsap.set(stickyHeader, { y: 0, opacity: 0 });
                    } else if (progress > 0.25) {
                        gsap.set(stickyHeader, { y: -90, opacity: 1 });
                    }

                    if (progress <= 0.25) {
                        let widthMapped = gsap.utils.mapRange(0, 0.25, 30, 80, progress);
                        gsap.set(cardContainer, { width: `${widthMapped}vw` });
                    } else {
                        gsap.set(cardContainer, { width: `80vw` });
                    }

                    if (progress >= 0.35 && !isGapAnimationCompleted) {
                        gsap.to(cardContainer, { gap: "2rem", duration: 0.3 });
                        gsap.to(cards, { borderRadius: "20px", duration: 0.3 });
                        isGapAnimationCompleted = true;
                    } else if (progress < 0.35 && isGapAnimationCompleted) {
                        gsap.to(cardContainer, { gap: "0rem", duration: 0.3 });
                        gsap.to("#card-1", { borderRadius: "20px 0 0 20px", duration: 0.3 });
                        gsap.to("#card-2", { borderRadius: "0px", duration: 0.3 });
                        gsap.to("#card-3", { borderRadius: "0 20px 20px 0", duration: 0.3 });
                        isGapAnimationCompleted = false;
                    }

                    if (progress >= 0.70 && !isFlipAnimationCompleted) {
                        gsap.to(cards, { rotateY: 180, stagger: 0.1, duration: 0.5 });
                        gsap.to("#card-1", { y: 20, rotateZ: -5, duration: 0.5 });
                        gsap.to("#card-3", { y: 20, rotateZ: 5, duration: 0.5 });
                        isFlipAnimationCompleted = true;
                    } else if (progress < 0.70 && isFlipAnimationCompleted) {
                        gsap.to(cards, { rotateY: 0, stagger: { each: 0.1, from: "end" }, duration: 0.5 });
                        gsap.to(["#card-1", "#card-3"], { y: 0, rotateZ: 0, duration: 0.5 });
                        isFlipAnimationCompleted = false;
                    }
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
            gsap.set([cards, cardContainer, stickyHeader], { clearProps: "all" });
        });
    }

    initAnimations();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initAnimations();
        }, 200);
    });
});



//IMP::::::line19 remove aur line18 un-comment code push krne se pehle