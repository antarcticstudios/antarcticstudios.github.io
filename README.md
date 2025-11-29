# Alex McVittie's studio portfolio source code

Hello! Thanks for stopping by. I hope you find this repo to be useful for your own portfolio page. Please do use whatever you want from this (except for my credits - that would be really weird to say you played keyboard on songs that I played on... lol.) 

This page is served live via github pages at [https://antarcticstudios.ca](https://antarcticstudios.ca) and features a very slick portfolio player, some nice pictures of the space, Google reviews (via Elfsight), contact form (Via formspring), a full gearlist, and of course a bio. 

## Some screenshots 

<img width="1412" height="903" alt="image" src="https://github.com/user-attachments/assets/7dfde015-ca7e-4997-b6e4-8707179ba66a" />

<img width="1400" height="914" alt="image" src="https://github.com/user-attachments/assets/37c143d0-7f3b-4b97-954f-d77cf0f60984" />

<img width="1407" height="907" alt="image" src="https://github.com/user-attachments/assets/5290ad78-8554-4003-a0c3-529ba7be6be7" />

## Usage and alterations

If you want to use this for your own use, there are a few spots you'll likely want to modify. 

### tracks.js 

This is what feeds the magical portfolio player. There are two data structures in this, `heirarchy` and `tracks`. 

#### heirarchy object 

This is a JSON object that lets you control what you consider to be sub-credits. For instance, I have a broad category of "Production" which encompasses producing, writing, engineering, scoring, and orchestrating. Similarly, I have lots of rock credits so youc can select "rock" as your broad genre and then narrow down to metal. 

#### tracks object 

This is where each tile or item in the playlist gets pulled from. The creditsBroad and genresBroad are not visible and exposed to the user on each tile, but rather credits and genre is. Just upload your audio to the audio/ directory, artwork to the artwork/ directory, pop in the title & what you did, and the javascript does its magic! 

Additionally, if you have some portfolio builder stuff where you didn't do the official mix, but have the permission to showcase it on your portfolio, add a `disclaimer` to your track. E.g.:
```
const tracks = [
  {
    title: "Nickelback - San Quentin",
    file: "audio/Nickelback_San_Quentin_PRACTICE_MIX.mp3",
    artwork: "img/portfolio/NBSQ.webp",
    creditsBroad: ["Mixing & Mastering"],
    genresBroad: ["Rock"],
    credits: ["Mixing"],
    genres: ["Post-grunge"],
    disclaimer: "Not the official mix.\nCourtesy of Cool Mixing School. Official mix done by Chris Baseford."
  }
  ]
```
<img width="278" height="431" alt="image" src="https://github.com/user-attachments/assets/f06ee4ef-971f-4259-8d90-f01a587aa104" />

And on mobile: 
<img width="609" height="146" alt="image" src="https://github.com/user-attachments/assets/e2e66e41-fd8e-412f-a617-7119cd6a93db" />

I recommend converting your album art to .webp or finding other ways to optimize the file size so that load times are minimal. 

### gallery.js 

You should only need to modify the `galleryImages` object. 

### style.css 

This is a mess. You might want to find my instances of Antarctic Studio blue (ccffff) and replace with your brand colour. 


### script.js 

I have a handy function in here `updateInstrumentYears()` that lets the main page auto update how many years I've been doing stuff for rounded to the nearest 5 years. Lets me not maintain that! 

Aside from this function there shouldn't be anything else that needs to be updated. 

### index.html 

Everything in the <head> section will need updating to match your studio info. 

The about section will need a new bio for you. 

Portfolio section should work without any modifications here. See the tracks.js writeup above. 

Reviews will need a new Elfsight link, or other form of displaying reviews. 

Studio gallery can remain untouched. See gallery.js writeup above. 


Contact section just needs a new formspree action link - don't have your leads trip up and send me an email! Also all the info under the form will need updating. 

Gear list wll also need updating, or you can just delete it if you don't feel like showcasing it. 



