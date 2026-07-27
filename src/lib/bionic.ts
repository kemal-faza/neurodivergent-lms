/**
 * Bionic reading: bold the first half of each word to create a "fixation point"
 * that research suggests helps dyslexic readers. Returns an HTML string where
 * the first half of every word is wrapped in <b>. Consumers render it with
 * dangerouslySetInnerHTML inside an element that carries the `bionic` class
 * (CSS bolds <b>). See globals.css.
 *
 * Example: toBionic("hello world") -> "<b>hel</b>lo <b>wor</b>ld"
 */
export function toBionic(text: string): string {
  return text
    .split(/(\s+)/)
    .map((token) => {
      if (token.length === 0 || /^\s+$/.test(token)) return token;

      // Count alphabetic letters to know where the midpoint falls.
      let letterCount = 0;
      let splitIndex = 0;
      for (let i = 0; i < token.length; i++) {
        if (/[A-Za-z]/.test(token[i])) letterCount++;
        if (letterCount > 0 && letterCount === Math.ceil(countLetters(token) / 2)) {
          splitIndex = i + 1;
          break;
        }
      }
      if (splitIndex === 0) splitIndex = token.length;

      const first = token.slice(0, splitIndex);
      const rest = token.slice(splitIndex);
      return `<b>${first}</b>${rest}`;
    })
    .join("");
}

function countLetters(token: string): number {
  return (token.match(/[A-Za-z]/g) || []).length;
}
