const W=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}};W();let k;const Y=new Uint8Array(16);function _(){if(!k&&(k=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!k))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return k(Y)}const i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).slice(1));function J(e,t=0){return(i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase()}const Z=typeof crypto!="undefined"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var D={randomUUID:Z};function O(e,t,n){if(D.randomUUID&&!t&&!e)return D.randomUUID();e=e||{};const c=e.random||(e.rng||_)();if(c[6]=c[6]&15|64,c[8]=c[8]&63|128,t){n=n||0;for(let o=0;o<16;++o)t[n+o]=c[o];return t}return J(c)}const a=[{label:"Leonardo",count:0},{label:"Rapha\xEBl",count:0},{label:"Donatello",count:0},{label:"Michelangelo",count:0},{label:"Splinter",count:0},{label:"Shredder",count:0},{label:"Krang",count:0}],j=["Silent","Big","Sad","Dark","Agile","Fragile","Dumb","Dead","Ghost","Snake","Mysterious","Clumsy","Hollow","Iron","Golden","Gracefull","Invisible"],P=["Killer","Soldier","Assassin","Demon","Hunter","Spider","Bullet","Buildozer","Stalker","Samaritan","Ninja","Thunder","Wolf","Shade","Dagger","Master"],M="https://cookie.rct.re",H=e=>{const t=Math.pow(10,Math.ceil(Math.log(Math.ceil(e))/Math.LN10))/100;return Math.round(e/t)*t},Q=e=>{let t=e+9;return e>=5&&(t+=Math.pow(e-5,1.75)*5),t*=Math.pow(10,e),t*=Math.max(1,e-14),t},X=(e,t)=>{const n=Q(e),c=H(n);return Math.ceil(c*Math.pow(1.15,Math.max(0,t)))},ee=e=>(e===0&&(e=.1),Math.ceil(Math.pow(e*1,e*.5+2)*10)/10),te=e=>{const t=ee(e),n=H(t);return Math.round(t/n)*n},b=e=>+e.toFixed(1),B=document.getElementById("clicker"),ne=document.getElementById("count"),oe=document.getElementById("total"),ce=document.getElementById("per-seconds"),w=document.getElementById("timer"),ie=document.getElementById("name"),re=document.getElementById("bonus-list"),R=document.getElementById("bonus-template"),l=document.getElementById("shuriken"),le=document.getElementById("reset"),q=document.getElementById("notifications-list"),se=document.getElementById("notification-template"),ae=document.getElementById("new-name"),V=document.getElementById("popup"),de=document.getElementById("close-popup-button");let s=0,h=0,f=0,u=!1,E,d,m,L;function x(){const e=Math.floor(Math.random()*(j.length-1)),t=Math.floor(Math.random()*(P.length-1)),n=`${j[e]} ${P[t]}`;d=d||n;const c=ie.querySelector("span");c.innerHTML=d}function ue(){d="",x()}function K(e){const t=se.cloneNode(!0);t.querySelector("p").innerHTML=e,t.classList.remove("hidden");const n=()=>{t.classList.remove("slide-in"),t.classList.add("animate__fadeOutRight"),setTimeout(()=>{t.remove()},500)};t.onclick=()=>{n()},setTimeout(n,10*1e3),q.appendChild(t)}function v(e){f+=e,oe.textContent=`Score: ${Math.floor(f)}`}function y(e){s+=e,ne.textContent=`${Math.floor(s)} ninjas`}function g(e){const t=h+b(e);h=t,t<0&&(h=0),E&&clearInterval(E);const n=()=>u?2*t:t;E=setInterval(()=>{y(n()/10),v(n()/10),S()},1e3/10),ce.textContent=`${b(n())} per sec.`}function me(e){const t=e.element.querySelector("img");t.src=`./bonus-${e.index+1}.svg`}function pe(e){const t=e.element.querySelector(".label");t.textContent=e.label}function C(e,t=0){e.count+=t;const n=e.element.querySelector(".count");n.textContent=e.count}function T(e){e.price=X(e.index,e.count);const t=e.element.querySelector(".price");t.textContent=Math.round(e.price)}function $(e){e.cps=te(e.index);const t=e.element.querySelector(".multiplier");t.textContent=`${b(e.cps*e.count)}/sec`}function S(){for(const e of a){const t=e.element.disabled===!1;t&&s<e.price?e.element.disabled=!0:!t&&s>=e.price&&(e.element.disabled=!1)}}function he(e){s<e.price||(K(`You just clicked the bonus <u>${e.label}</u> ! </br>- ${e.price} ninjas</br>+ ${e.cps} ninjas/seconde`),y(-e.price),C(e,1),T(e),$(e),S(),g(e.cps))}function fe(){l.classList.remove("hidden");let e=10,t=10,n=4,c=4;const r=setInterval(()=>{(e+l.clientWidth>=window.innerWidth||e<=0)&&(n=-n),(t+l.clientHeight>=window.innerHeight||t<=0)&&(c=-c),e+=n,t+=c,l.style.left=e+"px",l.style.top=t+"px"},1e3/100),p=()=>{l.classList.add("hidden"),clearInterval(r),clearInterval(F),g(0)};setTimeout(p,30*1e3);let N=0;const F=setInterval(()=>{N+=2,l.style.transform="rotateZ("+N+"deg)"},15);l.onclick=()=>{K("Congrats! You just clicked on the shuriken, all your clicks are doubled for 30 seconds."),w.style.display="block";let I=30;u=!0;const G=setInterval(()=>{I==-1?clearTimeout(G):(w.innerHTML="Boost: "+I+" sec. remaining",I--)},1e3);setTimeout(()=>{w.style.display="none",u=!1,g(0)},30*1e3),p()}}function z(){const e=Math.random()*3e5+3e5;setTimeout(()=>{fe(),z()},e)}de.addEventListener("click",()=>{V.classList.add("hidden"),localStorage.setItem("popup","true")});B.addEventListener("click",()=>{B.src="./karate-2.svg";const e=u?2:1;y(1*e),v(1*e),S(),setTimeout(()=>{B.src="./karate-1.svg"},100)});ae.addEventListener("click",()=>{ue()});le.addEventListener("click",()=>{if(confirm("Click OK to reset your game. All your progress will be deleted.")){v(-f),y(-s),g(-h);for(const e of a)C(e,-e.count),$(e,-e.cps),T(e,-e.price);u=!1,m=O(),localStorage.setItem("id",m),q.innerHTML="",d="",x(),S()}});async function ge(){try{const e=await fetch(`${M}/auth`,{method:"POST",body:m}),t=await e.text();if(e.ok)return t}catch(e){console.error(e)}}async function U(e){try{const t=await fetch(`${M}/${e}/${m}`,{headers:{Authorization:`Bearer ${L}`}}),n=await t.json();if(t.ok)return n}catch(t){console.error(t)}}async function A(e,t){try{const n=await fetch(`${M}/${e}/${m}`,{method:"POST",body:JSON.stringify(t),headers:{Authorization:`Bearer ${L}`,"Content-Type":"application/json"}});if(await n.json(),n.ok)return!0}catch(n){console.error(n)}}setInterval(()=>{A("game",{score:f,bank:s,clickPerSeconds:h,name:d,hasBoost:u}),A("bonus",{store:a})},1e3);document.addEventListener("DOMContentLoaded",async()=>{m=localStorage.getItem("id")||O(),localStorage.setItem("id",m),L=await ge(),await U("game").then(e=>{e&&(f=e.score,s=e.bank,h=e.clickPerSeconds,u=e.hasBoost,d=e.name)}),await U("bonus").then(e=>{if(e)for(let t=0;t<a.length;t++)a[t]=e.store[t]}),x(),z(),localStorage.getItem("popup")||V.classList.remove("hidden");for(const e of a){const t=R.cloneNode(!0),n=a.indexOf(e);e.element=t,e.index=n,me(e),pe(e),C(e),T(e),$(e),t.removeAttribute("id"),t.onclick=()=>{he(e)},re.appendChild(t)}v(0),y(0),g(0),S(),R.remove()});
