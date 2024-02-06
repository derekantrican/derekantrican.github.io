import '../styles/turkishResources.css';

export function TurkishResources() {
  return (
    <div className='turkishResources' style={{height: 'calc(100% - 40px)', padding: '20px 10%', overflowY: 'auto'}}>
      <h1>Introduction to the Turkish language</h1>
      <h2>Alphabet</h2>
      <p>One of the great things about Turkish is that it uses Latin characters. There are just a few key differences:</p>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <table className='borders'>
          <tr>
            <td>
              <h1 style={{fontWeight: 'normal', textAlign: 'center', fontFamily: 'serif'}}>Çç</h1>
            </td>
            <td style={{verticalAlign: 'middle'}}>
              Pronounced like “ch”<br/><i>Example: çay (“chai” - tea)</i>
            </td>
          </tr>
          <tr>
            <td>
              <h1 style={{fontWeight: 'normal', textAlign: 'center', fontFamily: 'serif'}}>Şş</h1>
            </td>
            <td style={{verticalAlign: 'middle'}}>
              Pronounced like “sh”<br/><i>Example: şeker (“sheh-ker” - sugar)</i>
            </td>
          </tr>
          <tr>
            <td>
              <h1 style={{fontWeight: 'normal', textAlign: 'center', fontFamily: 'serif'}}>İi</h1>
            </td>
            <td style={{verticalAlign: 'middle'}}>
              This is an “i” with a dot.<br/>Pronounced like “i” or “e”<br/><i>Example: iyi (“e-yi” - good)</i>
            </td>
          </tr>
        </table>
        <table className='borders'>
          <tr>
            <td>
              <h1 style={{fontWeight: 'normal', textAlign: 'center', fontFamily: 'serif'}}>Cc</h1>
            </td>
            <td style={{verticalAlign: 'middle'}}>
              Pronounced like “j”<br/><i>Example: ceket (“je-ket” - jacket)</i>
            </td>
          </tr>
          <tr>
            <td>
              <h1 style={{fontWeight: 'normal', textAlign: 'center', fontFamily: 'serif'}}>Ğğ</h1>
            </td>
            <td style={{verticalAlign: 'middle'}}>{/*Todo: rather than breaking in the middle, maybe make a max width*/}
              This is a silent letter. It comes after a vowel<br/>and makes the previous vowel's sound longer.<br/><i>Example: yağ (“yaah” - oil)</i>
            </td>
          </tr>
          <tr>
            <td>
              <h1 style={{fontWeight: 'normal', textAlign: 'center', fontFamily: 'serif'}}>Iı</h1>
            </td>
            <td style={{verticalAlign: 'middle'}}>
              This is an “i” without a dot.<br/>Pronounced like “uh”<br/><i>Example: balık (“ba-luk” - fish)</i>
            </td>
          </tr>
        </table>
      </div>
      <p>
        There are a couple other letter differences like ü & ö but they're close enough to English characters that, as a beginner, you can assume they're the same.
      </p>
      <p>
        Another great thing is that Turkish letters always have the same sound. So to say “hello” you say “Merhaba”. An English speaker might pronounce that
        “Mehr-hah-buh” but it's pronounced “Mehr-ah-bah” (with both the “a”s making the same sound).
      </p>
      <h2>Word Order / Structure</h2>
      <p>
        English is a subject-verb-object language (eg “I eat the sandwich”) whereas Turkish is a subject-object-verb language (eg “Ben sandviç yerim” → “I sandwich eat”).
      </p>
      <p>
        Like German, Turkish can have some long words. This is because Turkish adds suffixes to the base word for all kinds of meanings (possession, tense, plural,
        subject, object, etc). For instance, the word “hizmetinizdeyim” is the base word “hizmet” (service) and contains suffixes for “your”, “I”, and “at” to
        make “I am at your service”.
      </p>
      <h2>Pronunciation</h2>
      <p>
        Turkish seems to want to pronounce every consonant. This can help figure out where to break a word up into syllables but can also end up with some interesting
        word pronunciations even if the word is borrowed from English. For instance: “Skype” → “Sih-kee-pay” or “Stan” → “Suh-tahn”
      </p>
      <h2>Basics</h2>
      <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
        <table>
          <tr>
            <td>Hello</td>
            <td>Merhaba (Merh-a-ba)</td>
          </tr>
          <tr>
            <td>Thank you</td>
            <td>Teşekkür ederim<br/>(Teh-shek-kur eh-der-eem)</td>
          </tr>
          <tr>
            <td>Tea</td>
            <td>Çay (Chai)</td>
          </tr>
          <tr>
            <td>Yes</td>
            <td>Evet (Eh-vet)</td>
          </tr>
          <tr>
            <td>I am ______</td>
            <td>Ben ______</td>
          </tr>
        </table>
        <table>
          <tr>
            <td>Bye</td>
            <td>Hosça kal (Hos-cha kal)</td>
          </tr>
          <tr>
            <td>Nice to meet you</td>
            <td>Memnum oldum<br/>(Maym-nuum Old-um)</td>
          </tr>
          <tr>
            <td>Please</td>
            <td>Lütfen (Lute-fen)</td>
          </tr>
          <tr>
            <td>No</td>{/*Todo: rather than breaking in the middle, maybe make a max width*/}
            <td>Hayır (Hi-uhr, but pronounced as one<br/>syllable, almost as if exhaling)</td>
          </tr>
        </table>
      </div>
      <h2>Cognates</h2>
      <p>
        Cognates are words where the word is similar (or the same) in Turkish as in English. Turkish has a LOT of cognates (in fact, there are lists of over 3000 online)!
        Here are just a few examples (can you guess what they mean?): kedi, ceket, brokoli, avokado, basketbol, helikopter, telefon, vanilya, çikolata, porsiyon, orijinal.
      </p>
      <h1>Tips for going to a Turkish house</h1>
      <p>
        Turks are very hospitable people! They value personal relationships very highly and are almost always open to hanging out. If you get invited to a dinner at their
        house - you're in for a treat! Here are some tips to make the best impression:
      </p>
      <ul>
        <li>
          <strong>Show up with a gift</strong><br/>
          As Americans, we're probably familiar with the idea of hostess gifts. In Turkish culture, it's much the same (though don't bring wine): always show up with a gift,
          even if it's a small one. You can ask ahead of time if you can bring a dish, but they might refuse (they are hosting you after all). Flowers work, but the best gift
          is a small item that carries some sort of meaning - whether it was the subject of an earlier conversation, something meaningful to your family/childhood, or
          something that you consider part of your “culture” that you want to share (just check to make sure it's Halal).
        </li>
        <li>
          <strong>Take off your shoes outside the door</strong><br/>
          Similar to what you might know of Asian culture, it is customary to take your shoes off before entering the house. You may even be provided with a pair of slippers
          to wear around the house! Outside is viewed as dirty (think of the dirtiest alley you've seen) so Turks never sit on the ground outside or wear their shoes inside.
        </li>
        <li>
          <strong>Greet your hosts gender-alike</strong><br/>
          When you enter the house, you will likely be greeted with “Hoş geldiniz!” (Welcome! Literally: You came well) and you can reply with “Hoş bulduk!” (Glad to
          be here! Literally: We found it well). While less-personable greetings like words or a wave are fine across genders, physical greetings (like a handshake or hug)
          should be limited to man-to-man or woman-to-woman. Though this can vary from person to person, so as a general rule, let them initiate physical greetings.
        </li>
        <li>
          <strong>If you're headed there for dinner, don't eat beforehand</strong><br/>
          The most common way that Turks show hospitality is by feeding you and if you're headed there for a meal there is likely to be an abundance of food! Don't
          make the same mistake we have made by eating a quick snack beforehand when you thought it was going to be “just dessert”.
          <p>
            Unless you have an allergy, it is kind to try some of everything. You don't have to eat everything offered to you, but if you serve yourself you should finish
            what you took. Don't be surprised if they offer you more food multiple times after you're done eating (even if they fill up your plate/glass for you) - in their
            culture, an empty plate is a sign that you might still be hungry and a host would never let their guest leave hungry.
          </p>
        </li>
        <li>
          <strong>If you're able, be willing to stay late</strong><br/>
          There have been numerous times we've hung out at our friend's houses well after dinner. Dinner's great, and there's good conversation, but the best conversations
          happen over many glasses of tea late into the night. It's been more than a few times that we've stayed past midnight, deep in conversation about religion,
          humanitarian movements, philosophy, and more! (Plus, it's a sign to your host that you enjoy their company and aren't trying to just be nice and get out of there).
        </li>
      </ul>
      <p style={{marginTop: 35}}>
        <i><strong>Pro tip:</strong> Say “Ellerine Sağlık” (Eh-ler-ih-nay Sah-luk) as “Bless your Hands” (when speaking to the cook) and “Afiyet Olsun” (Ah-fee-yet Ol-suhn) as “Bon Appetit”.</i>
      </p>
      <p style={{marginTop: 35}}>
        At the end of your enjoyable time, invite them over to your place (you don’t have to have a date immediately) and make them one of your favorite American dishes
        (Halal, of course)!
      </p>
    </div>
  );
}