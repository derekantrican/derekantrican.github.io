import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Link } from "react-router-dom";

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
        a(linkProps) {
          //Allow custom markdown to create a "open in new tab" link like [PCT 2015|_blank](http://pct.derekantrican.com)
          return <Link to={linkProps.href} target={linkProps.children.includes('|_blank') ? '_blank' : ''}>{linkProps.children.split('|')[0]}</Link>;
        },
        img(imgProps) {
          const altProps = imgProps.alt.split('|');
          const width = altProps.length > 1 ? altProps[1] : 'auto';
          const textAlign = altProps.length > 2 ? altProps[2] : 'none';
          return <img style={{width: width, float: textAlign, ...props.imageStyles}} {...imgProps} alt={imgProps.alt.split('|')[0]}/>;
        }
      }}/>
  );
}