import Markdown from 'react-markdown';

// Renders a single line of markdown (bold, italic, links) without wrapping it in a <p>,
// so it's safe to use inside <li>, <span>, or other inline-flow parents.
export function InlineMarkdown(props) {
  return (
    <Markdown components={{
      p: (pProps) => <>{pProps.children}</>,
      a: (aProps) => <a href={aProps.href} target='_blank' rel='noreferrer'>{aProps.children}</a>,
    }}>
      {props.children}
    </Markdown>
  );
}
