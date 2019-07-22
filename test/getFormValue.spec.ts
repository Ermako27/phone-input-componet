import PhoneComponent from '../src/components/component';
import {ComponentValue} from '../src/interfaces/IComponent';
/**
 * @param {string} style css класс
 * @param {boolean} error state
 * @param {string} mask
 * @param {string} inputValue
 * @param {ComponentValue} expected
 */
function testTemplate(
    style: string,
    error: boolean,
    mask: string,
    inputValue: string,
    expected: ComponentValue,
): void {
    const phoneComponent = new PhoneComponent(mask);
    phoneComponent.setState({error});
    document.body.appendChild(phoneComponent.createComponent());

    const elementsToHarvest: NodeListOf<HTMLInputElement> = document
        .querySelectorAll(
            `.phone-block__input > ${style}`
        );

    elementsToHarvest.forEach((elem: HTMLInputElement): void => {
        elem.value = inputValue;
    });

    const result: ComponentValue = phoneComponent.getComponentValue();
    expect(result).toEqual(expected);
}

/**
 * @param {string} style css класс
 * @param {boolean} error state
 * @param {string} mask
 * @param {string} inputValue
 * @param {ComponentValue} expected
 */
function notFullInputTemplate(
    style: string,
    error: boolean,
    mask: string,
    inputValue: string,
    expected: ComponentValue,
): void {
    const phoneComponent = new PhoneComponent(mask);
    phoneComponent.setState({error});
    document.body.appendChild(phoneComponent.createComponent());

    const inputElement: HTMLInputElement = document
        .querySelector(
            `.phone-block__input > ${style}`
        );

    inputElement.value = inputValue;

    const result: ComponentValue = phoneComponent.getComponentValue();
    expect(result).toEqual(expected);
}

describe('get value from component', (): void => {
    it('get value from component in normal state',
        (): void => testTemplate(
            '.phone-block__input_normal',
            false,
            '+7(985)0II-**-**',
            '9',
            {
                maskNumber: '+7(985)099-**-**',
                rawNumber: '99',
            }
        )
    );

    it('get value from component in error state',
        (): void => testTemplate(
            '.phone-block__input_error',
            true,
            '+7(985)0II-**-**',
            '9',
            {
                maskNumber: '+7(985)099-**-**',
                rawNumber: '99',
            }
        )
    );
    it('get value from empty component in normal state',
        (): void => testTemplate(
            '.phone-block__input_normal',
            false,
            '+7(985)0II-**-**',
            '',
            {
                maskNumber: '+7(985)0II-**-**',
                rawNumber: '',
            }
        )
    );

    it('get value from empty component in error state',
        (): void => testTemplate(
            '.phone-block__input_error',
            true,
            '+7(985)0II-**-**',
            '',
            {
                maskNumber: '+7(985)0II-**-**',
                rawNumber: '',
            }
        )
    );
    it('get value from component with empty and filled inputs in normal state',
        (): void => notFullInputTemplate(
            '.phone-block__input_normal',
            false,
            '+7(985)0II-**-**',
            '9',
            {
                maskNumber: '+7(985)09I-**-**',
                rawNumber: '9',
            }
        )
    );

    it('get value from component with empty and filled inputs in error state',
        (): void => notFullInputTemplate(
            '.phone-block__input_error',
            true,
            '+7(985)0II-**-**',
            '9',
            {
                maskNumber: '+7(985)09I-**-**',
                rawNumber: '9',
            }
        )
    );
});
