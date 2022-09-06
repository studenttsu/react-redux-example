 /**
 * Спрягает слова взависимости от значения.
 *
 * @example declensionOfWord(age, ['год', 'года', 'лет'])
 * @param number - значение
 * @param titles - фразы для спряжения
 */
 export function declensionOfWords(number: number, titles: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
        ];
}