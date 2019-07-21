import PhoneForm from 'phone-input-componet';
import 'phone-input-componet/styles/styles.css';
let toggler = true;
const mask = '+7(985)*II-**-II';

const phoneForm = new PhoneForm(mask);
const form = document.createElement('form');

const submitButtonDiv = document.createElement('div');
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.innerText = 'Отправить';
submitButtonDiv.appendChild(submitButton);

form.appendChild(phoneForm.createForm());
form.appendChild(submitButtonDiv);
form.onsubmit = event => {
    event.preventDefault();
    phoneForm.setState({error: toggler});
    toggler = !toggler;
};


const root = document.getElementById('root');
root.appendChild(form);
