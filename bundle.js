(()=>{"use strict";(()=>{const e={ESCAPE:"Escape",ENTER:"Enter"};window.util={getRandomArrElement:e=>e[Math.floor(Math.random()*e.length)],getRandomInt:(e,o)=>Math.floor(Math.random()*(o-e+1))+e,getDeclension:(e,o)=>o[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]],getRandomLenghtArr:e=>e.slice(0,window.util.getRandomInt(0,e.length)),onPopupEscPress:o=>{o.key===e.ESCAPE&&(o.preventDefault(),window.map.removeActiveCard())},onPopupMessageEscPress:o=>{o.key===e.ESCAPE&&(o.preventDefault(),window.form.removeMessageNode())},debounce:e=>{let o=null;return(...t)=>{o&&window.clearTimeout(o),o=window.setTimeout((()=>{e(...t)}),500)}},MouseButtons:{MAIN:0},KeyboardKeys:e}})(),(()=>{const e=document.querySelector(".map"),o=document.querySelector("#pin").content.querySelector(".map__pin"),t=e=>{const t=o.cloneNode(!0);return t.style.left=e.location.x+"px",t.style.top=e.location.y+"px",t.querySelector("img").src=e.author.avatar,t.querySelector("img").alt=e.offer.title,t};window.pin={mapNode:e,mapPinsNode:e.querySelector(".map__pins"),createPinsNodeFragment:e=>{const o=document.createDocumentFragment();for(let n=0;n<e.length;n++)o.appendChild(t(e[n]));return o},remove:()=>{let e=window.pin.mapPinsNode.querySelectorAll(".map__pin:not(.map__pin--main)");for(let o of e)o.parentNode.removeChild(o)}}})(),(()=>{const e=window.pin.mapNode.querySelector(".map__pin--main");window.map={mapPinMain:e,DefaultMainPinCoordinates:{Y:e.style.top,X:e.style.left},initPinsScreen:e=>{const o=window.pin.createPinsNodeFragment(e);window.pin.mapPinsNode.appendChild(o)},removeActiveCard:()=>{const e=window.pin.mapNode.querySelector(".map__card");e&&(e.parentNode.removeChild(e),document.removeEventListener("keydown",window.util.onPopupEscPress))}}})(),(()=>{const e=window.pin.mapNode.querySelector(".map__filters-container"),o=e.querySelector(".map__filters");let t=!1;const n=()=>{t=!t,Array.from(window.form.node.children).forEach((e=>{e.disabled=t,e.classList.toggle("disable-cursor",t)})),Array.from(o.children).forEach((e=>{e.disabled=t,e.classList.toggle("disable-cursor",t)}))},i=e=>{const t=e;window.pin.mapNode.classList.remove("map--faded"),window.form.node.classList.remove("ad-form--disabled"),n(),window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH,window.move.MainPinSize.pin.HEIGHT),window.filter.updateSimillarPins(t);const i=window.util.debounce((()=>{window.filter.updateSimillarPins(t)}));o.addEventListener("change",i)},r=e=>{e.button===window.util.MouseButtons.MAIN&&(e.preventDefault(),window.backend.load(i),window.map.mapPinMain.removeEventListener("keydown",a))},a=e=>{e.key===window.util.KeyboardKeys.ENTER&&(e.preventDefault(),window.backend.load(i),window.map.mapPinMain.removeEventListener("mousedown",r))};window.activate={onPinMainMousedownPress:r,onPinMainEnterPress:a,toggleDisabledOnFormNodes:n,mapFiltersNode:e,formFiltersNode:o}})(),(()=>{const e=Array.from(window.activate.formFiltersNode.features),o=(e,o,t,n)=>"any"===window.activate.formFiltersNode[e].value?t:parseInt(n.offer[o],10)===parseInt(window.activate.formFiltersNode[e].value,10),t=(e,o)=>"any"===window.activate.formFiltersNode["housing-type"].value?o:e.offer.type===window.activate.formFiltersNode["housing-type"].value,n=(e,t,n)=>o("housing-rooms","rooms",n,e),i=(e,t,n)=>o("housing-guests","guests",n,e),r=(e,o,t)=>{switch(window.activate.formFiltersNode["housing-price"].value){case"low":return e.offer.price<1e4;case"middle":return e.offer.price>=1e4&&e.offer.price<=5e4;case"high":return e.offer.price>5e4;default:return t}},a=function(o){return!e.some((function(e){return e.checked&&!o.offer.features.includes(e.value)}))};window.filter={updateSimillarPins:e=>{const o=e.filter(t).filter(n).filter(i).filter(r).filter(a).slice(0,5);window.map.removeActiveCard(),window.pin.remove(),window.map.initPinsScreen(o),window.card.addNode(o)}}})(),(()=>{const e={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},o={palace:1e4,house:5e3,flat:1e3,bungalow:0},t=document.querySelector(".ad-form"),n=t.querySelector(".ad-form__reset"),i=document.querySelector("main"),r=document.querySelector("#success").content.querySelector(".success"),a=()=>{const e=i.querySelector(".success, .error");e&&(e.classList.contains("error")&&(window.map.mapPinMain.addEventListener("mousedown",window.activate.onPinMainMousedownPress,{once:!0}),window.map.mapPinMain.addEventListener("keydown",window.activate.onPinMainEnterPress,{once:!0})),e.parentNode.removeChild(e),document.removeEventListener("keydown",window.util.onPopupMessageEscPress))};t.addEventListener("change",(n=>{switch(n.target){case t.title:(()=>{const e=t.title.value.length;e<30?t.title.setCustomValidity(`Ещё ${30-e} симв.`):e>100?t.title.setCustomValidity(`Удалите лишние ${e-100} симв.`):t.title.setCustomValidity(""),t.title.reportValidity()})();break;case t.rooms:case t.capacity:t.capacity.setCustomValidity(e[t.rooms.value].includes(t.capacity.value)?"":"Вы не можете выбрать данное количество гостей"),t.capacity.reportValidity();break;case t.timein:case t.timeout:(e=>{e.target===t.timein?t.timeout.value=t.timein.value:t.timein.value=t.timeout.value})(n);break;case t.type:t.price.min=o[t.type.value],t.price.placeholder=o[t.type.value]}})),t.addEventListener("submit",(e=>{window.backend.upload(new FormData(t),window.reset.page),(()=>{const e=r.cloneNode(!0);i.appendChild(e),document.addEventListener("keydown",window.util.onPopupMessageEscPress,{once:!0}),e.addEventListener("click",a,{once:!0})})(),e.preventDefault()})),n.addEventListener("click",(()=>{window.reset.page()})),window.form={node:t,passAddressInput:(e,o)=>{t.address.value=`${(e=>parseInt(window.map.mapPinMain.style.left,10)+e/2)(e)}, ${(e=>e===window.move.MainPinSize.pin.HEIGHT?parseInt(window.map.mapPinMain.style.top,10):parseInt(window.map.mapPinMain.style.top,10)-e/2)(o)}`},mainNode:i,removeMessageNode:a}})(),(()=>{const e=window.form.node.querySelector(".ad-form-header__preview img"),o=window.form.node.querySelector(".ad-form__photo img"),t={AVATAR:e.src,ROOM:""};window.reset={page:()=>{window.pin.mapNode.classList.add("map--faded"),window.form.node.classList.add("ad-form--disabled"),window.activate.toggleDisabledOnFormNodes(),window.pin.remove(),window.form.node.reset(),window.activate.formFiltersNode.reset(),window.map.mapPinMain.style.left=window.map.DefaultMainPinCoordinates.X,window.map.mapPinMain.style.top=window.map.DefaultMainPinCoordinates.Y,window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH,window.move.MainPinSize.circle.HEIGHT),window.map.removeActiveCard(),o.classList.add("hidden"),o.src=t.ROOM,e.src=t.AVATAR,window.map.mapPinMain.addEventListener("mousedown",window.activate.onPinMainMousedownPress,{once:!0}),window.map.mapPinMain.addEventListener("keydown",window.activate.onPinMainEnterPress,{once:!0}),window.scrollTo({top:0,behavior:"smooth"})},previewAvatarNode:e,previewRoomNode:o}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",o="https://21.javascript.pages.academy/keksobooking",t=document.querySelector("#error").content.querySelector(".error"),n=e=>{const o=t.cloneNode(!0);o.querySelector(".error__message").textContent=e,window.form.node.appendChild(o),document.addEventListener("keydown",window.util.onPopupMessageEscPress,{once:!0}),o.addEventListener("click",window.form.removeMessageNode,{once:!0})},i=(e,o,t,i)=>{let r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(()=>{200===r.status?t(r.response):n(`При обращению к серверу произошла ошибка. Статус ответа: ${r.status} ${r.statusText}. Попробуйте перезагрузить страницу`)})),r.addEventListener("error",(()=>{n(`Произошла ошибка соединения. Статус ответа: ${r.status} ${r.statusText}. Попробуйте перезагрузить страницу`)})),r.addEventListener("timeout",(()=>{n(`Запрос не успел выполниться за ${r.timeout}мс. Статус ответа: ${r.status} ${r.statusText}. Попробуйте перезагрузить страницу`)})),r.open(e,o),r.timeout=1e4,r.send("GET"===e?"":i)};window.backend={load:o=>{i("GET",e,o)},upload:(e,t)=>{i("POST",o,t,e)},showError:n}})(),(()=>{const e={wifi:"popup__feature--wifi",dishwasher:"popup__feature--dishwasher",parking:"popup__feature--parking",washer:"popup__feature--washer",elevator:"popup__feature--elevator",conditioner:"popup__feature--conditioner"},o={flat:"Квартира",bungalow:"Бунгало",palace:"Замок",house:"Дом"},t=document.querySelector("#card").content.querySelector(".map__card");window.card={addNode:n=>{window.pin.mapPinsNode.querySelectorAll(".map__pin:not(.map__pin--main)").forEach(((i,r)=>{i.addEventListener("click",(()=>{window.map.removeActiveCard();const i=(n=>{const i=document.createDocumentFragment();return i.appendChild((n=>{const i=t.cloneNode(!0);if(n.offer.title.length&&(i.querySelector(".popup__title").classList.remove("hidden"),i.querySelector(".popup__title").textContent=n.offer.title),n.offer.address.length&&(i.querySelector(".popup__text--address").classList.remove("hidden"),i.querySelector(".popup__text--address").textContent=n.offer.address),n.offer.price&&(i.querySelector(".popup__text--price").classList.remove("hidden"),i.querySelector(".popup__text--price").textContent=new Intl.NumberFormat("ru-RU").format(n.offer.price)+" ₽/ночь"),n.offer.type.length&&(i.querySelector(".popup__type").classList.remove("hidden"),i.querySelector(".popup__type").textContent=o[n.offer.type]),i.querySelector(".popup__text--capacity").textContent=`${n.offer.rooms} ${window.util.getDeclension(n.offer.rooms,["комната","комнаты","комнат"])} ${n.offer.guests>0?`для ${n.offer.guests} ${window.util.getDeclension(n.offer.guests,["гостя","гостей","гостей"])}`:"не для гостей"}`,i.querySelector(".popup__text--time").textContent=`Заезд после ${n.offer.checkin}, выезд до ${n.offer.checkout} `,n.offer.description.length&&(i.querySelector(".popup__description").classList.remove("hidden"),i.querySelector(".popup__description").textContent=n.offer.description),n.author.avatar.length&&(i.querySelector(".popup__avatar").classList.remove("hidden"),i.querySelector(".popup__avatar").src=n.author.avatar),n.offer.features.length){i.querySelector(".popup__features").classList.remove("hidden");const o=i.querySelectorAll(".popup__feature");for(let t=0;t<o.length;t++)for(let i=0;i<n.offer.features.length;i++)if(o[t].classList.contains(e[n.offer.features[i]])){o[t].classList.remove("hidden");break}}if(n.offer.photos.length){i.querySelector(".popup__photos").classList.remove("hidden");let e=i.querySelector(".popup__photo");if(e.src=n.offer.photos[0],n.offer.photos.length>1){const o=document.createDocumentFragment();for(let t=1;t<n.offer.photos.length;t++)o.appendChild(e.cloneNode(!0)).src=n.offer.photos[t];e.parentElement.appendChild(o)}}return i})(n)),i})(n[r]);i.querySelector(".popup__close").addEventListener("click",window.map.removeActiveCard),document.addEventListener("keydown",window.util.onPopupEscPress),window.pin.mapNode.insertBefore(i,window.activate.mapFiltersNode)}))}))}}})(),(()=>{const e={circle:{WIDTH:62,HEIGHT:62},pin:{WIDTH:62,HEIGHT:84}},o=630,t=130,n=window.pin.mapNode.offsetWidth-e.pin.WIDTH/2,i=-e.pin.WIDTH/2;window.map.mapPinMain.addEventListener("mousedown",(r=>{if(r.button===window.util.MouseButtons.MAIN){r.preventDefault();let a={X:r.clientX,Y:r.clientY};const s=r=>{r.preventDefault();const s=a.X-r.clientX,d=a.Y-r.clientY,p=window.map.mapPinMain.offsetLeft-s,c=window.map.mapPinMain.offsetTop-d;a={X:r.clientX,Y:r.clientY},p>=i&&p<=n&&(window.map.mapPinMain.style.left=p+"px"),c>=t&&c<=o&&(window.map.mapPinMain.style.top=c+"px"),window.form.passAddressInput(e.pin.WIDTH,e.pin.HEIGHT)},d=e=>{e.preventDefault(),window.pin.mapNode.removeEventListener("mousemove",s),document.removeEventListener("mouseup",d)};window.pin.mapNode.addEventListener("mousemove",s),document.addEventListener("mouseup",d)}})),window.move={MainPinSize:e}})(),(()=>{const e=["gif","jpg","jpeg","png"],o=window.form.node.querySelector(".ad-form-header__input"),t=window.form.node.querySelector(".ad-form__input"),n=(o,t)=>{const n=o.files[0],i=n.name.toLowerCase();if(e.some((function(e){return i.endsWith(e)}))){let e=new FileReader;e.addEventListener("load",(()=>{t.classList.remove("hidden"),t.src=e.result})),e.readAsDataURL(n)}};o.addEventListener("change",(()=>{n(o,window.reset.previewAvatarNode)})),t.addEventListener("change",(()=>{n(t,window.reset.previewRoomNode)}))})(),window.activate.toggleDisabledOnFormNodes(),window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH,window.move.MainPinSize.circle.HEIGHT),window.map.mapPinMain.addEventListener("mousedown",window.activate.onPinMainMousedownPress,{once:!0}),window.map.mapPinMain.addEventListener("keydown",window.activate.onPinMainEnterPress,{once:!0})})();