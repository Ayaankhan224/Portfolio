// loading anim

let loadingText=document.querySelector(".l2 h1");
let loadingArr=["PREPARING THE CONTENT","warming up the pixels","brewing the content","SUMMONING THE GOOD STUFF","MAKING THINGS LOOK EXPENSIVE","WELCOME"];
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

.to(".title .fancyA, .title .fancyN",{
    color:"rgb(131,41,214)",
    duration:0.35,
    ease:"power1.out"
});



