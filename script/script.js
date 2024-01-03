manipulatePaintBrush();
clearPaintAfterAnimation();
setScrollAnimations();
setupImages();
setupContactform();
action();

function manipulatePaintBrush() {
    const brush = document.querySelector('.brush');
    const greenpaint = document.querySelector('.green');
    greenpaint.addEventListener('animationstart', () =>{
        let angle = 270;
        brush.style.width = '25%';
        brush.style.height = 'auto';
        brush.style.transform = `rotate(${angle}deg)`
    })
}

function clearPaintAfterAnimation() {
    const lastpaint = document.querySelector('.green');
    lastpaint.addEventListener('animationend', () => {
        const content = document.querySelector('.content');
        const loader = document.querySelector('.paint-loader');
        content.style.display = 'block';
        loader.style.zIndex = '-1';

        document.querySelectorAll('.paint').forEach((element) => {
            element.style.display = 'none';
        });
    });
}

function setScrollAnimations(){
    const artEntry = document.querySelector('.art-container img');
    artEntry.addEventListener('animationend', () => {
        const observer = new IntersectionObserver(intersections => {
            intersections.forEach(({
                target, isIntersecting
            }) => {
                if(!isIntersecting) {
                    return;
                }
                target.getAttribute('data-animate-classes').split(' ').forEach(className => {
                    document.querySelectorAll(`.${className}`).forEach(element => {
                        element.classList.add('animate', isIntersecting);
                    });                    
                });
            });
        }, {threshold: 0.25});
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    });
}

function setupImages(){
    const images = document.querySelectorAll('.art-container img');

    images.forEach((image,i) => {
        image.addEventListener('click', () =>{
            const imageBoundingRect = image.getBoundingClientRect();
            const newImage = document.createElement('img');
            newImage.src = image.src;
            newImage.alt = image.alt;
            newImage.style.width = imageBoundingRect.width + 'px';
            newImage.style.position = 'fixed';
            newImage.style.top = imageBoundingRect.top + 'px';
            newImage.style.left = imageBoundingRect.left + 'px';
            newImage.style.zIndex = '10001';
            newImage.className = 'fullscreen';
            document.body.appendChild(newImage);

            setTimeout(() => {
                const parentHeight = window.innerHeight;
                const height = image.offsetHeight;
                const targetHeight = parentHeight * .7;

                const parentWidth = window.innerWidth;
                const width = image.offsetWidth;
                const targetWidth = parentWidth * .8;

                const scale = (parentHeight > parentWidth) ? targetWidth/width : targetHeight/height;
                newImage.style.transform = `translate(-50%,-50%) scale(${scale})`;
                newImage.style.top = '50%';
                newImage.style.left = '50%';
            }, 0);

            showBlur(image, newImage);
        });
    });
}

function showBlur(orginal, newImage) {
    const blur = document.querySelector('.blur');
    blur.style.zIndex = '1000';
    blur.style.backdropFilter= 'blur(10px) brightness(50%) opacity(1)';

    const scrollY = window.scrollY;
    document.body.style.top = -scrollY + 'px';
    document.body.classList.add('prevent-scroll');
   
    blur.addEventListener('click', () =>{
        //const focus = document.querySelector('.art-container');
        //focus.style.display = 'block'
        blur.style.zIndex = -1;
        blur.style.backdropFilter = 'blur(10px) brightness(50%) opacity(0)'
        newImage.style.transform =`none`;
        newImage.style.width = orginal.clientWidth + 'px';
        const imageBoundingRect = orginal.getBoundingClientRect();
        newImage.style.top = imageBoundingRect.top + 'px'
        newImage.style.left = imageBoundingRect.left + 'px';

        setTimeout(() => {
            newImage.remove();
            document.body.classList.remove('prevent-scroll');
            window.scrollTo({top: scrollY, behavior:'instant'});
        }, 1000);
    });
}

function setupContactform(){
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        window.location.href = `mailto:contact@jeremerysochan.com/?subject=${subject}&body=${message}`
    });
}

function readDirectory(dir, filelist = []){
    const fs = require('fs');
    const path = require('path');
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir,file);
        if(fs.statSync(filePath).isDirectory()){
            filelist = readDirectory(filePath,filelist);
        }else{
            filelist.push(filePath);
        }
    });
    return filelist
}

function action(){
    const data = {
      0: './assets/ai.webp',
      1: './assets/chair.webp',
      2: './assets/fish.webp',
      3: './assets/ted.webp',
      4: './assets/water.webp',
      5: './assets/soup.webp',
      6: './assets/formula.webp',
      7: './assets/neon.webp',
      8: './assets/monkey.webp',
      9: './assets/abstract.webp',
      10: './assets/astro.webp',
      11: './assets/ballon.webp',
      12: './assets/basketball.webp',
      13: './assets/car.webp',
      14: './assets/chess.webp',
      15: './assets/computer.webp',
      16: './assets/cybor.webp',
      17: './assets/explode.webp',
      18: './assets/football.webp',
      19: './assets/Michelangelo.webp',
      20: './assets/pencil car.webp',
      21: './assets/rat.webp',
      22: './assets/paint-roller1.png',
    }
    const scope = document.querySelector('.art-container').querySelectorAll('img');
    const trigger = document.querySelector('#next');
    trigger.addEventListener('click', () =>{
        const zoom = document.createElement('div');
        zoom.className ='zoom';
        zoom.style.width = `${window.innerWidth}px`;
        const focus = document.querySelector('.art-container');
        focus.appendChild(zoom);
        zoom.style.minHeight =`${(focus.getBoundingClientRect().height/10 *1.5)+ (window.innerHeight)}px`;
        zoom.style.animation = 'snake 5s ease-in-out 1s 2 alternate';
        zoom.style.position='absolute';
        zoom.style.top = '0';
        zoom.style.left = '0';
        zoom.style.zIndex = '10000000000001';
        /*scope.forEach((t) => {
            t.style.zIndex = -1;
        })*/
        setTimeout(() => {
            focus.style.zIndex = 0;
            scope.forEach((image, i) => {
            i = Math.floor(9.5)
            image.src = data[i]
            });
        },5550);

            trigger.addEventListener('dblclick', () => {
              scope.forEach((img, i) => {
                i = Math.floor(Math.random() * scope.length)            
                img.src = data[i]
              })
            })

    });
    
}