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
// let loadingArr=["PREPARING THE CONTENT","warming up the pixels","brewing the content","SUMMONING THE GOOD STUFF","MAKING THINGS LOOK EXPENSIVE","WELCOME"];
let loadingArr=["welcome"];
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
        start:"top 60%",
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

//project hover animation
let projects=document.querySelectorAll(".pro");
projects.forEach((el)=>{
    el.addEventListener("mouseenter",()=>{
        gsap.to(".cursor",{
            scale:2,
            duration:.5,
            ease:"power2.out",
        })
        gsap.to(".cursor i",{
            scale:1.2,
            opacity:1
        })
    })
    el.addEventListener("mouseleave", () => {
        gsap.to(".cursor",{
            scale:1,
            duration:.5,
            ease:"power2.out"
        })
        gsap.to(".cursor i",{
            scale:1,
            opacity:0
        })
    });
})


//IMP::::::line19 remove aur line18 un-comment code push krne se pehle