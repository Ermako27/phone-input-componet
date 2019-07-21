import PhoneForm from 'phone-input-componet';
import 'phone-input-componet/styles/styles.css';

const mask = '+7(985)*II-**-II';

const phoneForm = new PhoneForm(mask);
const root = document.getElementById('root');
root.appendChild(phoneForm.createForm());
