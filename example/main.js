import PhoneComponent from 'phone-input-componet';
import 'phone-input-componet/styles/styles.min.css';

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
