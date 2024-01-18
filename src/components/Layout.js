import { Sidebar } from "./Sidebar";
import { useIsMobile } from "../hooks/isMobile";
import { useEffect, useState, React } from "react";
import { useLocation } from "react-router-dom";

export function Layout(props) {  
  const isMobile = useIsMobile();
  const [isSidepanelOpen, setIsSidePanelOpen] = useState(false); //Todo: close panel after a NavLink is clicked

  const location = useLocation();

  useEffect(() => {
    setIsSidePanelOpen(false)
  }, [location]);

  return isMobile ? (
    <div style={{height: '100%'}}>
      <div style={{display: 'flex', alignItems: 'center', height: 40, padding: 5, backgroundColor: '#3f3f3f'/*Todo: make navbar sticky (only things below navbar should scroll)*/}}>
        <i style={{fontSize: '35px', marginRight: 10}} className='bi bi-list' onClick={() => setIsSidePanelOpen(!isSidepanelOpen)}/>
        <h2>{props.title}</h2>{/*Todo: should reflect the active page name*/}
      </div>
      <Sidebar isOpen={isSidepanelOpen} togglePanel={() => setIsSidePanelOpen(!isSidepanelOpen)}/>
      <div style={isSidepanelOpen ? {overflow: 'hidden', height: '100%'} : {}/*Limit scroll to sidepanel only when sidepanel is open*/}>
        {props.children}
      </div>
    </div>
  ) : (
    <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
      <Sidebar isOpen={true}/>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', overflow: 'hidden'}}>
        {props.children}
      </div>
    </div>
  );
}