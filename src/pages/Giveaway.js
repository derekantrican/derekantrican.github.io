import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/isMobile";
import Zoom from 'react-medium-image-zoom';

export function Giveaway() {
  const [items, setItems] = useState([]);
  const [contact, setContact] = useState(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    (async function getItems() {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzcYtW1EiuGtBC8X49UEh8HectYlD882rW42rJwV6VYixYgAlepZ4t2Pin8hlDUdYe7/exec');
      let data = await response.json();
      console.log(data);

      const includeSensitive = document.location.search.includes('sensitive');
      if (!includeSensitive) {
        data = data.filter(i => !i.sensitive);
      }

      setItems(data);
    })();
  }, []);

  const requestItem = async (item) => {
    if (!contact) {
      alert('Please put some contact info in the box at the top');
      return false;
    }

    console.log(`${contact} requested ${item}`);
    await fetch('https://script.google.com/macros/s/AKfycbzSbnYebCUPam1CkMgkD65LzTF_EQIbxFAGBeSZpqS4Shg36m8/exec?' +
      `subjectonly=${encodeURIComponent('A giveaway item has been requested')}&` +
      `messageonly=${encodeURIComponent(`${contact} has requested ${item}`)}`);

    return true;
  }

  return (
    <div>
      <div id="header" style={{margin: isMobile ? 20 : 50}}>
        <div>
          As Helene & I prepare to move across the world, we're starting to go through our belongings and choose what to keep, what to store,
          and what to give away. Below is a list of things that we have chosen to give away. If you would like any of these things, click the
          "Request" button for each item and we'll reach out to you.
        </div>
        <div style={{marginTop: 20}}>
          You can click on each picture to see it bigger.
        </div>
        <div style={{display: 'flex', flexDirection: isMobile ? 'column': 'row', alignItems: 'center', marginTop: 40, gap: 20}}>
          <div>Your name/contact (to give you the items):</div>
          <input style={{height: 20, width: isMobile ? '100%' : 400}} type="text" onChange={e => setContact(e.target.value)}/>
        </div>
      </div>
      <div style={{display: 'flex', flexFlow: 'wrap'}}>
        {items.length === 0 ?
          <div style={{margin: 'auto'}}>Loading...</div>  
        : items.map(i => <Item key={i.url} url={i.url} description={i.description} requestItem={requestItem}/>)}
      </div>
    </div>
  );
}

const Item = (props) => {
  const [itemPicked, setItemPicked] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div style={{width: 300, height: 450, display: 'flex', flexDirection: 'column', padding: 10, margin: isMobile ? '5px auto' : 10, border: '1px solid white', borderRadius: 20}}>
      <Zoom classDialog="zoom-modal" zoomMargin={isMobile ? 10 : 45}>
        <img style ={{height: 350, width: '100%', marginBottom: 10, objectFit: 'contain'}} src={props.url}/>
      </Zoom>
      {props.description ? <div style={{margin: 'auto 10px 10px 10px'}}>{props.description}</div> : null}
      <button style={{height: 30, backgroundColor: 'dodgerblue', borderRadius: 10, margin: 'auto 5px 5px 5px'}}
        disabled={itemPicked}
        onClick={async () => {
          const result = await props.requestItem(props.url);
          if (result) {
            setItemPicked(true);
          }
        }}>
        {itemPicked ? 'Requested' : 'Request'}
      </button>
    </div>
  );
}