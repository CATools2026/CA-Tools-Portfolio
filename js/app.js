const groups=window.CA_TOOL_GROUPS||[];
const grid=document.getElementById('toolsGrid');
const filters=document.getElementById('filters');
const search=document.getElementById('search');
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const closeModal=document.getElementById('closeModal');
let cat='All', term='';
const cats=['All',...new Set(groups.map(g=>g.cat))];
const icon=i=>`assets/icons/${i}`;
function renderFilters(){filters.innerHTML=cats.map(c=>`<button class="${c===cat?'active':''}" data-cat="${c}">${c}</button>`).join('')}
function matchGroup(g){const text=[g.name,g.cat,g.for,g.summary,...g.features,...g.buttons.flatMap(b=>[b.name,b.desc])].join(' ').toLowerCase();return (cat==='All'||g.cat===cat)&&text.includes(term)}
function renderGroups(){const list=groups.filter(matchGroup);grid.innerHTML=list.map(g=>`<article class="group-card" data-id="${g.id}"><div class="group-top"><div class="icon"><img src="${icon(g.icon)}" alt="${g.name} icon"></div><span class="pill">${g.cat}</span></div><h3>${g.name}</h3><p>${g.summary}</p><div class="for"><span>Best for</span>${g.for}</div><div class="button-highlight"><span class="mini-title">Buttons inside this tool</span><div class="sub-buttons">${g.buttons.map(b=>`<button type="button" data-group="${g.id}" data-button="${b.name}"><img src="${icon(b.icon)}" alt=""><span>${b.name}</span></button>`).join('')}</div></div><div class="card-actions"><a class="download-link" href="${g.download}" target="_blank" rel="noopener">Download Tool</a><button class="view-group" type="button">View Details</button></div></article>`).join('')||'<p class="empty">No matching tools found.</p>'}
function openGroup(id, buttonName=''){const g=groups.find(x=>x.id===id);if(!g)return;const selected=buttonName?`<p class="selected-note">Selected button: <b>${buttonName}</b></p>`:'';modalContent.innerHTML=`<div class="modal-inner"><div class="modal-top"><div class="icon"><img src="${icon(g.icon)}" alt="${g.name} icon"></div><div><span class="pill">${g.cat}</span><h2>${g.name}</h2><p>${g.summary}</p>${selected}<a class="download-link modal-download" href="${g.download}" target="_blank" rel="noopener">Download ${g.name}</a></div></div><div class="modal-grid group-modal-grid"><div class="modal-box"><h3>Key Features</h3><ul>${g.features.map(f=>`<li>${f}</li>`).join('')}</ul></div><div class="modal-box"><h3>Best Users</h3><ul><li>${g.for}</li><li>Professional BIM / Revit project teams</li><li>Teams that need faster production workflows</li></ul></div></div><h3 class="inside-heading">Separate Buttons Inside This Tool Group</h3><div class="inside-buttons">${g.buttons.map(b=>`<section class="inside-button ${b.name===buttonName?'selected':''}"><div class="icon small"><img src="${icon(b.icon)}" alt="${b.name} icon"></div><div><h4>${b.name}</h4><p>${b.desc}</p></div></section>`).join('')}</div></div>`;modal.showModal()}
filters.onclick=e=>{if(e.target.dataset.cat){cat=e.target.dataset.cat;renderFilters();renderGroups()}};
search.oninput=e=>{term=e.target.value.toLowerCase();renderGroups()};
grid.onclick=e=>{if(e.target.closest('a'))return;const sub=e.target.closest('button[data-button]');if(sub){e.stopPropagation();openGroup(sub.dataset.group,sub.dataset.button);return}const card=e.target.closest('article[data-id]');if(card)openGroup(card.dataset.id)};
closeModal.onclick=()=>modal.close();
document.querySelector('.menu').onclick=()=>document.querySelector('.nav').classList.toggle('open');
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));
renderFilters();renderGroups();
