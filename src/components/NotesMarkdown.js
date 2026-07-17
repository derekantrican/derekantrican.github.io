import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Renders full block-level markdown (paragraphs, bullet/numbered lists, bold, italic, links)
// for multi-line content like recipe notes. Unlike InlineMarkdown, this keeps <p>/<ul>/<ol>
// as real block elements, so it should not be nested inside another <p> or <li>.
export function NotesMarkdown(props) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={{
      a: (aProps) => <a href={aProps.href} target='_blank' rel='noreferrer'>{aProps.children}</a>,
    }}>
      {props.children}
    </Markdown>
  );
}
