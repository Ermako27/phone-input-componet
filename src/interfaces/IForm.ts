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
 * Интерфейс для класса формы
 */
export interface FormClass {
    createForm(): HTMLFormElement;
};
