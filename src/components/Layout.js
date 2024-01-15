import { Sidebar } from "./Sidebar";

export function Layout(props) {
    return (
      <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
        <Sidebar/>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {props.children}
        </div>
      </div>
    );
}