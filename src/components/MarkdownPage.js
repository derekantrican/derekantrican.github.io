import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

//Using the example from https://github.com/remarkjs/react-markdown?tab=readme-ov-file#use-custom-components-syntax-highlight
//that should also provide syntax highlighting
export function MarkdownPage(props) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} 
      children={props.content}
      components={{
        code(codeProps) {
          const {children, className, node, ...rest} = codeProps
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={dark}
            />
          ) : (
            <code style={{backgroundColor: 'lightgray', borderRadius: 6, color: 'gray', padding: 4}} {...rest} className={className}>
              {children}
            </code>
          )
        },
        img(imgProps) {
          return <img style={{...props.imageStyles}} {...imgProps}/>;
        }
      }}/>
  );
}