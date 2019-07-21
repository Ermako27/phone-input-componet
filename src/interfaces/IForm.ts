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
export interface PhoneFormState {
    error: boolean;
}

/**
 * Интерфейс для класса формы
 */
export interface FormClass {
    createForm(): HTMLDivElement;
};
