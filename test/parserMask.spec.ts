import parseMask from '../src/utils/maskParser';
import {FormElementsProps} from '../src/interfaces/IFormElement';

describe('parsing mask', (): void => {
    it('checking all types of symbols', (): void => {
        const result: FormElementsProps[] = parseMask('IX*7+a');
        expect(result).toEqual([
            {
                style: 'phone-block__input_normal',
                value: '',
                state: 'normal',
                element: 'input',
            },
            {
                style: 'phone-block__input_disabled',
                value: 'X',
                state: 'disabled',
                element: 'input',
            },
            {
                style: 'phone-block__input_disabled',
                value: '●',
                state: 'disabled',
                element: 'input',
            },
            {
                value: '7',
                style: 'phone-block__input_disabled',
                state: 'disabled',
                element: 'input',
            },
            {
                value: '+',
                style: 'phone-block__symbol-span',
                element: 'span',
            },
            {
                value: 'a',
                style: 'phone-block__symbol-span',
                element: 'span',
            },
        ]);
    });

    it('empty mask', (): void => {
        expect((): FormElementsProps[] => parseMask(''))
            .toThrowError(/Your mask is empty/);
    });

    it('mask with spaces', (): void => {
        const result: FormElementsProps[] = parseMask('1 X +');
        expect(result).toEqual([
            {
                value: '1',
                style: 'phone-block__input_disabled',
                state: 'disabled',
                element: 'input',
            },
            {
                style: 'phone-block__input_disabled',
                value: 'X',
                state: 'disabled',
                element: 'input',
            },
            {
                value: '+',
                style: 'phone-block__symbol-span',
                element: 'span',
            },
        ]);
    });

    it('mask consisting only of spaces', (): void => {
        expect((): FormElementsProps[] => parseMask('   '))
            .toThrow(/Your mask is empty/);
    });
/**
 * не могу передать в функцию аргумент неправильного типа
 * так как тест написан на ts и он сам производит проверку типов,
 * но из js это потенциальная ошибка
 */
    // it('not string', (): void => {
    //     const resultNum: FormElementsProps[] = parseMask(1);
    //     cosnt resultArray: FormElementsProps[] = parseMask([1, 2]);
    // });
});
