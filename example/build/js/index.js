var e=new class{createElement(e){const t=document.createElement("div");t.className="phone-block__input";const n=document.createElement("input");return n.type="text",n.className=e.style,"disabled"==e.state?(n.disabled=!0,n.value=e.value):(n.placeholder="_",n.maxLength=1),t.appendChild(n),t}};var t=new class{createElement(e){const t=document.createElement("span");return t.className=e.style,t.innerText=e.value,t}};const n={I:{style:"phone-block__input_normal",value:"",state:"normal",element:"input"},X:{style:"phone-block__input_disabled",value:"X",state:"disabled",element:"input"},"*":{style:"phone-block__input_disabled",value:"●",state:"disabled",element:"input"}};function r(e,t=!1){const r=function(e){return Array.from(e).reduce((e,t)=>e+=" "!==t?t:"","")}(e);if(function(e){return ""===e}(r))throw Error("Your mask is empty");return n.I.style=t?"phone-block__input_error":"phone-block__input_normal",n.I.state=t?"error":"normal",Array.from(r).reduce((e,t)=>{if(t in n){const r=Object.assign({},n[t]);return e.push(r),e}if(/[0-9]/.test(t)){return e.push({value:t,style:"phone-block__input_disabled",state:"disabled",element:"input"}),e}return e.push({value:t,style:"phone-block__symbol-span",element:"span"}),e},[])}class PhoneComponent{constructor(e,t={error:!1}){this.mask=e,this.state=t;}setState({error:e=!1}){if(e!==this.state.error){const t=e?"phone-block__input_error":"phone-block__input_normal";document.querySelectorAll(`.phone-block__input > .${e?"phone-block__input_normal":"phone-block__input_error"}`).forEach(e=>{e.className=t;});const n=document.querySelector(".phone-block__error-message");e?n.classList.remove("phone-block__error-message_hide"):n.classList.add("phone-block__error-message_hide"),this.state.error=e;}}getComponentValue(){const e={maskNumber:"",rawNumber:""};let t=0;const n=document.querySelectorAll(`.phone-block__input > .${this.state.error?"phone-block__input_error":"phone-block__input_normal"}`);for(const r of this.mask)"I"===r?(e.maskNumber+=n[t].value.length?n[t].value:"I",e.rawNumber+=n[t].value,t+=1):e.maskNumber+=r;return e}createComponent(){const n=document.createElement("div"),o=document.createElement("div");o.className="phone-block",r(this.mask,this.state.error).forEach(n=>{if("input"===n.element){const t=e.createElement(n);o.appendChild(t);}else{const e=t.createElement(n);o.appendChild(e);}});const s=document.createElement("div");s.className="phone-block";const a=document.createElement("span");return a.classList.add("phone-block__error-message"),this.state.error||a.classList.add("phone-block__error-message_hide"),a.innerText="Неверный номер, попробуйте еще раз",s.appendChild(a),n.appendChild(o),n.appendChild(s),n}}

// import PhoneComponent from 'phone-input-componet';

let toggler = true;
const mask = '+7(985)0II-**-**';

const phoneComponent = new PhoneComponent(mask);
const form = document.createElement('form');

const submitButtonDiv = document.createElement('div');
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.innerText = 'Отправить';
submitButtonDiv.appendChild(submitButton);

form.appendChild(phoneComponent.createComponent());
form.appendChild(submitButtonDiv);

form.onsubmit = event => {
    event.preventDefault();
    phoneComponent.setState({error: toggler});
    console.log(phoneComponent.getComponentValue());
    toggler = !toggler;
};

const root = document.getElementById('root');
root.appendChild(form);
