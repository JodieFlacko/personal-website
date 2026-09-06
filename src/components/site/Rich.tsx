/** Renders `**double asterisks**` from the dictionaries as <strong>.
 *
 *  The house style bolds the specific and load-bearing phrase inside a
 *  sentence — a figure, a caveat, the word *estimated* — rather than whole
 *  sentences, and a plain string cannot carry that. This is the smallest thing
 *  that lets both locales mark their own emphasis without a Markdown
 *  dependency.
 *
 *  It survives the scroll runtime's word splitter, which walks text nodes and
 *  leaves inline elements in place. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        // Odd indices are the captured groups: the emphasised runs.
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
      )}
    </>
  );
}
