import '../styles/halalTips.css';
import { MarkdownPage } from '../components/MarkdownPage';

export function HalalTips() {
  const content = `
  # Tips on making a dish Halal

  If you are making a dish to bring to a Muslim's house or a potluck with Muslims, you should make it Halal so that they can freely enjoy it!

  This site is a great overview of what constitutes Halal, the purpose behind it, etc: [What is halal|_blank](https://www.foodnetwork.com/how-to/packages/food-network-essentials/what-is-halal)

  Here are some quick tips:
  - Avoid any pork or pig products (eg ham, bacon fat, etc)
  - If your dish contains meat, purchase meat from a Halal market (reference Google Maps)
    - Fish is halal for almost all Muslims, but shellfish (shrimp, crab, etc.) is fine for some but not others — ask
  - Use vegetable broth or Halal bouillon instead of meat broth
  - If your dish does not contain meat, watch out for some of the following Haram (non-Halal) ingredients:
    - Gelatin (marshmallows, jello, etc). Halal gelatin exists, but usually American gelatin-based products are not halal.
    - Alcohol ingredients (some salad dressings, some BBQ sauces, some mustards, vanilla extract*, etc)
      - “White/Red wine vinegar” is usually fine, but any other mention of “wine”, “chardonnay”, etc is probably not
    - Animal rennet (most common cheeses should be fine - it's usually just fancy cheese like parmigiano-reggiano)
    - Shortening/lard (a lot of times shortening is plant-based, but good to double-check)
  - If looking for Halal food/ingredients online a couple sites you can use are:
    - [halalworlddepot.com|_blank](https://halalworlddepot.com) (they will ship Halal frozen turkeys, burgers, hotdogs, etc)
    - [basilgrocery.com|_blank](https://basilgrocery.com)
  - If you are unsure, you can often Google “is _____ halal”, or ask a Muslim!


  *Although the rules about alcohol typically apply to “can you get drunk from it”, some Muslims still consider vanilla extract to not be Halal because it contains a small
  amount of alcohol. The Islamic Food And Nutrition Council Of America says it is Halal, but each individual has their own “strictness”. You can get alcohol-free vanilla
  extract at Whole Foods.*

  Of course, every Muslim is different in how they observe Islam and especially “Halal”. One Muslim may be fine eating anything (even if the beef/chicken/etc is not strictly halal)
  as long as it's not pork. Another Muslim may be very strict in their observance, buying nothing from an American grocery store and only shopping at Mediterranean/Halal
  markets. Ultimately: ask the person you are making something for to determine what their observance is.
  `;

  return (
    <div className='halalTips' style={{height: 'calc(100% - 40px)', padding: '20px 10%', overflowY: 'auto'}}>
      <MarkdownPage content={content}/>
    </div>
  );
}