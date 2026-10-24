(function(){
var d=document;
var mb=d.getElementById('mb'),nav=d.getElementById('nav');
if(mb&&nav){mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');});}
var rv=d.querySelectorAll('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.08});rv.forEach(function(e){io.observe(e);});}
else{rv.forEach(function(e){e.classList.add('in');});}
var q=d.getElementById('q');
if(q){var cards=d.querySelectorAll('#all .card'),em=d.getElementById('empty');
q.addEventListener('input',function(){var t=q.value.trim().toLowerCase(),n=0;cards.forEach(function(c){var ok=!t||c.getAttribute('data-name').indexOf(t)>-1;c.hidden=!ok;if(ok)n++;});if(em)em.hidden=n>0;});}
function fmt(n){return 'Rs. '+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',');}
d.querySelectorAll('form[data-wa]').forEach(function(f){
 var tot=f.querySelector('[data-total]'),v=f.querySelector('[data-variant]'),u=f.querySelector('[data-add]'),qt=f.querySelector('[data-qty]');
 function price(){var b=parseInt(f.getAttribute('data-price'),10)||0;if(v){b=parseInt(v.options[v.selectedIndex].getAttribute('data-price'),10)||b;}
  if(u&&u.checked)b+=parseInt(u.getAttribute('data-add'),10)||0;var n=Math.max(1,parseInt(qt&&qt.value,10)||1);return {b:b,n:n,t:b*n};}
 function calc(){if(!tot)return;var p=price();if(!p.b){tot.hidden=true;return;}tot.hidden=false;tot.textContent='Estimated price: '+fmt(p.t)+(p.n>1?' ('+p.n+' x '+fmt(p.b)+')':'')+'. Final price is confirmed on WhatsApp.';}
 f.addEventListener('input',calc);calc();
 f.addEventListener('submit',function(e){
  var bad=null,er=f.querySelector('.er');
  f.querySelectorAll('[data-req]').forEach(function(el){if(!bad&&!el.value.trim())bad=el;});
  if(bad){e.preventDefault();if(er)er.textContent='Please fill in: '+bad.getAttribute('data-label');bad.focus();return;}
  if(er)er.textContent='';
  var pr=f.getAttribute('data-product'),L=['Hi Dehleez Collection, I want to order'+(pr?':':' a customized product.')];
  if(pr)L.push('*'+pr+'*');
  f.querySelectorAll('[data-label]').forEach(function(el){
   if(el.type==='checkbox'){if(el.checked)L.push(el.getAttribute('data-label'));return;}
   var val=(el.tagName==='SELECT')?el.options[el.selectedIndex].text:el.value.trim();
   if(val)L.push(el.getAttribute('data-label')+': '+val);});
  var p=price();if(p.b)L.push('Estimated price: '+fmt(p.t));
  L.push('Page: '+location.href.replace(/index\.html$/,''));
  f.querySelector('input[name=text]').value=L.join('\n');
 });
});
})();
