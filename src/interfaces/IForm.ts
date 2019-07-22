import {
    FormElementsProps,
} from './IFormElement';

export interface MaskLegend {
    I: FormElementsProps;
    X: FormElementsProps;
    '*': FormElementsProps;
    [propName: string]: FormElementsProps;
}

/**
 * Состояние компонента
 */
export interface PhoneComponentState {
    error: boolean;
}

export interface FormValue {
    maskNumber: string; // В маске I заменяются на введенные числа
    rawNumber: string; // Строка введеных символов без пробелов '5535'
}

/**
 * Интерфейс для класса формы
 */
export interface FormClass {
    createForm(): HTMLDivElement;
    setState({error}: {error?: boolean}): void;
    getFormValue(): FormValue;
};
