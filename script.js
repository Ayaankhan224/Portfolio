let loadingText=document.querySelector(".l2 h1");
let loadingArr=["PREPARING THE CONTENT","warming up the pixels","brewing the content","SUMMONING THE GOOD STUFF","MAKING THINGS LOOK EXPENSIVE","WELCOME"];

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
                }
            });
        };
    },idx*2000);
    
});



