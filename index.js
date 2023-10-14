
function clampBuilder( minWidthPx, maxWidthPx, minFontSize, maxFontSize ) {
    const root = document.querySelector( "html" );
    const pixelsPerRem = Number( getComputedStyle( root ).fontSize.slice( 0,-2 ) );
  
    const minWidth = minWidthPx / pixelsPerRem;
    const maxWidth = maxWidthPx / pixelsPerRem;
  
    const slope = ( maxFontSize - minFontSize ) / ( maxWidth - minWidth );
    const yAxisIntersection = -minWidth * slope + minFontSize
  
    return `clamp( ${ minFontSize }rem, ${ yAxisIntersection }rem + ${ slope * 100 }vw, ${ maxFontSize }rem )`;
  }


console.log( clampBuilder( 320, 1280, 0.75, 1.5 ) );

let close = document.querySelector('.close');
let sideBar = document.querySelector('.sidebar');
let content = document.querySelector('.content');
let header = document.querySelector('.header');
let code = document.querySelectorAll('.code');

// console.log(sideBar);

let headerHeight = header.offsetHeight;
let totalHeight = window.innerHeight;
let contentHeight = totalHeight - headerHeight;

content.style.height = contentHeight + 'px';
// Check height for content div
console.log(window.getComputedStyle(content).height, contentHeight);

close.addEventListener('click', function(){
    if(sideBar.classList.contains('none')){
        sideBar.classList.remove('none');
        gsap.fromTo('.sidebar', {xPercent: -100}, {duration: 0.5, xPercent: 0, ease: 'power4.out'})
    } else {
    gsap.fromTo('.sidebar', {xPercent: 0}, {duration: 0.5, xPercent: -120, ease: 'power4.out', onComplete: function(){sideBar.classList.add('none')}})
    }
});

code.forEach((block) => {
    block.textContent = block.textContent.replace(/(?<=\n)\s+/g, '').replace(/\\br/g, '\n').replace(/%>% \n/g, '%>%\n\t').replace(/\+\n/g, '+\n\t').replace(/^\s+/, '').replace(/\\t/g, '\t');
});
// 
let listItems = document.querySelectorAll('.sidebar>ol>li');
let contentItems = document.querySelectorAll('.main > div');

listItems = Array.from(listItems);
contentItems = Array.from(contentItems);

listItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    contentItems.forEach((content, contentIndex) => {
      if (contentIndex === index) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  });
});

// console.log(listItems.nextElementSibling);

listItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (item.nextElementSibling.classList.contains('sub-list')) {
      document.querySelectorAll('.sub-list').forEach((subList) => {
        gsap.fromTo(subList, {opacity: 1}, {duration: 1, opacity: 0, ease: 'power4.out'});
        subList.style.display = 'none';
      });
      item.nextElementSibling.style.display = 'block';
      gsap.fromTo(item.nextElementSibling, {opacity: 0}, {duration: 1, opacity: 1, ease: 'power4.out'});
    }
  });
});


const table1 = document.querySelector('.table1');
const table2 = document.querySelector('.table2');
let toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => {
  if(table2.classList.contains('none')){
    gsap.fromTo(table1, {opacity: 1}, {duration: 1, opacity: 0, ease: 'power4.out'});
    table1.classList.toggle('none');
    table2.classList.toggle('none');
    gsap.fromTo(table2, {opacity: 0}, {duration: 1, opacity: 1, ease: 'power4.out'});
  } else {
    gsap.fromTo(table2, {opacity: 1}, {duration: 1, opacity: 0, ease: 'power4.out'});
    table2.classList.toggle('none');
    table1.classList.toggle('none');
    gsap.fromTo(table1, {opacity: 0}, {duration: 1, opacity: 1, ease: 'power4.out'});
  }
});
