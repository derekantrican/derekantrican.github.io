import { HomePageNav } from "../components/NavBar";
import { useIsMobile } from "../hooks/isMobile";
import { baseUrl } from "../utils/utils";

export function Home() {
  const isMobile = useIsMobile();

  return (
    <div style={{height: '100%', width: '100%', overflow: 'hidden' /*There's some weird 5x scroll due to the video element. This hides it.*/}}>
      <video style={{height: '100%', width: '100%', objectFit: 'cover'}} autoPlay={true} loop={true} muted={true} playsInline={true}>
        <source src={`${baseUrl()}/forest_1080p.mp4`}/>
      </video>
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%'}}>
        <h1 style={{fontSize: isMobile ? '20vw' : 120, textAlign: 'center', marginBottom: 20}}>Derek Antrican</h1>{/*Todo: pick a better font - something that suits me better*/}
        <HomePageNav/>
      </div>
    </div>
  );
}

