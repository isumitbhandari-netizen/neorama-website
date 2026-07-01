import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, ChevronDown, ArrowRight } from "lucide-react";
import { PROJECT_ROUTES } from "../projectRoutes";

// @ts-ignore
import fbHero from "../assets/images/fb_campaign_hero.webp";
// @ts-ignore
import boomburgerThumb from "../assets/images/fb_boomburger_thumb.webp";
// @ts-ignore
import boomburger01 from "../assets/images/fb_boomburger_01.webp";
// @ts-ignore
import boomburger02 from "../assets/images/fb_boomburger_02.webp";
// @ts-ignore
import boomburger03 from "../assets/images/fb_boomburger_03.webp";
// @ts-ignore
import boomburger04 from "../assets/images/fb_boomburger_04.webp";
// @ts-ignore
import boomburger05 from "../assets/images/fb_boomburger_05.webp";
// @ts-ignore
import boomburger06 from "../assets/images/fb_boomburger_06.webp";
// @ts-ignore
import boomburger07 from "../assets/images/fb_boomburger_07.webp";
// @ts-ignore
import boomburger08 from "../assets/images/fb_boomburger_08.webp";
// @ts-ignore
import boomburger09 from "../assets/images/fb_boomburger_09.webp";
// @ts-ignore
import boomburger10 from "../assets/images/fb_boomburger_10.webp";
// @ts-ignore
import costaThumb from "../assets/images/fb_costa_thumb.webp";
// @ts-ignore
import costa01 from "../assets/images/fb_costa_01.webp";
// @ts-ignore
import costa02 from "../assets/images/fb_costa_02.webp";
// @ts-ignore
import costa03 from "../assets/images/fb_costa_03.webp";
// @ts-ignore
import costa04 from "../assets/images/fb_costa_04.webp";
// @ts-ignore
import costa05 from "../assets/images/fb_costa_05.webp";
// @ts-ignore
import costa06 from "../assets/images/fb_costa_06.webp";
// @ts-ignore
import costa07 from "../assets/images/fb_costa_07.webp";
// @ts-ignore
import costa08 from "../assets/images/fb_costa_08.webp";
// @ts-ignore
import costa09 from "../assets/images/fb_costa_09.webp";
// @ts-ignore
import costa10 from "../assets/images/fb_costa_10.webp";
// @ts-ignore
import costa11 from "../assets/images/fb_costa_11.webp";
// @ts-ignore
import costa12 from "../assets/images/fb_costa_12.webp";
// @ts-ignore
import frenchaffairThumb from "../assets/images/fb_frenchaffair_thumb.webp";
// @ts-ignore
import frenchaffair01 from "../assets/images/fb_frenchaffair_01.webp";
// @ts-ignore
import frenchaffair02 from "../assets/images/fb_frenchaffair_02.webp";
// @ts-ignore
import frenchaffair03 from "../assets/images/fb_frenchaffair_03.webp";
// @ts-ignore
import frenchaffair04 from "../assets/images/fb_frenchaffair_04.webp";
// @ts-ignore
import frenchaffair05 from "../assets/images/fb_frenchaffair_05.webp";
// @ts-ignore
import frenchaffair06 from "../assets/images/fb_frenchaffair_06.webp";
// @ts-ignore
import frenchaffair07 from "../assets/images/fb_frenchaffair_07.webp";
// @ts-ignore
import frenchaffair08 from "../assets/images/fb_frenchaffair_08.webp";
// @ts-ignore
import frenchaffair09 from "../assets/images/fb_frenchaffair_09.webp";
// @ts-ignore
import irishhouseThumb from "../assets/images/fb_irishhouse_thumb.webp";
// @ts-ignore
import irishhouse01 from "../assets/images/fb_irishhouse_01.webp";
// @ts-ignore
import irishhouse02 from "../assets/images/fb_irishhouse_02.webp";
// @ts-ignore
import irishhouse03 from "../assets/images/fb_irishhouse_03.webp";
// @ts-ignore
import irishhouse04 from "../assets/images/fb_irishhouse_04.webp";
// @ts-ignore
import irishhouse05 from "../assets/images/fb_irishhouse_05.webp";
// @ts-ignore
import irishhouse06 from "../assets/images/fb_irishhouse_06.webp";
// @ts-ignore
import irishhouse07 from "../assets/images/fb_irishhouse_07.webp";
// @ts-ignore
import irishhouse08 from "../assets/images/fb_irishhouse_08.webp";
// @ts-ignore
import irishhouse09 from "../assets/images/fb_irishhouse_09.webp";
// @ts-ignore
import irishhouse10 from "../assets/images/fb_irishhouse_10.webp";
// @ts-ignore
import irishhouse11 from "../assets/images/fb_irishhouse_11.webp";
// @ts-ignore
import irishhouse12 from "../assets/images/fb_irishhouse_12.webp";
// @ts-ignore
import irishhouse13 from "../assets/images/fb_irishhouse_13.webp";
// @ts-ignore
import irishhouse14 from "../assets/images/fb_irishhouse_14.webp";
// @ts-ignore
import irishhouse15 from "../assets/images/fb_irishhouse_15.webp";
// @ts-ignore
import irishhouse16 from "../assets/images/fb_irishhouse_16.webp";
// @ts-ignore
import modThumb from "../assets/images/fb_mod_thumb.webp";
// @ts-ignore
import mod01 from "../assets/images/fb_mod_01.webp";
// @ts-ignore
import mod02 from "../assets/images/fb_mod_02.webp";
// @ts-ignore
import mod03 from "../assets/images/fb_mod_03.webp";
// @ts-ignore
import mod04 from "../assets/images/fb_mod_04.webp";
// @ts-ignore
import mod05 from "../assets/images/fb_mod_05.webp";
// @ts-ignore
import mod06 from "../assets/images/fb_mod_06.webp";
// @ts-ignore
import mod07 from "../assets/images/fb_mod_07.webp";
// @ts-ignore
import mod08 from "../assets/images/fb_mod_08.webp";
// @ts-ignore
import mod09 from "../assets/images/fb_mod_09.webp";
// @ts-ignore
import mushmerryThumb from "../assets/images/fb_mushmerry_thumb.webp";
// @ts-ignore
import mushmerry01 from "../assets/images/fb_mushmerry_01.webp";
// @ts-ignore
import mushmerry02 from "../assets/images/fb_mushmerry_02.webp";
// @ts-ignore
import mushmerry03 from "../assets/images/fb_mushmerry_03.webp";
// @ts-ignore
import mushmerry04 from "../assets/images/fb_mushmerry_04.webp";
// @ts-ignore
import mushmerry05 from "../assets/images/fb_mushmerry_05.webp";
// @ts-ignore
import mushmerry06 from "../assets/images/fb_mushmerry_06.webp";
// @ts-ignore
import mushmerry07 from "../assets/images/fb_mushmerry_07.webp";
// @ts-ignore
import mushmerry08 from "../assets/images/fb_mushmerry_08.webp";
// @ts-ignore
import mushmerry09 from "../assets/images/fb_mushmerry_09.webp";
// @ts-ignore
import mushmerry10 from "../assets/images/fb_mushmerry_10.webp";
// @ts-ignore
import mushmerry11 from "../assets/images/fb_mushmerry_11.webp";
// @ts-ignore
import mushmerry12 from "../assets/images/fb_mushmerry_12.webp";
// @ts-ignore
import mushmerry13 from "../assets/images/fb_mushmerry_13.webp";
// @ts-ignore
import mushmerry14 from "../assets/images/fb_mushmerry_14.webp";
// @ts-ignore
import mushmerry15 from "../assets/images/fb_mushmerry_15.webp";
// @ts-ignore
import pizzaexpressThumb from "../assets/images/fb_pizzaexpress_thumb.webp";
// @ts-ignore
import pizzaexpress01 from "../assets/images/fb_pizzaexpress_01.webp";
// @ts-ignore
import pizzaexpress02 from "../assets/images/fb_pizzaexpress_02.webp";
// @ts-ignore
import pizzaexpress03 from "../assets/images/fb_pizzaexpress_03.webp";
// @ts-ignore
import pizzaexpress04 from "../assets/images/fb_pizzaexpress_04.webp";
// @ts-ignore
import pizzaexpress05 from "../assets/images/fb_pizzaexpress_05.webp";
// @ts-ignore
import pizzaexpress06 from "../assets/images/fb_pizzaexpress_06.webp";
// @ts-ignore
import pizzaexpress07 from "../assets/images/fb_pizzaexpress_07.webp";
// @ts-ignore
import pizzaexpress08 from "../assets/images/fb_pizzaexpress_08.webp";
// @ts-ignore
import pizzaexpress09 from "../assets/images/fb_pizzaexpress_09.webp";
// @ts-ignore
import pizzaexpress10 from "../assets/images/fb_pizzaexpress_10.webp";
// @ts-ignore
import rawpresseryThumb from "../assets/images/fb_rawpressery_thumb.webp";
// @ts-ignore
import rawpressery01 from "../assets/images/fb_rawpressery_01.webp";
// @ts-ignore
import rawpressery02 from "../assets/images/fb_rawpressery_02.webp";
// @ts-ignore
import rawpressery03 from "../assets/images/fb_rawpressery_03.webp";
// @ts-ignore
import rawpressery04 from "../assets/images/fb_rawpressery_04.webp";
// @ts-ignore
import rawpressery05 from "../assets/images/fb_rawpressery_05.webp";
// @ts-ignore
import rawpressery06 from "../assets/images/fb_rawpressery_06.webp";
// @ts-ignore
import rawpressery07 from "../assets/images/fb_rawpressery_07.webp";
// @ts-ignore
import rawpressery08 from "../assets/images/fb_rawpressery_08.webp";
// @ts-ignore
import rawpressery09 from "../assets/images/fb_rawpressery_09.webp";
// @ts-ignore
import rawpressery10 from "../assets/images/fb_rawpressery_10.webp";
// @ts-ignore
import rawpressery11 from "../assets/images/fb_rawpressery_11.webp";
// @ts-ignore
import rawpressery12 from "../assets/images/fb_rawpressery_12.webp";
// @ts-ignore
import rawpressery13 from "../assets/images/fb_rawpressery_13.webp";
// @ts-ignore
import rawpressery14 from "../assets/images/fb_rawpressery_14.webp";
// @ts-ignore
import rawpressery15 from "../assets/images/fb_rawpressery_15.webp";
// @ts-ignore
import sakhetiThumb from "../assets/images/fb_sakheti_thumb.webp";
// @ts-ignore
import sakheti01 from "../assets/images/fb_sakheti_01.webp";
// @ts-ignore
import sakheti02 from "../assets/images/fb_sakheti_02.webp";
// @ts-ignore
import sakheti03 from "../assets/images/fb_sakheti_03.webp";
// @ts-ignore
import sakheti04 from "../assets/images/fb_sakheti_04.webp";
// @ts-ignore
import sakheti05 from "../assets/images/fb_sakheti_05.webp";
// @ts-ignore
import sakheti06 from "../assets/images/fb_sakheti_06.webp";
// @ts-ignore
import sakheti07 from "../assets/images/fb_sakheti_07.webp";
// @ts-ignore
import sakheti08 from "../assets/images/fb_sakheti_08.webp";

interface FBImage { src: string; o: "h" | "v" | "sq"; caption?: string; }
interface FBBrand {
  id: string;
  name: string;
  descriptor: string;
  gradient: string;
  thumb: string;
  hero: string;
  overview: string;
  approach: string;
  services: string[];
  images: FBImage[];
}

const BRANDS: FBBrand[] = [
  {
    id: "boom-burger",
    name: "Boom Burger",
    descriptor: "Gourmet Burger Brand",
    gradient: "linear-gradient(145deg, #f6c65a 0%, #e07a2e 50%, #7a2f12 100%)",
    thumb: boomburgerThumb,
    hero: boomburgerThumb,
    overview: "Boom Burger is a Mumbai burger brand built on big flavour and bold, explosive branding. Neorama produced a full menu-and-brand photography set \u2014 hero product shots, packaging stories and lifestyle frames \u2014 engineered to make the burgers impossible to scroll past across delivery platforms, social and in-store.",
    approach: "We shot on punchy, saturated backdrops \u2014 teal, cobalt and orange \u2014 to match the brand's playful energy, then balanced them with warm wood-and-kraft setups for depth. Every burger was styled and stacked to show height, crunch and cheese-pull, with the bomb-stamped packaging worked into frame so the brand travels with the food.",
    services: ["Food Photography", "Packaging Photography", "Lifestyle & Social Content"],
    images: [
      { src: boomburger01, o: "v", caption: "The signature stack \u2014 smash patty, melt and house sauce on a toasted bun, plated with fries and the bomb-stamped box for a hero that leads the menu." },
      { src: boomburger02, o: "sq", caption: "Brand in a wall of boxes \u2014 the crispy chicken burger framed by Boom Burger's bomb-stamped delivery packaging and one-liners, tying product straight to identity." },
      { src: boomburger03, o: "v", caption: "Crunch in close-up \u2014 a crispy chicken fillet with slaw and sesame, styled tall against electric teal to make the texture pop." },
      { src: boomburger04, o: "v", caption: "Layer study \u2014 panko-fried chicken, cheese, salsa and fresh greens shot side-on so every element in the build reads clearly." },
      { src: boomburger05, o: "v", caption: "Heat and melt \u2014 the spicy fried-chicken burger on cobalt blue, sauce and cheese caught mid-drip." },
      { src: boomburger06, o: "v", caption: "Served \u2014 a hand presents the burger to camera, adding scale and the sense of the moment it reaches the customer." },
      { src: boomburger07, o: "v", caption: "Takeaway window \u2014 an orange storefront frame and an outstretched hand tell the ordering story in a single lifestyle shot." },
      { src: boomburger08, o: "v", caption: "The full spread \u2014 burgers, loaded fries, wings and a cooler laid out to show the range in one appetite-led flatlay." },
      { src: boomburger09, o: "v", caption: "Egg-topped and dripping \u2014 a smash burger perched on the branded box, yolk and cheese mid-pour against warm wood." },
      { src: boomburger10, o: "v", caption: "In the moment \u2014 a guest dips a fry as two burgers wait, warm light and a smile bringing the food into real life." },
    ],
  },
  {
    id: "costa-coffee",
    name: "Costa Coffee",
    descriptor: "Coffee & Caf\u00e9",
    gradient: "linear-gradient(145deg, #d9c3a5 0%, #9c6b3f 50%, #4a2a17 100%)",
    thumb: costaThumb,
    hero: costaThumb,
    overview: "Costa Coffee is a global coffeehouse, and this set was built to sell the India menu \u2014 signature coffees, cold brews, cakes and caf\u00e9 bites. Neorama shot two complementary worlds: clean, colour-controlled studio stills for menu and delivery, and warm in-store lifestyle frames that place the cup in a real Costa moment.",
    approach: "The studio set uses a soft lilac backdrop, warm wood coasters and gold cutlery to keep every drink and slice premium and consistent. The lifestyle set moves to marble caf\u00e9 tables and natural window light \u2014 books, a denim jacket, latte art \u2014 to capture the everyday ritual of a Costa visit. Costa-branded cups, plates and napkins run through both so the brand is always present.",
    services: ["Beverage Photography", "Food Photography", "Lifestyle & Social Content"],
    images: [
      { src: costa01, o: "h", caption: "Signature cappuccino \u2014 foam poured clean and shot on soft lilac with a wood coaster and beans, the hero frame that opens the coffee menu." },
      { src: costa02, o: "h", caption: "Iced americano over ice, staged beside its espresso shot to tell the cold-coffee story in one clean studio frame." },
      { src: costa03, o: "h", caption: "Fruit loaf and a cold coffee \u2014 cake and drink styled together with figs and dates to sell the coffee-and-a-slice pairing." },
      { src: costa04, o: "h", caption: "Lemon drizzle cake, lit to show the moist crumb, with fresh lemons cueing the flavour." },
      { src: costa05, o: "h", caption: "Walnut brownie on the branded Costa plate \u2014 dark chocolate and walnuts placed to signal exactly what's inside." },
      { src: costa06, o: "v", caption: "Veg sub and a bean-art latte, shot from above on a wood board \u2014 a menu frame that pairs food with coffee." },
      { src: costa07, o: "v", caption: "The multigrain sub, styled tall on the board with the latte behind, built for menu and delivery listings." },
      { src: costa08, o: "h", caption: "Loaded paneer sub with a cappuccino \u2014 the full caf\u00e9-lunch combo in one appetite-led still." },
      { src: costa09, o: "v", caption: "In-store moment \u2014 a rosetta-topped cappuccino in the Costa cup beside a book and a cookie, capturing the quiet-caf\u00e9 ritual." },
      { src: costa10, o: "v", caption: "Lifestyle frame \u2014 an iced latte in hand over marble, mango cake and a Costa napkin bringing the menu into a real visit." },
      { src: costa11, o: "v", caption: "Hands unwrapping a Costa muffin next to a fresh americano \u2014 a candid, brand-stamped caf\u00e9 moment." },
      { src: costa12, o: "v", caption: "Overhead lifestyle \u2014 cheesecake on the Costa plate and a mango cooler with mint, styled for social and seasonal promotions." },
    ],
  },
  {
    id: "french-affair",
    name: "French Affair",
    descriptor: "Patisserie & Desserts",
    gradient: "linear-gradient(145deg, #f0dcc4 0%, #cf9d6d 50%, #7a4a28 100%)",
    thumb: frenchaffairThumb,
    hero: frenchaffairThumb,
    overview: "The French Affair (TFA) is a premium patisserie, and this set matches its craft with dark, editorial dessert photography. Neorama shot the signature range \u2014 Biscoff cheesecakes, choux, tarts, truffles and mirror-glaze cakes \u2014 as hero pieces worthy of a dessert menu and a scroll-stopping feed.",
    approach: "We went low-key and moody: slate and dark-wood surfaces, dramatic side light, gold cutlery and fresh flowers, with each dessert's texture \u2014 glossy glaze, torched meringue, caramel drip \u2014 caught at its most tempting. TFA's branded chocolate discs anchor the frames so the brand signs every shot.",
    services: ["Dessert & Patisserie Photography", "Menu Photography", "Social Content"],
    images: [
      { src: frenchaffair01, o: "v", caption: "Lotus Biscoff cheesecake \u2014 caramel pooled and a single biscuit set dead-centre, shot low-key so the gloss and crumb do the talking." },
      { src: frenchaffair02, o: "v", caption: "The same cheesecake, sliced \u2014 a clean wedge plated behind to reveal the set and the layers." },
      { src: frenchaffair03, o: "v", caption: "Cream-filled choux crowned with chocolate and Biscoff, staged with the spread jar and chocolate bars \u2014 indulgence, merchandised." },
      { src: frenchaffair04, o: "h", caption: "Torched lemon-meringue tart with fresh berries, the peaks caught mid-flame against dark slate." },
      { src: frenchaffair05, o: "v", caption: "White- and dark-chocolate truffles lined up on slate \u2014 a graphic, minimal frame that sells the box." },
      { src: frenchaffair06, o: "v", caption: "Almond cream tart with piped rosettes, styled with flowers and cardamom for a warm, festive dessert story." },
      { src: frenchaffair07, o: "h", caption: "Overhead on the cream tart \u2014 a slice lifted out, gulab jamun and almonds cueing the Indian-French flavour." },
      { src: frenchaffair08, o: "v", caption: "Chocolate-filled choux buns, one split to reveal the ganache centre, on a clean slate board." },
      { src: frenchaffair09, o: "v", caption: "Red mirror-glaze cake \u2014 a flawless, glossy finish caught under directional light, the showpiece of the range." },
    ],
  },
  {
    id: "irish-house",
    name: "Irish House",
    descriptor: "Gastropub & Bar",
    gradient: "linear-gradient(145deg, #cfe0c4 0%, #6f9b5a 50%, #2e4a24 100%)",
    thumb: irishhouseThumb,
    hero: irishhouseThumb,
    overview: "The Irish House is a lively gastropub, and this set captures the full bar-and-kitchen experience \u2014 craft beers and cocktails, sliders and sizzling mains, pretzels and desserts. Neorama shot it for menus, delivery and a social feed that feels like a night out.",
    approach: "We worked two moods to match the room: warm, wood-and-brass pub tables for the food-and-beer moments, and dramatic low-key studio frames \u2014 an exploded burger, a barrel-framed cheers \u2014 for scroll-stopping hero content. Branded coasters, Kingfisher and Carlsberg pours and pub props keep every frame unmistakably Irish House.",
    services: ["Food Photography", "Beverage & Cocktail Photography", "Lifestyle & Social Content"],
    images: [
      { src: irishhouse01, o: "v", caption: "Chicken sliders on the board with fries and dips \u2014 the shareable pub platter, styled on warm wood as the set's opener." },
      { src: irishhouse02, o: "v", caption: "Grapefruit paloma \u2014 a tall, fizzy highball garnished with citrus, its spirit bottle and jigger staged behind for the cocktail menu." },
      { src: irishhouse03, o: "v", caption: "Exploded burger \u2014 every layer floated apart against black, flanked by beers, a dramatic hero built for the feed." },
      { src: irishhouse04, o: "h", caption: "The dessert station \u2014 mini tarts, chocolate domes and churros staged on wood logs under a chalkboard sign." },
      { src: irishhouse05, o: "v", caption: "Soft pretzels and cheese dip with two cold Carlsbergs \u2014 the classic beer-snack pairing, warmly lit." },
      { src: irishhouse06, o: "h", caption: "Wild-mushroom risotto with a round of Ultra beers \u2014 a plated main framed by the drinks it's served with." },
      { src: irishhouse07, o: "v", caption: "Wood-fired pizza with two towering beer glasses \u2014 a table scene that sells the whole order." },
      { src: irishhouse08, o: "v", caption: "Bratwurst, pretzel and potato hash with beer, set against the Bavarian blue-and-white \u2014 Oktoberfest on a plate." },
      { src: irishhouse09, o: "h", caption: "Slow-braised meat with potato salad and greens \u2014 a hearty main shot clean from above for the menu." },
      { src: irishhouse10, o: "h", caption: "Crispy chicken burger with an iced tea mid-pour \u2014 motion and sides staged for an appetite-led hero." },
      { src: irishhouse11, o: "v", caption: "Festive flatbread with chicken and chorizo, holly and beers \u2014 a seasonal frame for the holiday menu." },
      { src: irishhouse12, o: "v", caption: "The Lunch Deal \u2014 pasta, tacos and a chocolate slice on newsprint, merchandising the combo in one shot." },
      { src: irishhouse13, o: "v", caption: "Cheers \u2014 two frosted beers clinking, shot up through a barrel for a moody, share-worthy bar moment." },
      { src: irishhouse14, o: "v", caption: "Chicken fajitas from above \u2014 tortillas, sizzled peppers and cheddar laid out as a build-your-own spread." },
      { src: irishhouse15, o: "h", caption: "Grilled pineapple with vanilla ice cream on a hot sizzler plate \u2014 powdered sugar caught mid-fall." },
      { src: irishhouse16, o: "v", caption: "Chocolate mousse cake in macro, chocolate sauce piped around the plate \u2014 dessert, styled to tempt." },
    ],
  },
  {
    id: "mod",
    name: "Mad Over Donuts",
    descriptor: "Gourmet Donut Brand",
    gradient: "linear-gradient(145deg, #e2ddd6 0%, #a99a86 50%, #574a3a 100%)",
    thumb: modThumb,
    hero: modThumb,
    overview: "MOD \u2014 Mad Over Donuts \u2014 is all about playful, over-the-top donuts, and this set brings that energy to camera. Neorama shot the range across bold colour-pop backdrops, levitation frames and festive specials, built for delivery apps, social and in-store menus.",
    approach: "We leaned into colour and movement: saturated seamless backdrops in green, amber and blue, donuts floating mid-air to show glaze and toppings from every angle, and warm rack-and-wood setups for the classics. The Mad Over Donuts box anchors the hero so the brand reads instantly, with seasonal sets like the Christmas gingerbread donuts kept ready for campaigns.",
    services: ["Product & Food Photography", "Levitation & Creative Stills", "Social & Festive Campaigns"],
    images: [
      { src: mod01, o: "v", caption: "Green-sprinkle donuts on soft cloth \u2014 a fresh, playful frame that leads with colour and texture." },
      { src: mod02, o: "v", caption: "Rainbow-sprinkle chocolate donuts on the cooling rack \u2014 the classic, shot on mint green to pop the sprinkles." },
      { src: mod03, o: "v", caption: "The Mad Over Donuts box, loaded \u2014 Oreo, KitKat and choco-drizzle donuts on electric blue, the brand hero shot." },
      { src: mod04, o: "v", caption: "Gems-topped chocolate donuts floating on amber \u2014 a levitation frame that shows the toppings from every side." },
      { src: mod05, o: "v", caption: "Dark-chocolate donuts with white drizzle, suspended against black \u2014 glossy, dramatic and premium." },
      { src: mod06, o: "h", caption: "Cobweb-glaze donuts on wood with choc chips \u2014 a warmer, tactile take on the chocolate range." },
      { src: mod07, o: "v", caption: "Festive gingerbread donuts, sugar-dusted, on Christmas red with bells \u2014 a ready-made seasonal campaign frame." },
      { src: mod08, o: "v", caption: "Overhead on the rack \u2014 six glazes side by side, a menu grid that shows the full assortment." },
      { src: mod09, o: "h", caption: "The assortment on the cooling rack \u2014 sugar, chocolate and caramel-lattice donuts styled together for the range." },
    ],
  },
  {
    id: "mushmerry",
    name: "Mushmerry",
    descriptor: "Chocolate & Corporate Gifting",
    gradient: "linear-gradient(145deg, #f3d9e2 0%, #d78aa4 50%, #7a3350 100%)",
    thumb: mushmerryThumb,
    hero: mushmerryThumb,
    overview: "Mushmerry is a bespoke chocolate and gifting brand, and this set spans its full range \u2014 artisan bonbons and bars, festive collections and fully custom corporate gift boxes for brands like Mirae Asset, Red Exim, Fabcars and Future Generali. Neorama shot it for e-commerce, gifting catalogues and social.",
    approach: "We split the set into product and packaging: macro tabletop frames that show gloss, filling and texture on warm, minimal backdrops, and styled gifting scenes \u2014 ribbons, flowers, candles and seasonal props \u2014 that make each box feel worth giving. Branded boxes are lit to keep client logos crisp.",
    services: ["Product & Macro Photography", "Packaging & Gifting Photography", "Festive & Corporate Campaigns"],
    images: [
      { src: mushmerry01, o: "v", caption: "Filled bonbons, two cut open to reveal praline and a caramel core \u2014 a macro hero that sells the bite." },
      { src: mushmerry02, o: "v", caption: "Chocolate-coated almonds in macro, a single raw almond on top to tell the story in one frame." },
      { src: mushmerry03, o: "v", caption: "Two signature bars \u2014 smooth milk and crushed-nut \u2014 leaned into window light for a clean product shot." },
      { src: mushmerry04, o: "v", caption: "Bonbons stacked and dusted with cocoa, one split to show the biscuit centre \u2014 texture, elevated." },
      { src: mushmerry05, o: "v", caption: "Chocolate-dipped caramel-and-nut bars, cut to reveal the loaded filling, on a warm minimal set." },
      { src: mushmerry06, o: "v", caption: "Pistachio bar, cut to show the vivid green centre, presented with its gift box \u2014 a premium gifting frame." },
      { src: mushmerry07, o: "v", caption: "The Women's Day gift box, open with gold bonbons, flowers and a candle \u2014 a styled seasonal scene." },
      { src: mushmerry08, o: "v", caption: "Women's Day branded bars in pastel packaging \u2014 festive SKUs shot ready for the campaign." },
      { src: mushmerry09, o: "v", caption: "Mirae Asset corporate gifting \u2014 navy-and-gold branded boxes with gold-foil chocolates, logos kept crisp." },
      { src: mushmerry10, o: "v", caption: "Red Exim Diamond gift box \u2014 bespoke green-and-gold packaging with branded chocolates for corporate gifting." },
      { src: mushmerry11, o: "v", caption: "Fabcars gift box \u2014 art-deco packaging and a satin bow with gold bonbons, a premium client hamper." },
      { src: mushmerry12, o: "v", caption: "Future Generali 'Congratulations' box \u2014 a branded assortment of clusters and pralines for corporate rewards." },
      { src: mushmerry13, o: "sq", caption: "A premium hamper \u2014 chocolate jars and granola in a gold-lined box with gypsophila, styled for e-commerce." },
      { src: mushmerry14, o: "v", caption: "Festive Christmas tins filled with wrapped chocolates, staged under the tree with candles and baubles." },
      { src: mushmerry15, o: "v", caption: "Christmas bars \u2014 a 'Merry Christmas' sleeve and a cranberry-pecan bark \u2014 on wood among the lights." },
    ],
  },
  {
    id: "pizza-express",
    name: "Pizza Express",
    descriptor: "Pizzeria & Italian Kitchen",
    gradient: "linear-gradient(145deg, #e9d1b0 0%, #c0703f 50%, #6e2f1e 100%)",
    thumb: pizzaexpressThumb,
    hero: pizzaexpressThumb,
    overview: "Pizza Express is a much-loved pizzeria, and this set captures its Italian menu the way regulars order it \u2014 thin-crust pizzas, dough balls, pasta, bruschetta and desserts \u2014 shot for menus, delivery and a social feed full of shareable spreads.",
    approach: "We shot on marble, slate and wood to echo the restaurant tables, working both tight single-dish frames and generous overhead spreads with wine, cola and the brand's own boxes and oil bottles. Cheese pulls, fresh basil and glossy sauces are caught at their most appetising, with a few lifestyle frames for the in-restaurant feel.",
    services: ["Food Photography", "Menu & Delivery Imagery", "Lifestyle & Social Content"],
    images: [
      { src: pizzaexpress01, o: "v", caption: "Spinach, goat's cheese and red onion pizza on a wood board \u2014 a single-pizza hero that shows the char and the crumb." },
      { src: pizzaexpress02, o: "h", caption: "Two pizzas with garlic dough balls and a chocolate slice, staged on the Pizza Express box \u2014 a combo, merchandised." },
      { src: pizzaexpress03, o: "v", caption: "Overhead pairing \u2014 two pizzas, dough balls and dessert laid out on slate for a menu-ready flat lay." },
      { src: pizzaexpress04, o: "h", caption: "The spread \u2014 pepperoni and pesto pizzas with a BBQ starter, dough balls and dips for a full-table order." },
      { src: pizzaexpress05, o: "h", caption: "Pizza, creamy pasta and bruschetta with an iced tea \u2014 a balanced meal-for-two frame." },
      { src: pizzaexpress06, o: "v", caption: "Three pizzas from above on enamel plates, oil and shakers in frame \u2014 the classic pizzeria tabletop." },
      { src: pizzaexpress07, o: "v", caption: "Another overhead trio with cool blue glassware \u2014 variety shot to show the range at a glance." },
      { src: pizzaexpress08, o: "v", caption: "The slice moment \u2014 a hand lifts a loaded slice against black, cheese stretching for the hero shot." },
      { src: pizzaexpress09, o: "v", caption: "The full feast \u2014 pizzas, dough balls with dips, a cola and wine, styled for a share-worthy overhead." },
      { src: pizzaexpress10, o: "v", caption: "Lifestyle close \u2014 creamy penne and a cheesecake mid-pour with red wine, the in-restaurant dessert course." },
    ],
  },
  {
    id: "raw-pressery",
    name: "Raw Pressery",
    descriptor: "Cold-Pressed Juices & Beverages",
    gradient: "linear-gradient(145deg, #d7ead0 0%, #79b06a 50%, #2f5f2c 100%)",
    thumb: rawpresseryThumb,
    hero: rawpresseryThumb,
    overview: "Raw Pressery is a cold-pressed juice and beverage brand \u2014 coconut water, fruit juices, iced teas, aam panna, shikanji and dairy alternatives. This set brings the brand's commercial photography together in one place, selling the range as fresh, vibrant and premium across product, lifestyle and pour frames for e-commerce, social and retail.",
    approach: "We shot Raw Pressery across several worlds to match its range: bright, playful colour-pop portraits for the flavoured drinks, clean flat lays for the juices, moody bar-style pours for the mocktail story, and warm lifestyle frames \u2014 a coconut water against a palm sky, a cosy hot chocolate. The RAW logo stays hero throughout so the brand reads instantly on shelf and in feed.",
    services: ["Product & Packaging Photography", "Beverage & Pour Photography", "Lifestyle & Social Content"],
    images: [
      { src: rawpressery01, o: "v", caption: "Coconut Water against a palm and open sky \u2014 a hero that turns a simple bottle into a summer holiday." },
      { src: rawpressery02, o: "v", caption: "Lifestyle moment \u2014 a relaxed sip of Coconut Water with the RAW magazine, selling the everyday habit." },
      { src: rawpressery03, o: "v", caption: "Iced Green Tea, straight from the chiller \u2014 a hand picks the Peach as the flavours line up behind." },
      { src: rawpressery04, o: "v", caption: "Playful flat lay \u2014 RAW juices and coconut water spelling 'flavours' on a Scrabble board." },
      { src: rawpressery05, o: "v", caption: "Aam Panna on a bright yellow pop \u2014 a mint-topped sip that makes the summer cooler irresistible." },
      { src: rawpressery06, o: "v", caption: "Masala Lemon Shikanji through a torn-paper reveal \u2014 a fun, high-energy frame for social." },
      { src: rawpressery07, o: "v", caption: "Aloe Vera Lemonade poured into a coupe \u2014 a moody, bar-style pour that elevates the drink to a mocktail." },
      { src: rawpressery08, o: "v", caption: "Blood-orange refresher in a ribbed glass, its bottle glowing behind \u2014 cinematic and premium." },
      { src: rawpressery09, o: "v", caption: "Pomegranate juice with a granola-and-fruit bowl \u2014 a healthy-breakfast frame that pairs the drink with a moment." },
      { src: rawpressery10, o: "v", caption: "Mixed-berry juice with a strawberry waffle on soft pink \u2014 a bright brunch pairing for social." },
      { src: rawpressery11, o: "v", caption: "RAW Dairy Lactose-Free Milk in a cosy hot chocolate with marshmallows \u2014 a warm, seasonal use-case." },
      { src: rawpressery12, o: "v", caption: "Coconut Water, styled as a clean flat lay of bottles \u2014 a crisp product frame for e-commerce and listings." },
      { src: rawpressery13, o: "v", caption: "Valencia Orange, poured fresh beside sub sandwiches \u2014 a breakfast-table frame that sells the juice in context." },
      { src: rawpressery14, o: "v", caption: "Pink Guava Chilli Refresher on a bed of ice \u2014 frosty, cold and ready to drink." },
      { src: rawpressery15, o: "v", caption: "Valencia Orange on rustic wood with fresh oranges \u2014 a natural, farm-fresh product shot." },
    ],
  },
  {
    id: "sakheti",
    name: "Sakheti",
    descriptor: "Premium Atta Brand",
    gradient: "linear-gradient(145deg, #e6ddca 0%, #b39a63 50%, #5f4d24 100%)",
    thumb: sakhetiThumb,
    hero: sakhetiThumb,
    overview: "Sakheti Premium Atta is a wheat-flour brand built on a simple promise \u2014 0% maida, 100% wheat. Neorama gave the product a warm, rustic, premium look for packaging, e-commerce and retail marketing, telling a farm-to-kitchen story around the pack.",
    approach: "We styled the shoot around wheat: dark wood and stone surfaces, hessian, wooden bowls and scoops, wheat stalks and grains, lit warm and low for an artisanal, trustworthy feel. The pack is kept crisp and hero, with texture-led flour and dough frames that sell 'superior quality wheat' at a glance.",
    services: ["Product & Packaging Photography", "E-commerce & Retail Imagery", "Brand Photography"],
    images: [
      { src: sakheti01, o: "v", caption: "A mound of fresh atta on a wooden scoop, dusted over a log \u2014 a rustic, texture-first frame that opens the story." },
      { src: sakheti02, o: "v", caption: "The Sakheti Premium Atta pack, hero-lit with a bowl of flour, wheat and a rolling pin \u2014 the packshot for retail and e-commerce." },
      { src: sakheti03, o: "h", caption: "Two packs styled with flour bowls and spoons \u2014 a lifestyle frame that shows the range on shelf." },
      { src: sakheti04, o: "h", caption: "The pack with wooden bowls of atta and a basket of wheat \u2014 an artisanal, farm-to-kitchen setup." },
      { src: sakheti05, o: "v", caption: "Flour and wheat grains in wooden bowls with a single stalk \u2014 a clean, ingredient-led overhead." },
      { src: sakheti06, o: "h", caption: "Atta, grains and pack on stone with wheat stalks \u2014 the 'superior quality wheat' promise, visualised." },
      { src: sakheti07, o: "v", caption: "Macro on a sieve of sifted atta beside the pack's '0% maida' claim \u2014 texture and message in one frame." },
      { src: sakheti08, o: "v", caption: "The pack angled with a sieve, scoop and wheat \u2014 a warm, premium product shot for brand marketing." },
    ],
  },
];

const FAQS = PROJECT_ROUTES.find((p) => p.id === "food-beverage-photography")?.faqs ?? [];

// ─── Editorial layout ────────────────────────────────────────────────────────
// Arrange a brand's shots into a magazine rhythm driven by orientation:
//   hero feature → full-width bands for horizontals → paired columns for
//   verticals → an image-with-caption split for a leftover vertical.
type GImg = FBImage & { idx: number };
type Block =
  | { type: "hero"; img: GImg }
  | { type: "full"; img: GImg }
  | { type: "pair"; imgs: GImg[] }
  | { type: "solo"; img: GImg };

function buildBlocks(imgs: GImg[]): Block[] {
  const blocks: Block[] = [];
  if (!imgs.length) return blocks;
  blocks.push({ type: "hero", img: imgs[0] });
  let j = 1;
  while (j < imgs.length) {
    if (imgs[j].o === "v") {
      const run: GImg[] = [];
      while (j < imgs.length && imgs[j].o === "v") { run.push(imgs[j]); j++; }
      let k = 0;
      while (k < run.length) {
        if (run.length - k >= 2) { blocks.push({ type: "pair", imgs: [run[k], run[k + 1]] }); k += 2; }
        else { blocks.push({ type: "solo", img: run[k] }); k += 1; }
      }
    } else {
      blocks.push({ type: "full", img: imgs[j] }); j++;
    }
  }
  return blocks;
}

interface FrameProps { img: GImg; brand: string; aspect: string; rounded?: string; onOpen: (i: number) => void; showCaption?: boolean; }
const Frame: React.FC<FrameProps> = ({ img, brand, aspect, rounded = "rounded-xl", onOpen, showCaption = true }) => (
  <figure className="space-y-3">
    <div onClick={() => onOpen(img.idx)} className={`group cursor-zoom-in relative ${rounded} overflow-hidden shadow-sm ${aspect}`}>
      <img
        src={img.src}
        alt={img.caption ? `${brand} — ${img.caption}` : `${brand} food & beverage photography by Neorama Studios — frame ${String(img.idx + 1).padStart(2, "0")}`}
        className="w-full h-full object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/14 transition-colors duration-300" />
      <div className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><Maximize2 size={13} /></div>
    </div>
    {showCaption && img.caption && (
      <figcaption className="font-sans text-[12.5px] leading-relaxed text-neutral-500 px-0.5">
        <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold mr-2">{String(img.idx + 1).padStart(2, "0")}</span>{img.caption}
      </figcaption>
    )}
  </figure>
);

interface Props {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
  onRequestContact?: () => void;
  initialStory?: string | null;
  onStoryChange?: (storySlug: string | null) => void;
}

export default function FoodBeverageCaseStudy({ onClose, onRequestContact, initialStory, onStoryChange }: Props) {
  const [activeBrand, setActiveBrand] = useState<string | null>(initialStory ?? null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const current = BRANDS.find(b => b.id === activeBrand) ?? null;
  const galleryImages = current ? current.images : [];
  const related = activeBrand ? BRANDS.filter(b => b.id !== activeBrand) : [];

  useEffect(() => { setActiveBrand(initialStory ?? null); }, [initialStory]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const container = wrapperRef.current;
    const handleScroll = () => { if (container) setScrollY(container.scrollTop); };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [activeBrand]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) { setLightboxOpen(false); return; }
        if (activeBrand) { setActiveBrand(null); onStoryChange?.(null); scrollToTop(); return; }
        onClose();
      }
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, activeBrand, photoIndex, galleryImages.length]);

  const next = () => setPhotoIndex(i => (i + 1) % galleryImages.length);
  const prev = () => setPhotoIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const scrollToTop = () => { if (wrapperRef.current) wrapperRef.current.scrollTop = 0; setScrollY(0); };

  const selectBrand = (id: string) => {
    setActiveBrand(id);
    onStoryChange?.(id);
    setPhotoIndex(0);
    scrollToTop();
  };

  const handleBack = () => {
    if (activeBrand) { setActiveBrand(null); onStoryChange?.(null); scrollToTop(); }
    else onClose();
  };

  const openLightbox = (idx: number) => { setPhotoIndex(idx); setLightboxOpen(true); };

  return (
    <div
      ref={wrapperRef}
      id="fb-case-study-scroller"
      className="fixed inset-0 z-50 bg-white text-neutral-900 overflow-y-auto selection:bg-neutral-900 selection:text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* FLOATING EXIT / BACK */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference">
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-neutral-950 font-mono text-[10px] uppercase font-black tracking-widest shadow-2xl border border-neutral-200/50 hover:bg-black hover:text-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>{activeBrand ? "All Brands" : "Exit Case Study"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* ═══════════════ MAIN COLLECTION PAGE ═══════════════ */}
        {!activeBrand && (
          <motion.div key="main-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5 }}>
            {/* HERO */}
            <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none">
              <div className="absolute inset-0 w-full h-full" style={{ transform: `translateY(${scrollY * 0.25}px)`, opacity: 1 - Math.min(scrollY / 800, 0.75) }}>
                <img src={fbHero} alt="Food and beverage photography by Neorama Studios, Mumbai — for restaurants, cafés and F&B brands" className="w-full h-full object-cover brightness-[0.6] contrast-[1.05]" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />
              </div>
              <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex items-center justify-center gap-3 mb-5">
                  <span className="h-[2px] w-8 bg-white" />
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/95 font-bold">Food &amp; Beverage Photography</span>
                  <span className="h-[2px] w-8 bg-white" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-6">
                  Food &amp; Drink
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 0.5 }} className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-neutral-300 font-bold uppercase">
                  NINE BRANDS // MENU, PRODUCT &amp; LIFESTYLE STILLS
                </motion.p>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer" onClick={() => document.getElementById("fb-brands-sec")?.scrollIntoView({ behavior: "smooth" })}>
                <span>Scroll to Explore</span>
                <ChevronDown size={14} className="animate-bounce text-white/70" />
              </div>
            </section>

            {/* BRAND GRID */}
            <section id="fb-brands-sec" className="bg-white py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">EXPLORE BRANDS // 09</span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">Featured F&amp;B Portfolios</h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {BRANDS.map((b, i) => (<BrandCard key={b.id} brand={b} index={i} onClick={selectBrand} />))}
              </div>
            </section>

            {/* SPECS */}
            <section className="bg-neutral-50/50 py-24 md:py-32 border-y border-neutral-100">
              <div className="max-w-4xl mx-auto px-6">
                <div className="border border-neutral-200 rounded-3xl p-8 md:p-14 space-y-10 bg-white shadow-xs relative">
                  <div className="absolute -top-3.5 left-10 bg-white px-4 border border-neutral-200 text-neutral-900 font-mono text-[9px] uppercase tracking-[0.2em] font-black rounded-full">Portfolio Certificate // F&amp;B Series</div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900 border-b border-neutral-100 pb-5">Series Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="space-y-1.5"><span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Discipline //</span><p className="font-sans text-[15px] font-extrabold text-neutral-900">Food &amp; Beverage Photography</p></div>
                    <div className="space-y-1.5"><span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Brands //</span><p className="font-sans text-[14px] text-neutral-800 font-semibold">Nine Food &amp; Beverage Brand Portfolios</p></div>
                    <div className="md:col-span-2 space-y-3 pt-6 border-t border-neutral-100">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Services Rendered //</span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {["Food Photography", "Beverage Photography", "Menu & Delivery Imagery", "Lifestyle & Social Content"].map((asset, index) => (
                          <span key={index} className="bg-neutral-50 text-neutral-800 font-mono text-[10.5px] font-bold tracking-tight px-3 py-1.5 rounded-lg border border-neutral-200/60 inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />{asset}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            {FAQS.length > 0 && (
              <section className="bg-white py-16 md:py-24 px-6 md:px-12 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center space-y-3 mb-10">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">FAQ</span>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">Common Questions</h3>
                    <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
                  </div>
                  <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                    {FAQS.map((f, i) => (
                      <details key={i} className="group py-5">
                        <summary className="flex items-center justify-between cursor-pointer list-none font-sans font-bold text-sm md:text-base text-neutral-900">
                          {f.q}
                          <ChevronDown size={18} className="text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                        </summary>
                        <p className="mt-3 font-sans text-sm text-neutral-600 leading-relaxed max-w-2xl">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="bg-neutral-950 text-white py-24 md:py-32 px-6 border-t border-neutral-900/60">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">For Food, Drink &amp; Product Brands</span>
                <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">Get Your Food Photographed</h3>
                <p className="font-sans text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">We shoot food, drink and product photography that sells — for menus, delivery platforms, e-commerce and social. Tell us about your brand and let&apos;s plan the shoot.</p>
                <div className="pt-4">
                  <button onClick={() => onRequestContact?.()} className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-mono text-[11px] uppercase font-black tracking-widest hover:bg-[#3079D8] hover:text-white transition-all duration-300 hover:scale-[1.03] cursor-pointer">
                    Book a Shoot <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. ALL FOOD &amp; BEVERAGE PHOTOGRAPHY PROOFS PROTECTED BY NDA.</p>
            </footer>
          </motion.div>
        )}

        {/* ═══════════════ INDIVIDUAL BRAND PAGE ═══════════════ */}
        {activeBrand && current && (
          <motion.div key={activeBrand} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {/* HERO */}
            <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none">
              <div className="absolute inset-0 w-full h-full" style={{ transform: `translateY(${scrollY * 0.25}px)`, opacity: 1 - Math.min(scrollY / 800, 0.75) }}>
                <img src={current.hero} alt={`${current.name} — ${current.descriptor} — food & beverage photography by Neorama Studios`} className="w-full h-full object-cover brightness-[0.6] contrast-[1.05]" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />
              </div>
              <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex items-center justify-center gap-3 mb-5">
                  <span className="h-[2px] w-8 bg-white" />
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/95 font-bold">{current.descriptor}</span>
                  <span className="h-[2px] w-8 bg-white" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="font-display text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-6">
                  {current.name}
                </motion.h1>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer" onClick={() => document.getElementById("fb-gallery-sec")?.scrollIntoView({ behavior: "smooth" })}>
                <span>View Gallery</span>
                <ChevronDown size={14} className="animate-bounce text-white/70" />
              </div>
            </section>

            {/* TITLE STRIP + CASE STUDY COPY */}
            <section className="bg-white py-16 md:py-20 max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-100">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] font-black block">FOOD &amp; BEVERAGE PHOTOGRAPHY</span>
                  <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter leading-none">{current.name}</h2>
                </div>
                <div className="grid grid-cols-2 gap-8 shrink-0">
                  <div><p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Discipline //</p><p className="font-sans text-xs font-bold text-neutral-800">{current.descriptor}</p></div>
                  <div><p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Frames //</p><p className="font-sans text-xs font-bold text-neutral-800">{current.images.length} Masters</p></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-12">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.25em] font-black block">The Brief</span>
                  <p className="font-sans text-sm md:text-[15px] text-neutral-700 leading-relaxed">{current.overview}</p>
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.25em] font-black block">The Approach</span>
                  <p className="font-sans text-sm md:text-[15px] text-neutral-700 leading-relaxed">{current.approach}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-8">
                {current.services.map((s, i) => (
                  <span key={i} className="bg-neutral-50 text-neutral-800 font-mono text-[10.5px] font-bold tracking-tight px-3 py-1.5 rounded-lg border border-neutral-200/60 inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />{s}
                  </span>
                ))}
              </div>
            </section>

            {/* MASONRY GALLERY (orientation-aware, with captions) */}
            <section id="fb-gallery-sec" className="bg-white py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-10 md:space-y-14">
              <div className="text-center space-y-3">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">EDITORIAL ARCHIVE // {current.name.toUpperCase()}</span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">Brand Gallery Portfolio</h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>
              <div className="space-y-6 md:space-y-10">
                {buildBlocks(galleryImages.map((im, idx) => ({ ...im, idx }))).map((blk, bi) => {
                  if (blk.type === "hero") {
                    const im = blk.img;
                    if (im.o === "v") {
                      return (
                        <motion.div key={bi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                          <Frame img={im} brand={current.name} aspect="aspect-[4/5]" rounded="rounded-2xl" onOpen={openLightbox} showCaption={false} />
                          <div className="space-y-4">
                            <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">Feature Frame // 01</span>
                            {im.caption && <p className="font-display text-xl md:text-3xl text-neutral-900 leading-snug tracking-tight">{im.caption}</p>}
                          </div>
                        </motion.div>
                      );
                    }
                    return (
                      <motion.div key={bi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
                        <Frame img={im} brand={current.name} aspect="aspect-[16/9]" rounded="rounded-2xl" onOpen={openLightbox} />
                      </motion.div>
                    );
                  }
                  if (blk.type === "full") {
                    const im = blk.img;
                    return (
                      <motion.div key={bi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65 }}>
                        <Frame img={im} brand={current.name} aspect={im.o === "sq" ? "aspect-[4/3] max-w-3xl mx-auto" : "aspect-[3/2]"} onOpen={openLightbox} />
                      </motion.div>
                    );
                  }
                  if (blk.type === "pair") {
                    return (
                      <motion.div key={bi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65 }} className="grid grid-cols-2 gap-5 md:gap-6 items-start">
                        {blk.imgs.map((im) => (
                          <Frame key={im.idx} img={im} brand={current.name} aspect="aspect-[4/5]" onOpen={openLightbox} />
                        ))}
                      </motion.div>
                    );
                  }
                  const im = blk.img;
                  return (
                    <motion.div key={bi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65 }} className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                      <Frame img={im} brand={current.name} aspect="aspect-[4/5]" onOpen={openLightbox} showCaption={false} />
                      {im.caption ? (
                        <p className="font-sans text-[15px] md:text-base text-neutral-600 leading-relaxed">
                          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold mr-2 block mb-2">Frame {String(im.idx + 1).padStart(2, "0")}</span>
                          {im.caption}
                        </p>
                      ) : <div className="hidden md:block" />}
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-white py-16 md:py-20 px-6 border-t border-neutral-100">
              <div className="max-w-3xl mx-auto text-center space-y-5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">For Food, Drink &amp; Product Brands</span>
                <h3 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-neutral-900 leading-none">Have a Shoot Coming Up?</h3>
                <p className="font-sans text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">Food, drink and product photography that sells — for menus, delivery, e-commerce and social. Tell us about your brand and let&apos;s plan the shoot.</p>
                <div className="pt-2">
                  <button onClick={() => onRequestContact?.()} className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-neutral-950 text-white font-mono text-[11px] uppercase font-black tracking-widest hover:bg-[#3079D8] transition-all duration-300 hover:scale-[1.03] cursor-pointer">
                    Book a Shoot <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* RELATED BRANDS */}
            <section className="bg-neutral-950 py-24 md:py-36 text-white overflow-hidden relative">
              <div className="absolute bottom-1/2 right-1/2 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
              <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
                  <div className="space-y-3">
                    <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-black block">STUDIO DISCOVERY PORTAL //</span>
                    <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">Explore Other Brands</h2>
                  </div>
                  <div className="w-16 h-[2px] bg-neutral-800 hidden md:block" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((rel) => (
                    <div key={rel.id} onClick={() => selectBrand(rel.id)} className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer shadow-xl border border-neutral-800 flex flex-col justify-end p-5">
                      <img src={rel.thumb} alt={`${rel.name} — ${rel.descriptor} by Neorama Studios`} className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      <div className="relative z-10 space-y-2 text-left">
                        <span className="inline-block bg-white/15 border border-white/25 text-white/90 font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest font-black">{rel.descriptor}</span>
                        <h3 className="font-display font-extrabold uppercase text-sm text-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">{rel.name}</h3>
                        <div className="pt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#3079D8] font-black tracking-widest group-hover:gap-2.5 transition-all"><span>Explore Brand</span><ArrowRight size={10} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. ALL FOOD &amp; BEVERAGE PHOTOGRAPHY PROOFS PROTECTED BY NDA.</p>
            </footer>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ═══════════════ LIGHTBOX ═══════════════ */}
      <AnimatePresence>
        {lightboxOpen && current && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[60] bg-black flex flex-col justify-between p-6 select-none" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="flex items-center justify-between text-white mb-2 pt-2 z-10">
              <div className="space-y-0.5">
                <span className="font-mono text-[#3079D8] text-[9.5px] uppercase tracking-widest block font-black">ARCHIVE INSPECTOR // {current.name.toUpperCase()}</span>
                <p className="font-display text-xs font-black uppercase">{current.descriptor} // FRAME {String(photoIndex + 1).padStart(2, "0")}</p>
              </div>
              <div className="font-mono text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-bold">{String(photoIndex + 1).padStart(2, "0")} // {String(galleryImages.length).padStart(2, "0")}</div>
              <button onClick={() => setLightboxOpen(false)} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-neutral-950 transition-all cursor-pointer" aria-label="Close Lightbox"><X size={15} /></button>
            </div>
            <div className="relative flex-1 flex items-center justify-center p-4">
              <button onClick={prev} className="absolute left-2 md:left-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-black text-white transition-all border border-white/10 cursor-pointer hidden sm:flex" aria-label="Previous Frame"><ChevronLeft size={20} /></button>
              <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div key={photoIndex} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25, ease: "easeOut" }} className="flex items-center justify-center">
                    <img src={galleryImages[photoIndex].src} alt={`${current.name} frame ${String(photoIndex + 1).padStart(2, "0")}`} className="max-h-[72vh] max-w-[88vw] w-auto h-auto rounded-xl shadow-2xl border border-white/5" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <button onClick={next} className="absolute right-2 md:right-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-black text-white transition-all border border-white/10 cursor-pointer hidden sm:flex" aria-label="Next Frame"><ChevronRight size={20} /></button>
            </div>
            <div className="text-center font-mono text-neutral-450 py-3 space-y-2 z-10 border-t border-white/10">
              {galleryImages[photoIndex].caption ? (
                <p className="font-sans text-[12px] tracking-normal text-neutral-300 max-w-2xl mx-auto leading-relaxed px-4">{galleryImages[photoIndex].caption}</p>
              ) : (
                <p className="text-[9.5px] tracking-widest text-neutral-400 uppercase">{current.descriptor} // F&amp;B MASTER ARCHIVE</p>
              )}
              <div className="flex items-center justify-center gap-6 text-[8.5px] tracking-widest uppercase text-neutral-500">
                <span className="inline-flex items-center gap-1 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-white" />Swipe left/right to browse</span>
                <span className="hidden md:inline-flex items-center gap-1 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />Keyboard Arrow Keys active</span>
                <span className="inline-flex items-center gap-1 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Esc to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Brand Card (collection landing page) ────────────────────────────────────
interface BrandCardProps { brand: FBBrand; index: number; onClick: (id: string) => void; }

const BrandCard: React.FC<BrandCardProps> = ({ brand, index, onClick }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: (index % 3) * 0.1 }} onClick={() => onClick(brand.id)} className="group space-y-4 cursor-pointer">
      <div className="aspect-[4/5] w-full rounded-xl overflow-hidden shadow-sm relative">
        <img src={brand.thumb} alt={`${brand.name} — ${brand.descriptor} by Neorama Studios`} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 w-full z-10">
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/70 mb-1.5 font-bold">{brand.descriptor}</p>
          <h3 className="font-display text-lg md:text-xl font-black text-white uppercase tracking-tight leading-none">{brand.name}</h3>
        </div>
        <div className="absolute bottom-5 right-5 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><Maximize2 size={13} /></div>
      </div>
      <div className="flex items-center justify-between font-mono">
        <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">{brand.images.length} Master Frames</span>
        <span className="text-[9px] text-[#3079D8] uppercase tracking-widest font-black inline-flex items-center gap-1 group-hover:gap-2 transition-all">View Gallery <ArrowRight size={10} /></span>
      </div>
    </motion.div>
  );
};
