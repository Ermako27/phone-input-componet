import './styles/styles.css';
import PhoneForm from './components/form';

const mask = '+7(985)*II-**-II';

const phoneForm: PhoneForm = new PhoneForm(mask);

const root: any = document.getElementById('root');
root.appendChild(phoneForm.createForm());
