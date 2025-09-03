import '../styles/birthday.css'
import { MarkdownPage } from '../components/MarkdownPage';

export function Birthday() {
  const content = `
  # Birthday freebies

  Every year on my birthday, I try to take advantage of several rewards programs to get free food. Some people have asked for my list, so I'm providing it here.
  This is not a comprehensive list, this is just the ones that I use (for a more comprehensive list, you can check out something like https://www.thepennyhoarder.com/save-money/birthday-freebies).

  Because I have a substantial amount of things on this list (which would be impossible to collect all on your birthday), I've organized it by "expiration": how long the reward
  is available.

  ***Note that some of these may require using the app or printing off a coupon beforehand***

  *Also, for some of these, simply creating a "rewards account" is not enough as it doesn't ask for your birthday. You have to go into your account, set your birthday, and maybe even opt-in to emails.*

  *Several of these will give you an equivelant offer (eg free drink or free meal) just by signing up for the rewards program*
  
  
  ## Only available on birthday:
  - **Starbucks** free drink or treat
  - **Mercury's Coffee** free drink (they have a loyalty program, but there doesn't appear to be any points added for your birthday. Instead, they just recommend going to any location in person & telling them it's your birthday)
  - **Jamba** free smoothie *Note: 15 point ($15) account balance minimum required BUT if you just go in and play dumb you may be able to get it anyway (often they ask for you to scan with the app and if you don't have the app they often just skip any other verification)*
  
  
  ## Available for a week after birthday (and sometimes available starting a week before your birthday as well):
  - **Auntie Anne's** free pretzel *(You need to have spent $10 within the year or you don't get it)*
  - **Panera** free pastry
  - **Cold Stone** $5 birthday credit
  - **Nothing Bundt Cakes** free bundtlet (they don't scan anything, they just ask to see the email. So you may be able to redeem the same reward at multiple locations)
  - **Baskin Robbins** free kid's scoop
  - **Cinnabon** free treat *Note: the treat may change from year to year*
  
  ## Available for 2-3 weeks after birthday:
  - **Arby's** free dessert (ONLINE ONLY)
  - **Carl's Jr** free sandwich with $15 purchase
  
  ## Available entire birthday month (or for a month after your birthday):
  - **Red Robin** free burger with $4.99 purchase
  - **Qdoba** free queso & chips
  - **PF Chang's** free appetizer or dessert of your choice (I think they have one appetizer that's ribs so it's basically a meal)
  - **Taco Bell** free Baja Blast Freeze
  - **Denny's** free grand slam
  - **Buffalo Wild Wings** Free 6 count wings
  - **Sonic** free small shake with purchase
  - **A&W** free root beer float
  - **Krispy Kreme** free 3 glazed donuts
  - **Wetzel's Pretzels** free pretzel
  - **Black Bear Diner** free "Bear's Choice Breakfast" ("choice" as in - you can choose pancakes/french toast/waffles/etc)
  - **Great Harvest Bread** Free "Goodie"
  
  ## Available for longer than a month:
  - **IHOP** *technically, IHOP gives you 5 "pancoins", but they can be redeemed for a voucher for a stack of pancakes that is good for a year*
  `;

  return (
    <div className='birthday' style={{height: 'calc(100% - 40px)', overflowWrap: 'anywhere', padding: '20px 10%', overflowY: 'auto'}}>
      <MarkdownPage content={content}/>
    </div>
  );
}