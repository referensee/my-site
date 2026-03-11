import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Shuffle,
  Lock,
  Unlock,
  Wand2,
  Trash2,
  Search,
  Plus,
  Minus,
  Copy
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const DATA: Record<string, string[]> = {
  Subject: [
    "young woman", "elderly man", "street musician", "astronaut", "cyberpunk hacker", "medieval knight",
    "samurai warrior", "ballerina", "scientist", "chef", "firefighter", "farmer", "fisherman",
    "construction worker", "police officer", "detective", "journalist", "gamer", "skateboarder",
    "surfer", "pilot", "mechanic", "blacksmith", "wizard", "witch", "superhero", "villain",
    "alien", "android", "robot", "dragon rider", "king", "queen", "princess", "prince", "monk",
    "priest", "nun", "hunter", "explorer", "traveler", "tourist", "street artist", "photographer",
    "painter", "dancer", "singer", "actor", "comedian", "bodybuilder", "soldier", "general", "spy",
    "secret agent", "pirate", "sailor", "merchant", "librarian", "teacher", "student", "hacker",
    "gamer girl", "gamer boy", "bartender", "barista", "delivery rider", "taxi driver", "bus driver",
    "train conductor", "astronaut commander", "time traveler", "gladiator", "nomad", "shepherd",
    "beekeeper", "gardener", "florist", "fashion model", "influencer", "athlete", "marathon runner",
    "boxer", "martial artist", "yoga instructor", "park ranger", "lifeguard", "archaeologist",
    "paleontologist", "marine biologist", "programmer", "cybersecurity expert", "engineer", "architect",
    "pilot captain", "chess master", "magician", "illusionist", "stunt performer", "race car driver",
    "mountaineer", "cowboy"
  ],
  Appearance: [
    "tall", "short", "muscular", "slim", "athletic", "curvy", "elderly", "youthful", "rugged",
    "elegant", "glamorous", "messy hair", "curly hair", "straight hair", "braided hair", "bald",
    "bearded", "mustache", "freckles", "scar", "tattoos", "piercings", "glasses", "sunglasses",
    "long eyelashes", "strong jawline", "soft features", "sharp cheekbones", "rosy cheeks", "dark circles",
    "pale skin", "tan skin", "dark skin", "albino", "red hair", "blonde hair", "black hair",
    "silver hair", "blue eyes", "green eyes", "brown eyes", "hazel eyes", "hooded cloak",
    "leather jacket", "flowing dress", "tailored suit", "battle armor", "casual hoodie",
    "traditional kimono", "streetwear outfit", "royal robes", "priestly garments", "lab coat",
    "chef uniform", "firefighter suit", "pilot uniform", "ninja outfit", "steampunk attire",
    "cybernetic implants", "mechanical arm", "robotic eye", "halo", "wings", "horns", "crown",
    "face paint", "mud stains", "wet clothes", "glowing tattoos", "battle scars", "ornate jewelry",
    "gold accessories", "silver accessories", "pearl necklace", "diamond earrings", "beret", "fedora",
    "beanie", "baseball cap", "headphones", "mask", "gas mask", "eye patch", "prosthetic leg",
    "glowing eyes", "fiery aura", "icy aura", "smoky aura", "angelic glow", "vampiric fangs",
    "wolf ears", "fox tail", "cat ears", "dragon scales", "tattoo sleeve", "henna patterns",
    "paint-splattered clothes", "torn jeans", "combat boots", "sandals"
  ],
  Action: [
    "walking", "running", "jumping", "sitting", "standing", "dancing", "reading", "writing", "painting",
    "cooking", "playing guitar", "playing violin", "singing", "laughing", "crying", "meditating",
    "fighting", "training", "surfing", "skateboarding", "riding a horse", "flying", "swimming", "diving",
    "climbing", "hiking", "exploring", "casting a spell", "holding a sword", "aiming a bow",
    "taking photos", "driving", "riding a motorcycle", "drinking coffee", "typing on a laptop", "coding",
    "gaming", "studying", "teaching", "gardening", "fishing", "working out", "boxing", "doing yoga",
    "lifting weights", "jogging", "sprinting", "sneaking", "hiding", "stealing", "sailing", "rowing",
    "repairing machinery", "welding", "hammering", "forging metal", "mixing potions", "praying",
    "performing on stage", "juggling", "balancing", "walking a dog", "feeding birds", "watering plants",
    "watering flowers", "delivering packages", "serving drinks", "bartending", "barista work",
    "making pizza", "baking bread", "decorating cake", "serving food", "washing dishes", "doing laundry",
    "cleaning", "repairing a car", "tuning an engine", "hacking a terminal", "checking a phone",
    "streaming live", "taking a selfie", "looking through binoculars", "observing stars", "holding a lantern",
    "lighting a candle", "staring into the distance", "hugging", "kissing", "waving", "cheering",
    "saluting", "marching", "digging", "discovering treasure", "studying fossils", "repairing a spaceship",
    "zero gravity floating", "robot maintenance", "drone piloting", "snowboarding"
  ],
  Environment: [
    "city street", "futuristic city", "cyberpunk alley", "forest", "enchanted forest", "ancient temple",
    "castle", "medieval village", "desert", "snowy mountain", "beach", "underwater reef",
    "spaceship interior", "space station", "laboratory", "library", "cafe", "restaurant kitchen",
    "art studio", "concert stage", "boxing ring", "dojo", "gym", "subway station", "airport terminal",
    "harbor", "marketplace", "flower field", "greenhouse", "jungle", "ice cave", "steampunk workshop",
    "hospital room", "classroom", "rooftop", "balcony", "palace hall", "throne room", "cathedral",
    "graveyard", "moon base", "mars colony", "planet surface", "abandoned warehouse",
    "post-apocalyptic wasteland", "battlefield", "countryside road", "farm", "rice field", "riverbank",
    "waterfall", "canyon", "volcanic landscape", "lighthouse", "night market", "street festival",
    "opera house", "theater backstage", "fashion runway", "photo studio", "newsroom", "bakery",
    "barbershop", "garage", "train carriage", "bus stop", "small town square", "suburban backyard",
    "treehouse", "observatory", "museum gallery", "archaeological dig site", "factory floor", "server room",
    "hacker den", "gaming room", "yacht deck", "pirate ship", "desert oasis", "glacier", "cave",
    "cliffside path", "mountain temple", "rooftop garden", "neon diner", "motel room", "police station",
    "courtroom", "prison cell", "luxury penthouse", "spa", "salon", "amusement park", "arcade",
    "school hallway", "dorm room", "construction site", "forest cabin", "snow-covered village", "rainy rooftop"
  ],
  Time_Weather: [
    "sunrise", "sunset", "golden hour", "blue hour", "midday", "midnight", "foggy morning", "misty dawn",
    "rainy afternoon", "thunderstorm", "light drizzle", "snowfall", "blizzard", "clear summer day",
    "cold winter morning", "windy afternoon", "overcast sky", "moonlit night", "starry night",
    "after the rain", "storm approaching", "frosty morning", "rainbow after storm", "dusty sunset",
    "heat haze", "autumn afternoon", "spring morning", "summer twilight", "winter twilight",
    "candlelit evening", "firelit night", "stormy dusk", "bright daylight", "dim interior light",
    "early morning chill", "late afternoon sun", "wet pavement reflections", "mist over water", "desert heat",
    "storm clouds overhead", "silver moonlight", "lantern-lit night", "sunbeams through trees",
    "rain-soaked atmosphere", "warm indoor glow", "cold fluorescent light", "soft dawn haze",
    "sunlit dust particles", "dense morning fog", "clear crisp air", "arctic cold", "post-storm calm",
    "glowing sunset sky", "cool evening breeze", "high-altitude wind", "city smog haze",
    "neon reflections in rain", "twilight shadows", "gentle overcast light", "autumn mist", "dry desert wind",
    "storm-lit clouds", "quiet night air", "misty moonlight", "sunlit morning frost", "late-night neon glow",
    "summer rain shower", "soft evening rain", "winter snow flurries", "humid jungle mist",
    "sunny coastal weather", "electric city night", "soft rainfall haze", "shimmering heat", "dawn after rain",
    "moody grey sky", "sun-washed afternoon", "windblown storm front", "still winter air", "monsoon rain",
    "humid evening", "eclipse light", "harsh noon sun", "glowing neon night", "icy dawn", "drifting snow",
    "gentle sea breeze", "humid tropical weather", "blooming spring weather", "cool blue dawn",
    "warm autumn sunlight", "silver dawn light", "soft indoor lamplight", "stormy sea breeze",
    "desert night chill", "humid greenhouse air", "faint snowfall", "warm spring dusk"
  ],
  Camera: [
    "cinematic framing", "editorial photography", "documentary style", "fashion photography", "street photography",
    "fine art portraiture", "photojournalistic style", "low-angle shot", "high-angle shot", "eye-level shot",
    "over-the-shoulder view", "bird's-eye view", "worm's-eye view", "intimate close portrait",
    "dynamic action framing", "environmental portrait", "wide establishing shot", "telephoto compression",
    "handheld realism", "tripod-stable composition", "POV camera angle", "surveillance camera view",
    "dashcam perspective", "security monitor aesthetic", "drone shot", "crane shot", "tracking shot aesthetic",
    "still frame composition", "found footage look", "editorial cover shot", "lookbook photography",
    "magazine spread aesthetic", "paparazzi style", "behind-the-scenes framing", "candid snapshot feel",
    "formal studio portrait", "run-and-gun shooting style", "natural observation framing", "slow cinema framing",
    "arthouse film composition", "blockbuster movie still", "indie film frame", "minimalist camera language",
    "subject-centered framing", "off-center framing", "negative-space framing", "symmetrical camera setup",
    "asymmetrical framing", "foreground-heavy composition", "background storytelling shot",
    "immersive first-person framing", "tabletop product framing", "portrait session setup",
    "red carpet photo angle", "album cover composition", "monochrome photography style",
    "glamour portrait framing", "real estate photo angle", "travel photography framing",
    "nature documentary angle", "sports photography angle", "street fashion shot", "lifestyle photography framing",
    "urban exploration framing", "wedding photography look", "editorial beauty close-up", "underwater camera view",
    "vehicle-mounted camera angle", "rooftop vantage point", "window-framed perspective",
    "doorway-framed perspective", "mirror reflection shot", "silhouette-oriented framing", "hero shot",
    "reaction shot aesthetic", "group portrait setup", "solo portrait setup", "performance capture framing",
    "catwalk angle", "backstage candid framing", "still life photography setup", "macro photography view",
    "night photography framing", "long-exposure composition", "analog camera feel", "35mm cinema frame",
    "medium-format portrait look", "large-format stillness", "cinemascope-inspired framing",
    "square-format composition", "vertical portrait framing", "landscape photo framing", "panoramic viewpoint",
    "close documentary angle", "festival photography angle", "street portrait framing", "quiet observational shot",
    "camera obscura mood"
  ],
  Lens: [
    "24mm lens", "35mm lens", "50mm lens", "85mm lens", "135mm lens", "200mm lens", "macro lens",
    "telephoto lens", "wide-angle lens", "ultra-wide lens", "anamorphic lens", "tilt-shift lens",
    "fisheye lens", "vintage lens", "prime lens", "cine lens", "portrait lens", "shallow depth of field",
    "deep depth of field", "selective focus", "soft focus lens", "razor-sharp focus", "foreground blur",
    "background compression", "bokeh-rich rendering", "creamy bokeh", "swirly bokeh", "cat-eye bokeh",
    "edge-to-edge sharpness", "lens breathing effect", "chromatic character", "vintage optical softness",
    "distortion-free optics", "barrel distortion", "pincushion distortion", "flare-prone lens",
    "high micro-contrast", "soft highlight rolloff", "cinematic focus falloff", "macro close focus",
    "telephoto isolation", "wide environmental perspective", "compressed perspective", "natural perspective",
    "dramatic perspective stretch", "close-up lens feel", "medium shot lensing", "long-lens observation",
    "street-photography focal length", "run-and-gun focal length", "portrait compression", "ultra-clean optics",
    "vintage cinema optics", "soft-edged rendering", "sharp center focus", "dreamy lens glow",
    "diffusion filter look", "black pro mist effect", "T1.5 aperture look", "f/1.4 look", "f/2.0 look",
    "f/2.8 look", "f/4 look", "f/8 look", "painterly focus transition", "precise subject isolation",
    "layered depth rendering", "ultra-shallow focus plane", "deep-focus cinema look",
    "documentary focus behavior", "spot focus", "rack focus aesthetic", "lens flare streaks",
    "spherical lens look", "anamorphic oval bokeh", "crisp optical clarity", "subtle lens vignette",
    "hard-edged sharpness", "gentle falloff", "close focus intimacy", "environmental sharpness",
    "photo-real focal behavior", "cinematic lens texture", "classic portrait rendering", "editorial lens character",
    "surveillance lens look", "security camera distortion", "underwater lens refraction", "studio lens precision",
    "travel lens versatility", "wildlife telephoto reach", "architectural tilt correction", "fisheye exaggeration",
    "intimate portrait focus", "landscape wide clarity", "macro surface detail", "film-era lens rendering",
    "high-end cinema glass"
  ],
  Shot_Type: [
    "close-up", "extreme close-up", "medium shot", "medium close-up", "full body shot", "wide shot",
    "extreme wide shot", "overhead shot", "profile shot", "three-quarter view", "front-facing portrait",
    "back view", "silhouette shot", "detail shot", "reaction shot", "hero shot", "establishing shot",
    "candid shot", "action shot", "still life shot", "group shot", "solo portrait", "editorial cover shot",
    "beauty close-up", "macro detail shot", "waist-up portrait", "kneeling pose shot", "walking shot",
    "running shot", "jumping shot", "seated portrait", "standing portrait", "low-angle hero shot",
    "high-angle vulnerability shot", "over-the-shoulder shot", "POV shot", "mirror shot", "reflection shot",
    "window frame shot", "doorway frame shot", "through-the-crowd shot", "from-behind shot",
    "side profile shot", "environmental portrait shot", "intimate portrait shot", "performance shot",
    "dance movement shot", "sports motion shot", "travel scene shot", "street moment shot",
    "fashion runway shot", "catalog-style shot", "lookbook shot", "album-cover shot", "poster-style shot",
    "cinematic still", "documentary still", "surveillance still", "underwater shot", "aerial shot",
    "drone-view shot", "landscape scene shot", "architecture detail shot", "food close-up", "product shot",
    "backlit silhouette shot", "sun flare shot", "long exposure shot", "night street shot", "rain-soaked shot",
    "snow scene shot", "battle pose shot", "sword draw shot", "spellcasting shot", "horseback action shot",
    "rooftop stance shot", "balcony portrait", "stage performance shot", "backstage candid shot",
    "studio portrait shot", "editorial campaign shot", "wedding-style portrait", "family portrait shot",
    "festival crowd shot", "market scene shot", "cafe moment shot", "library quiet shot", "workshop process shot",
    "laboratory portrait shot", "spacewalk shot", "cockpit close-up", "driving interior shot", "train window shot",
    "moody hallway shot", "staircase composition shot", "ground-level shot", "bird's-eye composition",
    "fashion beauty shot", "classic portrait shot", "dynamic diagonal composition"
  ],
  Lighting: [
    "soft natural light", "dramatic side lighting", "golden hour light", "blue hour ambience", "neon lighting",
    "rim lighting", "backlighting", "top lighting", "underlighting", "window light", "candlelight",
    "lantern light", "firelight", "studio softbox lighting", "beauty dish lighting", "Rembrandt lighting",
    "butterfly lighting", "split lighting", "high-key lighting", "low-key lighting", "moody chiaroscuro",
    "harsh noon lighting", "overcast soft light", "volumetric lighting", "god rays", "hazy diffused light",
    "practical lights in frame", "fluorescent overhead light", "warm tungsten light", "cold LED light",
    "mixed color temperature lighting", "streetlamp glow", "moonlight", "eclipse lighting", "storm flash lighting",
    "light through blinds", "projector light", "screen glow", "holographic glow", "reflected water caustics",
    "underwater dappled light", "sunbeams through trees", "light shafts in fog", "dusty ambient light",
    "misty backlight", "glossy specular highlights", "subtle skin highlights", "silver reflector fill",
    "negative fill shadows", "cinematic contrast lighting", "soft fill light", "hard key light",
    "motivated practical lighting", "ambient city glow", "rain reflection lighting", "wet pavement highlights",
    "colored gel lighting", "magenta-cyan neon mix", "orange-blue cinematic grade", "white studio seamless light",
    "museum display lighting", "cathedral stained-glass light", "forest canopy light", "desert hard sunlight",
    "snow bounce light", "ice cave glow", "bioluminescent lighting", "orbital station light",
    "emergency red lighting", "computer monitor light", "television flicker light", "headlight beams",
    "flash photography lighting", "paparazzi flash bursts", "silhouette backglow", "sunset rim light",
    "dawn haze lighting", "twilight cool tones", "warm indoor ambient light", "soft portrait key light",
    "editorial beauty lighting", "fashion runway lighting", "concert stage lighting", "spotlight on subject",
    "smoky nightclub light", "cafe window glow", "train interior fluorescent light", "subway station lighting",
    "laboratory sterile light", "operating room light", "greenhouse humid light", "lighthouse beam lighting",
    "stormy daylight", "moonlit fog", "dreamy pastel light", "glittering reflections", "crisp daylight shadows",
    "soft sunset diffusion", "subtle practical warmth"
  ],
  Composition: [
    "rule of thirds", "centered composition", "symmetrical composition", "asymmetrical balance", "leading lines",
    "negative space", "frame within a frame", "foreground interest", "layered depth", "shallow focus composition",
    "deep focus composition", "minimalist composition", "maximalist composition", "diagonal tension",
    "triangular composition", "dynamic perspective", "balanced visual weight", "off-center subject",
    "subject framed by architecture", "subject framed by foliage", "crowded urban composition",
    "clean studio composition", "cinematic widescreen composition", "vertical editorial composition",
    "square crop composition", "panoramic composition", "tight portrait crop", "environment-rich composition",
    "subject isolated in frame", "mirror symmetry", "radial symmetry", "top-down layout", "low horizon line",
    "high horizon line", "open composition", "closed composition", "layered foreground-midground-background",
    "silhouette composition", "backlit composition", "window-framed composition", "doorway-framed composition",
    "reflection-based composition", "shadow-driven composition", "color-blocked composition",
    "monochrome composition", "high-contrast composition", "soft tonal composition", "visual storytelling composition",
    "moment-before-action composition", "frozen action composition", "editorial spread composition",
    "cover-image composition", "album-art composition", "poster-ready composition", "gallery-wall composition",
    "street candid composition", "documentary realism composition", "fashion-forward composition",
    "beauty-close crop composition", "macro texture composition", "architectural geometry composition",
    "organic flowing composition", "chaotic energy composition", "calm balanced composition",
    "empty-space emphasis", "dense detail composition", "subject small in frame", "heroic subject dominance",
    "intimate personal framing", "over-the-shoulder composition", "observer perspective composition",
    "immersive POV composition", "tabletop flat-lay composition", "still-life balance", "product-centered composition",
    "travel postcard composition", "runway-centered composition", "crowd-depth composition", "rooftop edge composition",
    "cliffside depth composition", "mist-layered composition", "rain-reflection composition", "snow-depth composition",
    "fog-obscured composition", "sun-flare composition", "light-beam composition", "candids-with-space composition",
    "camera-through-object composition", "peeking perspective composition", "compressed telephoto composition",
    "wide environmental composition", "interior symmetry composition", "staged narrative composition",
    "spontaneous moment composition", "fashion campaign layout", "cinema-poster balance",
    "classic portrait arrangement", "gallery editorial framing", "quiet contemplative spacing",
    "energy-filled off-balance layout"
  ],
  Mood: [
    "cinematic", "moody", "dreamy", "mysterious", "romantic", "melancholic", "joyful", "nostalgic",
    "tense", "epic", "serene", "intimate", "playful", "dramatic", "hopeful", "lonely", "haunting",
    "ethereal", "surreal", "uplifting", "brooding", "gritty", "elegant", "luxurious", "minimalist",
    "chaotic", "peaceful", "dark fantasy", "heroic", "suspenseful", "whimsical", "warm", "cold",
    "sacred", "rebellious", "futuristic", "timeless", "romantic tension", "quiet contemplation",
    "restless energy", "fragile tenderness", "stoic resolve", "adventurous", "awe-struck", "graceful",
    "triumphant", "somber", "devotional", "charged atmosphere", "dangerous", "cozy",
    "rainy-day melancholy", "festival excitement", "sun-drenched optimism", "stormy intensity", "urban cool",
    "glamorous", "editorial sophistication", "post-apocalyptic dread", "fairytale wonder", "spiritual calm",
    "club-night energy", "after-hours solitude", "retro nostalgia", "vintage romance", "sci-fi wonder",
    "quiet confidence", "bold attitude", "wild freedom", "grounded realism", "eerie silence", "soulful",
    "mournful", "sunset softness", "winter stillness", "electric excitement", "ceremonial grandeur",
    "battle-ready intensity", "hidden danger", "gentle domesticity", "raw vulnerability",
    "streetwise confidence", "poetic melancholy", "lush sensuality", "reserved elegance", "radiant happiness",
    "storm-before-peace", "midnight mystery", "morning freshness", "introspective", "cinema-noir tension",
    "mythic power", "fragile beauty", "neon loneliness", "sunlit innocence", "weightless wonder",
    "meditative silence", "untamed ferocity", "bittersweet longing"
  ],
  Style: [
    "photorealistic", "cinematic realism", "editorial fashion", "street documentary", "fine art photography",
    "film still", "neo-noir", "cyberpunk", "dark fantasy", "high fantasy", "surrealist", "dreamcore",
    "vaporwave", "steampunk", "retro-futurism", "minimalist", "maximalist", "baroque", "gothic",
    "art deco", "victorian", "japanese anime inspired", "watercolor illustration", "oil painting aesthetic",
    "charcoal sketch", "comic book style", "graphic novel aesthetic", "3D render look", "studio portrait style",
    "magazine editorial", "lookbook aesthetic", "luxury campaign aesthetic", "album cover style",
    "poster art style", "documentary realism", "social realism", "brutalist aesthetic", "utopian sci-fi",
    "dystopian sci-fi", "analog photography style", "35mm film style", "medium-format style",
    "large-format photography", "polaroid aesthetic", "instant film feel", "fashion campaign style",
    "beauty editorial", "streetwear editorial", "runway photography style", "wedding photography style",
    "travel magazine style", "national geographic style", "sports editorial style", "concert photography style",
    "food photography style", "architectural photography style", "underwater photography style",
    "nature documentary style", "museum catalog style", "fine jewelry campaign", "luxury fragrance ad style",
    "indie cinema aesthetic", "arthouse cinema style", "blockbuster movie style", "A24-inspired mood",
    "silent film mood", "western film aesthetic", "samurai cinema style", "French New Wave mood",
    "Italian neorealism feel", "golden age Hollywood style", "music video aesthetic",
    "experimental cinema mood", "editorial portrait style", "beauty-campaign polish", "avant-garde fashion",
    "punk visual style", "bohemian editorial", "romantic painterly style", "hypermodern visual style",
    "retro diner aesthetic", "mid-century design mood", "futuristic UI-inspired look", "game cinematic style",
    "AAA concept art aesthetic", "indie game art mood", "storybook illustration feel", "fairytale visual style",
    "mythological painting tone", "prestige TV drama look", "crime thriller aesthetic",
    "psychological drama tone", "sci-fi horror style", "cozy domestic realism", "eclectic editorial style",
    "gallery photography style", "museum-worthy fine art", "high-end commercial polish", "premium cinematic finish"
  ],
  Extreme_Photorealism: [
    "ultra photorealistic", "hyperreal detail", "lifelike realism", "true-to-life rendering", "near-perfect realism",
    "cinema-grade realism", "documentary-level realism", "ultra lifelike textures", "natural human anatomy",
    "realistic facial proportions", "anatomically accurate hands", "accurate bone structure", "micro skin detail",
    "subsurface skin realism", "true skin translucency", "realistic body posture", "natural gesture fidelity",
    "authentic clothing drape", "gravity-accurate fabric fall", "physically accurate shadows",
    "true-to-camera realism", "cinematic real-world accuracy", "photo-grade skin texture",
    "realistic pore structure", "lifelike eye moisture", "realistic sclera detail", "accurate tear ducts",
    "natural lip texture", "detailed ear anatomy", "true finger proportions", "accurate nail detail",
    "subtle skin blemishes", "natural asymmetry", "real facial imperfection", "authentic expression dynamics",
    "muscle tension realism", "realistic neck tendons", "vein subtlety", "capillary realism",
    "photo-real fabric weave", "real leather grain", "true metal reflectance", "glass refraction realism",
    "authentic wood grain", "stone surface realism", "dust particle realism", "sweat sheen accuracy",
    "weathered surface realism", "real lens sensor behavior", "natural exposure behavior",
    "real-world lighting falloff", "accurate highlight clipping", "true shadow softness", "realistic ambient bounce",
    "high dynamic range realism", "deep tonal latitude", "filmic highlight rolloff",
    "physically based rendering feel", "optically plausible image structure", "camera-native realism",
    "raw-photo realism", "editorial retouch realism", "imperceptible CGI quality",
    "real-world environmental interaction", "authentic atmospheric depth", "real moisture on surfaces",
    "natural dirt accumulation", "subtle facial hair detail", "peach fuzz realism", "accurate eyebrow density",
    "natural eyelash separation", "real hairline irregularity", "true scalp visibility", "realistic mouth interior",
    "accurate tooth translucency", "lip moisture realism", "convincing skin compression", "contact shadow realism",
    "fabric tension realism", "real stitch detail", "material aging realism", "surface wear authenticity",
    "real chipped paint texture", "true condensation detail", "plausible reflection geometry", "optical realism",
    "sensor-depth realism", "shot-on-camera believability", "reality-based image fidelity", "natural color response",
    "true white balance behavior", "authentic tonal response", "photographic truthfulness",
    "uncanny-level realism", "museum-print realism", "editorial campaign realism", "premium commercial realism",
    "large-format realism", "human-eye believable"
  ],
  Camera_Realism: [
    "full-frame camera realism", "medium-format camera realism", "large-format camera behavior", "real sensor depth",
    "sensor-based dynamic range", "authentic ISO grain response", "natural exposure rolloff", "real shutter capture feel",
    "motion blur consistency", "true highlight bloom", "optically realistic flare", "real lens vignetting",
    "sensor noise subtlety", "cinema camera response", "DSLR realism", "mirrorless camera realism",
    "35mm film camera feel", "medium-format film realism", "instant film behavior", "raw capture aesthetic",
    "uncompressed tonal fidelity", "real autofocus behavior", "natural focus breathing", "precise depth mapping",
    "plausible focal plane falloff", "real-world compression", "accurate optical distortion",
    "true perspective geometry", "lens-to-sensor realism", "optical edge softness",
    "high-end cinema sensor look", "rolling shutter subtlety", "global shutter clarity", "sensor clipping realism",
    "specular highlight control", "true black point retention", "exposure-balanced realism",
    "optical micro-contrast", "real aperture rendering", "authentic focal length behavior",
    "on-camera believability", "photographic capture realism", "camera-native perspective", "real bokeh physics",
    "authentic lens character", "filmic sensor response", "real optical aberration", "natural chromatic aberration",
    "genuine lens softness", "clean digital sensor fidelity", "high-resolution sensor realism",
    "shadow recovery realism", "highlight recovery realism", "subtle moire control", "real texture acquisition",
    "capture-medium realism", "cinema negative feel", "real exposure triangle behavior", "low-light camera realism",
    "daylight camera realism", "night photography realism", "flash-sync realism", "practical-light exposure behavior",
    "true camera white balance", "sensor color science realism", "authentic gamma response",
    "optically grounded imagery", "real-world capture aesthetics", "documentary camera truth",
    "editorial camera polish", "commercial camera precision", "non-synthetic camera feel",
    "credible photographic structure", "refractive accuracy", "lens coating behavior", "flare falloff realism",
    "backfocus realism", "true macro capture behavior", "telephoto focus realism", "wide-angle realism",
    "environmental perspective fidelity", "portrait-lens behavior", "stopped-down clarity",
    "wide-open aperture realism", "sensor-level detail retention", "clean highlight separation",
    "subtle tonal compression", "real color channel response", "camera-profile realism", "true digital negative feel",
    "captured-not-rendered look", "print-ready realism", "editorial publication realism", "cinema still realism",
    "production camera fidelity", "photographer-grade image behavior", "optical capture credibility",
    "true scene registration", "non-CGI image logic"
  ],
  Skin_Human_Imperfections: [
    "visible pores", "fine skin texture", "subtle blemishes", "natural freckles", "faint scars",
    "under-eye detail", "soft wrinkles", "expression lines", "slight asymmetry", "peach fuzz", "baby hairs",
    "subsurface scattering in skin", "translucent ears", "vein detail", "capillary hints", "natural lip lines",
    "realistic eyelids", "tear duct detail", "moist waterline", "eyelash separation", "brow hair realism",
    "skin redness variation", "natural blush tones", "sun-kissed skin variation", "slight skin sheen",
    "oiliness in T-zone", "dry patches", "texture around nose", "realistic nostril detail", "subtle facial hair",
    "jawline stubble", "fine neck creases", "collarbone skin detail", "hand wrinkles", "knuckle texture",
    "nail-bed realism", "cuticle detail", "fingerprint subtlety", "true ear structure", "real mouth corners",
    "tooth translucency", "lip moisture", "slight chapped lips", "natural skin folds", "elbow texture",
    "knee texture", "authentic shoulder texture", "clavicle shadow detail", "real skin compression",
    "fabric pressure marks", "temporary redness", "faint tan lines", "subtle moles", "beauty marks",
    "faint acne marks", "natural pores on cheeks", "forehead texture", "crow's feet detail",
    "smile line realism", "slight puffiness", "temple texture", "chin texture", "natural eyebrow irregularity",
    "real lip asymmetry", "uneven skin microtone", "subtle pigmentation", "real hand veins",
    "slight under-eye shadows", "authentic facial tension", "skin stretch realism",
    "subtle pressure indentations", "natural body hair hints", "faint arm hair",
    "micro specular skin highlights", "true skin translucency", "unretouched skin realism",
    "editorial natural retouch", "realistic smile wrinkles", "nose bridge texture", "eyebrow skin texture",
    "natural forehead shine", "lived-in skin realism", "real cheek texture", "subtle pores on forehead",
    "mouth interior realism", "genuine skin tone variation", "freckle clustering", "authentic neck shadows",
    "soft facial asymmetry", "human-scale imperfections", "true-life complexion", "visible skin grain",
    "real pressure points", "natural skin breakups", "camera-visible microtexture", "real portrait skin fidelity",
    "human imperfection detail", "believable complexion", "subtle retouch realism"
  ],
  Hair_Fine_Detail: [
    "individual hair strands", "flyaway hairs", "baby hairs along hairline", "natural strand separation",
    "fine curl detail", "realistic frizz", "windblown strands", "wet hair clumping", "natural shine variation",
    "scalp visibility", "hairline irregularity", "split-end subtlety", "soft backlit hair glow",
    "rim-lit hair detail", "braid texture realism", "loose strand overlap", "hair shadow casting",
    "layered hair volume", "fine bangs texture", "ponytail strand realism", "braided flyaways",
    "curly strand definition", "coily hair detail", "wavy hair texture", "straight hair micro-detail",
    "tousled hair realism", "messy bun realism", "natural hair density", "strand tapering",
    "highlighted strand variation", "multi-tone hair color realism", "root color variation",
    "sunlit hair translucency", "damp hair sheen", "braid tension detail", "loose curls around face",
    "ear-tucked hair detail", "strands across forehead", "windswept silhouette hairs",
    "shoulder-resting strands", "static flyaway subtlety", "fringe detail", "soft beard hair detail",
    "mustache strand detail", "eyebrow strand realism", "eyelash strand definition", "body hair subtle realism",
    "peach fuzz around cheeks", "hair shadow on skin", "clumped curls after humidity", "rain-soaked strand detail",
    "beach-wave texture", "braided crown detail", "twisted loc texture", "afro texture realism",
    "updo strand detail", "wispy sideburns", "neck hair softness", "light-catching strands",
    "dim interior hair sheen", "soft-focus hair edges", "back-of-head texture", "part-line realism",
    "hair tuck compression", "hat-compressed hair detail", "helmet-flattened hair realism", "wind direction in hair",
    "dynamic motion strands", "subtle knotting in hair", "natural strand crossover", "hair depth layering",
    "lowlight and highlight variation", "silver hair strand realism", "blonde flyaway visibility",
    "dark hair shine detail", "red hair copper highlights", "black hair blue undertones", "white hair translucency",
    "plait texture detail", "bun pin tension detail", "clip-held hair compression", "wet roots realism",
    "freshly brushed sheen", "bedhead realism", "gym-sweat hair texture", "post-rain hair texture",
    "cinematic backlit flyaways", "studio-lit hair separation", "editorial hair polish", "unretouched hair realism",
    "natural hair movement", "full-fidelity strand rendering", "human hair believability", "micro strand detail",
    "optically plausible hair texture", "real salon-finish texture", "hair volume realism",
    "delicate strand fringing", "true-to-life hair detail"
  ],
  Material_Surface_Detail: [
    "fabric weave detail", "linen texture", "silk sheen", "velvet pile detail", "wool fiber texture", "denim grain",
    "leather grain", "cracked leather", "suede nap", "cotton softness detail", "knit texture", "lace detail",
    "embroidered stitching", "seam detail", "button reflections", "zipper teeth detail", "metal patina",
    "brushed metal texture", "polished chrome reflections", "oxidized copper", "rust texture", "scratched steel",
    "glass smudges", "glass refraction", "condensation droplets", "fogged glass texture",
    "water droplets on surface", "wet pavement texture", "stone grain", "marble veining", "concrete pores",
    "chipped paint", "weathered wood grain", "varnished wood sheen", "burnished ceramic glaze",
    "porcelain smoothness", "rough clay texture", "paper fibers", "aged paper creases", "ink bleed detail",
    "canvas texture", "paint brushstroke texture", "dust accumulation", "dirt smears", "fingerprints on metal",
    "oily smudges", "scuffed floor texture", "worn fabric edges", "frayed hems", "torn cloth fibers",
    "stitched leather seams", "rubber texture", "plastic surface realism", "acrylic translucency",
    "gemstone refraction", "pearl luster", "gold leaf texture", "silver tarnish", "mirror polish",
    "frosted glass", "ice crystal detail", "snow texture", "mud splatter", "sand granules", "dusty boots texture",
    "skin-contact fabric pressure", "creased clothing realism", "tension folds in fabric", "draped cloth realism",
    "subtle pilling on knitwear", "micro scratches on surfaces", "shallow dents in metal", "aged brass texture",
    "burn marks", "charred surface detail", "moss on stone", "lichen texture", "tree bark texture",
    "leaf vein detail", "flower petal translucency", "food surface texture", "steam condensation on dishes",
    "coffee crema detail", "foam bubbles", "wax drip texture", "candle soot residue", "stained glass texture",
    "tile grout detail", "mirror dust specks", "aged wallpaper texture", "plaster cracks", "ceiling water stains",
    "surface wear realism", "museum-grade material realism", "photo-real product texture", "luxury material finish",
    "micro surface fidelity", "tactile realism", "optically believable surfaces"
  ],
  Lighting_Accuracy: [
    "physically accurate lighting", "natural light falloff", "realistic shadow softness", "contact shadow precision",
    "ambient bounce light", "subsurface skin response", "specular highlight realism",
    "accurate reflection intensity", "correct refraction behavior", "volumetric light consistency",
    "true atmospheric scattering", "plausible light direction", "motivated light sources",
    "color temperature accuracy", "mixed-light realism", "exposure-consistent highlights",
    "real black level retention", "filmic highlight rolloff", "soft penumbra transitions", "hard-light edge clarity",
    "window-light realism", "sunlight angle accuracy", "moonlight plausibility", "candlelight falloff realism",
    "neon spill accuracy", "wet-surface reflection accuracy", "skin sheen response", "cloth light absorption realism",
    "metal reflection behavior", "glass transmission accuracy", "backlight halo realism", "rim light consistency",
    "fog light scatter realism", "dust beam visibility", "multi-source lighting balance",
    "interior-exterior exposure balance", "dynamic range realism", "practical-light illumination logic",
    "caustic reflection realism", "underwater light diffusion", "snow bounce-light realism",
    "desert sunlight harshness", "forest dappled-light logic", "overcast light uniformity",
    "sunset spectrum realism", "blue-hour color accuracy", "night-light exposure realism", "headlight beam logic",
    "streetlamp falloff realism", "screen-glow realism", "monitor-light color cast",
    "fluorescent flicker plausibility", "studio-light precision", "softbox diffusion realism",
    "beauty-dish falloff", "negative fill realism", "fill-to-key balance", "shadow density control",
    "highlight retention realism", "practical reflections in eyes", "surface gloss-light interaction",
    "light wrap around subject", "backdrop light separation", "spatial lighting coherence",
    "perspective-consistent shadows", "occlusion shadow realism", "gobo-pattern realism",
    "blinds-shadow accuracy", "lantern glow realism", "firelight flicker plausibility",
    "cloud-filtered sun realism", "rainy-day light behavior", "storm-light realism", "eclipse-shadow behavior",
    "silver-moonlight realism", "golden-hour skin response", "subtle color spill realism", "bounce-card feel",
    "practical warmth accuracy", "cool ambient fill realism", "specular rolloff realism", "diffuse reflection logic",
    "surface albedo realism", "highlight clipping control", "light attenuation realism",
    "physically plausible contrast", "lens flare-light source consistency", "shadow color realism",
    "tonal-light consistency", "cinema-grade lighting logic", "camera-exposed light realism",
    "photographic lighting fidelity", "real-world illumination behavior", "studio-to-location realism",
    "editorial-light accuracy", "production-ready light logic", "credible scene illumination",
    "optical light believability"
  ],
  Optical_Effects: [
    "natural lens flare", "subtle chromatic aberration", "realistic vignetting", "bokeh highlights",
    "anamorphic flare streaks", "soft halation", "bloom around highlights", "depth haze", "atmospheric perspective",
    "film gate softness", "sensor bloom", "glare on glass", "reflection ghosting", "diffusion filter glow",
    "black pro mist bloom", "focus falloff", "foreground blur", "background blur", "motion blur", "panning blur",
    "long-exposure light trails", "rain streaks on lens", "water droplets on lens", "dust on lens", "film softness",
    "edge softness", "corner vignette", "oval bokeh", "cat-eye bokeh", "swirly bokeh", "double reflection in glass",
    "window glare", "mirror reflection distortion", "heat haze distortion", "underwater refraction",
    "glass prism refraction", "specular sparkle", "starburst highlights", "light wrap", "soft highlight rolloff",
    "lens breathing subtlety", "micro-contrast", "optical compression", "perspective exaggeration",
    "barrel distortion", "pincushion distortion", "tilt-shift plane effect", "fisheye curvature",
    "flare rainbow artifacts", "sensor dust realism", "film emulsion glow", "grain in highlights",
    "noise in shadows", "blooming practical lights", "night neon glow", "rain reflection shimmer", "wet-lens blur",
    "frosted-glass diffusion", "caustic shimmer", "projector flicker", "TV scanline texture",
    "security camera artifacts", "surveillance compression artifacts", "rolling shutter warp", "screen moire",
    "highlight ghosting", "backlit haze", "sun flare veiling", "moon halo", "mist diffusion", "fog softening",
    "smoke bloom", "dusty atmosphere glow", "specular edge kick", "eye catchlight sparkle",
    "candlelight halation", "streetlamp star flare", "soft vignette fade", "cross-screen glare",
    "reflective floor bloom", "lens-edge fringing", "bokeh shape realism", "optical ghost reflections",
    "sensor clipping bloom", "highlight smear", "sunlight diffraction sparkle", "dreamy diffusion", "macro depth blur",
    "telephoto shimmer", "wide-angle edge stretch", "cinema lens artifacts", "analog optical imperfections",
    "practical camera effects", "photo-real optical behavior", "captured-light artifacts", "true lens physics",
    "credible imaging effects", "filmic optical realism"
  ],
  Environmental_Realism: [
    "natural atmospheric depth", "real weather interaction", "wind-reactive clothing", "wind movement in hair",
    "moisture on surfaces", "rain-soaked materials", "puddle reflections", "dust in air", "mist density variation",
    "fog depth layers", "snow accumulation realism", "wet footprints", "mud splatter logic", "sand displacement",
    "surface wear from use", "lived-in environment detail", "real debris scatter", "natural clutter patterns",
    "grime buildup", "water streak marks", "condensation on glass", "temperature-driven haze",
    "sun-warmed surfaces", "cold air crispness", "steam interaction", "breath condensation",
    "light airborne particles", "city pollution haze", "forest humidity realism", "desert dust realism",
    "ocean salt spray", "shoreline foam behavior", "rock erosion detail", "moss growth realism",
    "leaf scatter patterns", "broken twigs and ground texture", "urban wear and tear", "graffiti weathering",
    "aged signage realism", "rusted infrastructure", "weathered concrete", "cracked plaster", "sun-faded paint",
    "aging wood response", "ice melt behavior", "frost edge buildup", "rain streaks on windows",
    "night humidity glow", "storm cloud density", "sunlight through polluted air", "backlit dust particles",
    "interior lived-in realism", "subtle object displacement", "used-fabric realism", "creases from movement",
    "worn floor paths", "organic asymmetry in setting", "real skyline perspective", "distance haze realism",
    "mountain air clarity", "urban reflection complexity", "traffic-light spill", "window reflections from street",
    "train grime realism", "subway moisture detail", "rooftop puddle buildup", "garden growth variation",
    "soil texture realism", "plant imperfection detail", "petal damage realism", "insect bite marks on leaves",
    "architectural aging detail", "hotel wear realism", "kitchen use marks", "coffee stains", "food steam realism",
    "tabletop crumbs", "library dust realism", "museum polish contrast", "factory grease detail",
    "workshop residue", "road salt buildup", "headlight haze interaction", "late-night air moisture",
    "street trash realism", "festival aftermath detail", "battle damage realism", "smoke residue",
    "char and soot deposits", "environmental storytelling detail", "authentic place identity", "site-specific realism",
    "human activity traces", "weather history on surfaces", "timeworn environmental cues",
    "documentary location realism", "cinematic world believability", "photographic environmental fidelity",
    "immersive real-world context"
  ],
  Film_Photography_Texture: [
    "35mm film grain", "medium-format grain", "subtle analog grain", "fine film grain structure", "Kodak Portra feel",
    "Kodachrome-inspired tones", "cinestill halation", "Fuji film color palette", "instant film softness",
    "polaroid color cast", "analog highlight bloom", "filmic shadow rolloff", "grain in midtones",
    "grain in shadows", "organic color variation", "film stock texture", "photo lab print feel",
    "darkroom print contrast", "negative scan aesthetic", "dust and scratch subtlety", "film border feel",
    "light leak accents", "expired film tones", "washed vintage color", "warm analog skin tones",
    "muted highlight palette", "soft blacks", "lifted shadows", "gentle contrast curve", "natural color fading",
    "color negative realism", "slide film saturation", "grainy night film look", "high-ISO film feel",
    "push-processed grain", "cross-processed color shift", "soft focus analog lens", "film-era optical softness",
    "contact-sheet aesthetic", "editorial film scan", "magazine print feel", "archival print tone",
    "silver halide texture", "subtle print grain", "halation around practical lights", "warm scan cast",
    "cool archival tint", "faded print edges", "vintage lab color drift", "chemical-process texture",
    "tonal richness of film", "organic highlight clipping", "creamy analog bokeh", "celluloid mood",
    "motion-picture still texture", "arthouse film grain", "documentary film stock feel",
    "editorial campaign film look", "wedding film photography texture", "travel film snapshot feel",
    "street photography film texture", "nightclub 35mm grain", "sunlit 120 film palette", "portrait film softness",
    "cinema negative texture", "grain-laced highlights", "shadow-rich analog density", "natural scan softness",
    "print-paper texture feel", "film scanner realism", "subtle dust speck artifacts", "lightly faded emulsion",
    "organic frame softness", "authentic analog contrast", "retro magazine texture", "memory-like film rendering",
    "nostalgic print warmth", "matte print finish", "glossy print sheen", "deep color dye feel",
    "vintage postcard texture", "album-photo grain", "family-archive film feel", "museum archival photography feel",
    "premium film scan detail", "fashion editorial film polish", "captured-on-film realism",
    "grain-balanced skin tones", "subtle halide clumping", "real darkroom richness", "period-authentic photo texture",
    "timeless analog finish", "non-digital image character", "printworthy film fidelity", "cinema lab finish",
    "gallery-grade analog texture", "believable film capture feel", "true photographic grain"
  ],
  Resolution_Clarity: [
    "ultra-detailed", "8k clarity", "high resolution", "crisp focus", "micro-detail fidelity", "pin-sharp subject",
    "tack-sharp image", "clean detail rendering", "high-definition texture", "fine edge definition",
    "print-ready sharpness", "gallery print quality", "editorial-quality clarity", "commercial-grade detail",
    "premium image fidelity", "razor-sharp eyes", "clear skin detail", "hair-strand clarity",
    "fabric micro-detail", "surface texture precision", "true fine-detail retention", "optically crisp rendering",
    "clean tonal separation", "high-acuity capture", "clarity without oversharpening", "natural high-frequency detail",
    "subtle sharpening realism", "lens-resolved detail", "sensor-rich detail", "edge-to-edge clarity",
    "subject-isolated crispness", "background detail control", "macro-level sharpness", "fine-print fidelity",
    "high-end commercial sharpness", "cinema still clarity", "production-ready resolution",
    "publication-grade detail", "architectural crispness", "portrait detail precision", "beauty-shot clarity",
    "product-shot sharpness", "nature-detail precision", "studio-clean detail", "field-detail realism",
    "documentary sharpness", "travel-photo clarity", "street-photo detail", "dynamic-range clarity",
    "real texture visibility", "subtle grain-preserved clarity", "clean depth separation", "high-detail realism",
    "ultra-clean image structure", "print publication sharpness", "balanced acutance", "optical crispness",
    "clarity in highlights and shadows", "controlled detail contrast", "premium campaign clarity",
    "cinematic high-res finish", "noise-controlled sharpness", "low-light clarity realism",
    "motion-preserved detail", "high-res portrait fidelity", "crisp environmental detail", "material clarity",
    "clear reflection detail", "facial-feature precision", "true-to-camera sharpness", "focused depth precision",
    "high-fidelity image capture", "retina-level detail", "fine-art print detail", "museum-print clarity",
    "luxury-commercial precision", "wedding-editorial sharpness", "fashion-campaign detail",
    "macro-fidelity clarity", "landscape-detail precision", "close-up detail realism", "crisply rendered textures",
    "clean image geometry", "subtle clarity boost", "realistic detail separation", "true edge contrast",
    "detailed yet natural", "oversampling-like clarity", "full-fidelity detail", "camera-native sharpness",
    "editorial print fidelity", "polished high-resolution finish", "optically believable clarity",
    "premium still-image detail", "human-eye pleasing sharpness", "high-end imaging precision",
    "clarity-rich realism", "true-detail image quality", "non-artificial sharpness"
  ],
  Cartoon_Style_Tags: [
    "cartoon style", "stylized animation", "2D animation look", "3D animation look", "anime-inspired",
    "western animation", "Saturday morning cartoon vibe", "storybook cartoon", "comic strip energy",
    "graphic animation style", "cel-shaded look", "flat-color cartoon", "painted cartoon style",
    "children's book illustration", "cute mascot style", "chibi-inspired proportions", "expressive line art",
    "bold outline style", "clean vector look", "soft rounded design", "playful exaggerated features",
    "big expressive eyes", "simplified anatomy", "colorful cartoon palette", "toon rendering",
    "Saturday TV animation feel", "retro animation style", "classic comic aesthetic", "digital cartoon painting",
    "animation cel look", "character design sheet style", "concept-art cartoon hybrid",
    "stylized fantasy cartoon", "stylized sci-fi cartoon", "cartoon adventure style", "comic-panel aesthetic",
    "graphic novel cartoon fusion", "cute fantasy illustration", "bright playful rendering",
    "minimal cartoon shading", "soft cel lighting", "storybook fantasy style", "TV animation polish",
    "animated film look", "family-friendly cartoon vibe", "youthful illustration style",
    "whimsical cartoon design", "adventure cartoon energy", "fantasy toon styling",
    "modern animation aesthetic", "indie animation feel", "streaming-series cartoon look",
    "cartoon poster style", "toon portrait look", "cartoon action scene style", "character-centric cartoon layout",
    "clean silhouette design", "appealing shape language", "exaggerated cartoon posing",
    "stylized hair shapes", "simplified fabric shapes", "graphic shadow shapes", "vibrant cartoon rendering",
    "illustrated animation look", "friendly cartoon expression", "rounded stylized anatomy", "playful pose design",
    "cheerful animation tone", "cartoon background painting", "storybook environment style", "toon lighting style",
    "character animation aesthetic", "cartoon splash-art look", "digital cel paint finish",
    "painterly cartoon atmosphere", "hybrid anime-cartoon style", "cute commercial mascot style",
    "mobile-game cartoon aesthetic", "cartoon fantasy game art", "stylized adventure game art",
    "fantasy children's cartoon look", "comic-cartoon crossover", "bold color-block cartoon style",
    "expressive animated acting", "squash-and-stretch energy", "storybook hero design",
    "animated sitcom feel", "cartoon cinematic frame", "toon drama look", "youth animation polish",
    "vector-cartoon hybrid", "clean digital illustration", "cartoon concept poster", "fantasy cartoon polish",
    "vivid animation world", "playful character illustration", "high-appeal cartoon styling", "modern toon finish"
  ],
  Cartoon_Quality_Tags: [
    "high-quality cartoon render", "clean linework", "crisp cel shading", "smooth color fills",
    "polished animation finish", "studio-quality toon rendering", "appealing character design",
    "strong silhouette readability", "vibrant color harmony", "expressive facial acting", "dynamic cartoon posing",
    "clean shape design", "professional illustration quality", "refined stylization", "consistent line weight",
    "beautiful background paint", "layered cartoon depth", "clear focal hierarchy", "strong visual appeal",
    "animation-ready model quality", "storybook illustration polish", "high-end toon lighting",
    "elegant simplified forms", "cinematic cartoon composition", "premium digital paint finish",
    "smooth gradients", "controlled texture use", "clean rendering edges", "beautiful color separation",
    "high readability", "appealing eye design", "careful gesture line quality", "polished visual development",
    "concept-art quality cartoon", "strong expression design", "hero-frame quality",
    "production-ready cartoon art", "balanced stylization", "clear character appeal", "premium animation look",
    "attractive lighting design", "sharp compositional clarity", "beautiful stylized proportions",
    "high-fidelity toon finish", "clean anatomy stylization", "designer-quality color script",
    "confident brush economy", "stylized material clarity", "cartoon texture discipline",
    "consistent visual language", "strong staging", "clear gesture readability", "film-quality cartoon image",
    "high-end streaming animation polish", "TV-series production quality", "theatrical animation finish",
    "vivid environment design", "premium poster-ready artwork", "refined cel-paint look", "clean shadow shapes",
    "clear value grouping", "beautiful character rendering", "designer-grade stylization",
    "industry-quality cartoon design", "well-controlled exaggeration", "premium mascot-quality finish",
    "sophisticated toon image", "playful but polished rendering", "animation studio art quality",
    "strong shot readability", "excellent pose silhouette", "appealing color blocking", "soft but crisp finish",
    "rich stylized atmosphere", "refined cartoon storytelling", "clean production design",
    "high-quality shape rhythm", "premium visual appeal", "art-directable cartoon style",
    "focused stylized detail", "beautiful 2D/3D hybrid polish", "high-end children’s illustration quality",
    "slick commercial toon finish", "sharp animation poster quality", "carefully curated palette",
    "clean decorative detail", "friendly premium design", "gallery-worthy cartoon polish",
    "cinematic toon sophistication", "editorial-grade cartoon artwork", "stylized but readable complexity",
    "luxury-grade cartoon finish", "top-tier concept polish", "beautiful graphic simplification",
    "crisp and lively rendering", "professional art-book quality", "showpiece cartoon illustration",
    "premium release quality"
  ]
};

type CategoryData = Record<string, string[]>;
type Selections = Record<string, string[]>;
type Locks = Record<string, boolean>;
type HistoryItem = { prompt: string; createdAt: number };

const categories = Object.keys(DATA);

const MULTI_SELECT_CATEGORIES = new Set<string>([
  "Appearance",
  "Action",
  "Environment",
  "Time_Weather",
  "Lighting",
  "Composition",
  "Mood",
  "Style"
]);

const MAX_MULTI_SELECT = 5;
const HISTORY_LIMIT = 10;
const STORAGE_KEY = "prompt-generator-history-v1";
const DATA_STORAGE_KEY = "prompt-generator-category-data-v1";

function sortValues(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

function sortCategoryData(data: CategoryData): CategoryData {
  const next: CategoryData = {};
  for (const category of Object.keys(data)) {
    next[category] = sortValues(data[category]);
  }
  return next;
}

function sample(values: string[]): string {
  if (!values.length) return "";
  return values[Math.floor(Math.random() * values.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function labelize(value: string): string {
  return value.replace(/_/g, " ");
}

function isMultiSelectCategory(category: string): boolean {
  return MULTI_SELECT_CATEGORIES.has(category);
}

function normalizeSelection(values: string[], isMulti: boolean): string[] {
  const clean = sortValues(values);
  return isMulti ? clean.slice(0, MAX_MULTI_SELECT) : clean.slice(0, 1);
}

function makeInitialSelections(data: CategoryData): Selections {
  const next: Selections = {};
  for (const category of Object.keys(data)) {
    const picked = sample(data[category]);
    next[category] = picked ? [picked] : [];
  }
  return next;
}

function buildPrompt(categoryList: string[], selections: Selections, locks: Locks): string {
  return categoryList
    .filter((category) => !locks[category])
    .flatMap((category) => selections[category] || [])
    .filter((value): value is string => Boolean(value && value.trim()))
    .join(", ");
}

function addValueToCategory(data: CategoryData, category: string, rawValue: string): CategoryData {
  const value = rawValue.trim();
  if (!value) return data;

  return {
    ...data,
    [category]: sortValues([...(data[category] || []), value])
  };
}

function removeValueFromCategory(data: CategoryData, category: string, value: string): CategoryData {
  return {
    ...data,
    [category]: (data[category] || []).filter((item) => item !== value)
  };
}

function toggleCategoryValue(
  selections: Selections,
  category: string,
  value: string,
  isMulti: boolean
): Selections {
  const current = selections[category] || [];
  const exists = current.includes(value);

  if (isMulti) {
    if (exists) {
      return { ...selections, [category]: current.filter((item) => item !== value) };
    }

    if (current.length >= MAX_MULTI_SELECT) {
      return selections;
    }

    return { ...selections, [category]: normalizeSelection([...current, value], true) };
  }

  return { ...selections, [category]: exists ? [] : [value] };
}

function removeSelectionValue(selections: Selections, category: string, value: string): Selections {
  return {
    ...selections,
    [category]: (selections[category] || []).filter((item) => item !== value)
  };
}

function buildHistoryEntry(prompt: string): HistoryItem {
  return { prompt, createdAt: Date.now() };
}

function normalizeHistory(items: HistoryItem[]): HistoryItem[] {
  const seen = new Set<string>();
  const deduped: HistoryItem[] = [];

  for (const item of items) {
    const clean = item.prompt.trim();
    if (!clean || seen.has(clean)) continue;
    seen.add(clean);
    deduped.push({ ...item, prompt: clean });
  }

  return deduped.sort((a, b) => b.createdAt - a.createdAt).slice(0, HISTORY_LIMIT);
}

function mergePersistedCategoryData(
  defaultData: CategoryData,
  persistedData?: Partial<Record<string, string[]>>
): CategoryData {
  const next: CategoryData = {};
  for (const category of Object.keys(defaultData)) {
    const persistedValues = persistedData?.[category];
    next[category] = Array.isArray(persistedValues)
      ? sortValues(persistedValues)
      : sortValues(defaultData[category]);
  }
  return next;
}

function getDefaultData(): CategoryData {
  return sortCategoryData(DATA);
}

function getInitialData(): CategoryData {
  const defaultData = getDefaultData();
  if (typeof window === "undefined") return defaultData;

  try {
    const raw = window.localStorage.getItem(DATA_STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw) as Partial<Record<string, string[]>>;
    return mergePersistedCategoryData(defaultData, parsed);
  } catch (error) {
    console.error(error);
    return defaultData;
  }
}

function getInitialHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return normalizeHistory(JSON.parse(raw) as HistoryItem[]);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function tryCopyText(
  text: string,
  fallbackTarget?: HTMLTextAreaElement | null
): Promise<"success" | "manual" | "failed"> {
  if (!text.trim()) return "failed";

  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return "success";
    }
  } catch (error) {
    console.error("Clipboard API failed:", error);
  }

  try {
    if (typeof document === "undefined") return "failed";

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (copied) return "success";
  } catch (error) {
    console.error("execCommand copy failed:", error);
  }

  if (fallbackTarget) {
    fallbackTarget.focus();
    fallbackTarget.select();
    fallbackTarget.setSelectionRange(0, fallbackTarget.value.length);
    return "manual";
  }

  return "failed";
}

export default function PromptGeneratorApp() {
  const [data, setData] = useState<CategoryData>(getInitialData);
  const [selections, setSelections] = useState<Selections>(() => makeInitialSelections(getInitialData()));
  const [locks, setLocks] = useState<Locks>({
    Cartoon_Style_Tags: true,
    Cartoon_Quality_Tags: true
  });
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(getInitialHistory);
  const [draftValues, setDraftValues] = useState<Record<string, string>>({});
  const [manageMode, setManageMode] = useState<Record<string, boolean>>({});
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const [copiedCurrentPrompt, setCopiedCurrentPrompt] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<"" | "Copied" | "Selected for manual copy">("");
  const promptRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setSelections((prev) => {
      const next: Selections = {};

      for (const category of categories) {
        const validValues = new Set(data[category] || []);
        const current = (prev[category] || []).filter((value) => validValues.has(value));
        next[category] = normalizeSelection(current, isMultiSelectCategory(category));
      }

      return next;
    });
  }, [data]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error(error);
    }
  }, [history]);

  useEffect(() => {
    try {
      window.localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }, [data]);

  const prompt = useMemo(() => buildPrompt(categories, selections, locks), [selections, locks]);

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;

    return categories.filter((category) => {
      const categoryMatch = category.toLowerCase().includes(q);
      const valueMatch = (data[category] || []).some((value) => value.toLowerCase().includes(q));
      return categoryMatch || valueMatch;
    });
  }, [search, data]);

  const flashCopyFeedback = (message: "" | "Copied" | "Selected for manual copy") => {
    setCopyFeedback(message);
    window.setTimeout(() => setCopyFeedback(""), 1600);
  };

  const randomizeAll = () => {
    setIsRandomizing(true);
    window.setTimeout(() => setIsRandomizing(false), 700);

    setSelections((prev) => {
      const next: Selections = { ...prev };

      for (const category of categories) {
        if (locks[category]) continue;

        const values = data[category] || [];
        if (!values.length) {
          next[category] = [];
          continue;
        }

        if (isMultiSelectCategory(category)) {
          const shuffled = shuffle(values);
          const count = Math.min(Math.floor(Math.random() * MAX_MULTI_SELECT) + 1, shuffled.length);
          next[category] = normalizeSelection(shuffled.slice(0, count), true);
        } else {
          next[category] = [sample(values)];
        }
      }

      const newPrompt = buildPrompt(categories, next, locks).trim();
      if (newPrompt) {
        setHistory((prevHistory) =>
          normalizeHistory([buildHistoryEntry(newPrompt), ...prevHistory.filter((item) => item.prompt !== newPrompt)])
        );
      }

      return next;
    });
  };

  const clearAll = () => {
    const next: Selections = {};
    for (const category of categories) next[category] = [];
    setSelections(next);
  };

  const randomizeOne = (category: string) => {
    if (locks[category]) return;

    const values = data[category] || [];
    if (!values.length) return;

    setSelections((prev) => {
      if (isMultiSelectCategory(category)) {
        const shuffled = shuffle(values);
        const count = Math.min(Math.floor(Math.random() * MAX_MULTI_SELECT) + 1, shuffled.length);
        return { ...prev, [category]: normalizeSelection(shuffled.slice(0, count), true) };
      }

      return { ...prev, [category]: [sample(values)] };
    });
  };

  const toggleLock = (category: string) => {
    setLocks((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleToggleValue = (category: string, value: string) => {
    if (locks[category]) return;
    setSelections((prev) => toggleCategoryValue(prev, category, value, isMultiSelectCategory(category)));
  };

  const toggleManageMode = (category: string) => {
    setManageMode((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleAddValue = (category: string) => {
    const draft = (draftValues[category] || "").trim();
    if (!draft) return;

    setData((prev) => addValueToCategory(prev, category, draft));
    setDraftValues((prev) => ({ ...prev, [category]: "" }));
  };

  const handleRemoveValue = (category: string, value: string) => {
    setData((prev) => removeValueFromCategory(prev, category, value));
    setSelections((prev) => removeSelectionValue(prev, category, value));
  };

  const copyHistoryPrompt = async (historyPrompt: string) => {
    const result = await tryCopyText(historyPrompt, promptRef.current);
    if (result === "failed") return;

    setCopiedPrompt(historyPrompt);
    flashCopyFeedback(result === "manual" ? "Selected for manual copy" : "Copied");

    window.setTimeout(() => {
      setCopiedPrompt((current) => (current === historyPrompt ? "" : current));
    }, 1600);
  };

  const copyCurrentPrompt = async () => {
    const promptValue = promptRef.current?.value ?? prompt;
    if (!promptValue.trim()) return;

    const result = await tryCopyText(promptValue, promptRef.current);
    if (result === "failed") return;

    setCopiedCurrentPrompt(true);
    flashCopyFeedback(result === "manual" ? "Selected for manual copy" : "Copied");
    window.setTimeout(() => setCopiedCurrentPrompt(false), 1600);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-28 text-slate-900 md:p-8 md:pb-32">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex max-w-4xl flex-col gap-6"
        >
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <Wand2 className="h-5 w-5" />
                <CardTitle className="text-2xl">Prompt Generator</CardTitle>
              </div>
              <p className="text-sm text-slate-600">
                Multi-select is enabled for selected creative categories with a maximum of {MAX_MULTI_SELECT} values.
                Locked categories are excluded from the final prompt.
              </p>
            </CardHeader>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Browse Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search categories or values"
                  className="rounded-2xl pl-9"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => {
                      const el = document.getElementById(`category-${category}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="rounded-2xl"
                  >
                    {labelize(category)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">Generated Prompt</CardTitle>
                {copyFeedback ? <p className="text-sm text-slate-500">{copyFeedback}</p> : null}
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                ref={promptRef}
                readOnly
                value={prompt || "Select values to build your prompt."}
                className="min-h-[220px] w-full resize-none overflow-hidden rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700"
              />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Prompt History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 space-y-2 overflow-auto">
                {history.length ? (
                  history.map((item, index) => {
                    const copied = copiedPrompt === item.prompt;

                    return (
                      <button
                        key={`${item.prompt}-${item.createdAt}-${index}`}
                        type="button"
                        onClick={() => copyHistoryPrompt(item.prompt)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm hover:bg-slate-100"
                      >
                        {item.prompt}
                        {copied ? <span className="ml-2 text-xs text-green-600">Copied / Selected</span> : null}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-sm text-slate-500">No prompts yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <ScrollArea className="h-[65vh] pr-2">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((category, index) => {
              const isLocked = Boolean(locks[category]);
              const selectedValues = selections[category] || [];
              const values = data[category] || [];
              const isMulti = isMultiSelectCategory(category);
              const draftValue = draftValues[category] || "";

              return (
                <motion.div
                  id={`category-${category}`}
                  key={category}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.01 }}
                >
                  <Card className="h-full rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-base">{labelize(category)}</CardTitle>
                          <p className="mt-1 text-xs text-slate-500">
                            {values.length} values
                            {isMulti ? ` • multi-select up to ${MAX_MULTI_SELECT}` : " • single-select"}
                            {isLocked ? " • locked" : ""}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => randomizeOne(category)}
                            title="Randomize category"
                            disabled={isLocked}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>

                          <Button
                            size="icon"
                            variant={manageMode[category] ? "default" : "outline"}
                            className="rounded-xl"
                            onClick={() => toggleManageMode(category)}
                            title={manageMode[category] ? "Hide value manager" : "Manage category values"}
                            disabled={isLocked}
                          >
                            {manageMode[category] ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </Button>

                          <Button
                            size="icon"
                            variant={isLocked ? "default" : "outline"}
                            className="rounded-xl"
                            onClick={() => toggleLock(category)}
                            title={isLocked ? "Unlock" : "Lock"}
                          >
                            {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {manageMode[category] ? (
                        <div className="flex gap-2">
                          <Input
                            value={draftValue}
                            disabled={isLocked}
                            onChange={(e) => setDraftValues((prev) => ({ ...prev, [category]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddValue(category);
                              }
                            }}
                            placeholder={`Add value to ${labelize(category)}`}
                            className="rounded-2xl"
                          />
                          <Button
                            variant="outline"
                            className="rounded-2xl"
                            disabled={isLocked || !draftValue.trim()}
                            onClick={() => handleAddValue(category)}
                          >
                            Add
                          </Button>
                        </div>
                      ) : null}

                      <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-3">
                        {selectedValues.length ? (
                          selectedValues.map((value) => (
                            <Badge key={value} variant="secondary" className="rounded-xl px-3 py-1">
                              {value}
                              {!isLocked ? (
                                <button
                                  type="button"
                                  className="ml-2"
                                  onClick={() => setSelections((prev) => removeSelectionValue(prev, category, value))}
                                >
                                  ×
                                </button>
                              ) : null}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">
                            {isLocked ? "Locked category hidden from prompt." : "No values selected."}
                          </span>
                        )}
                      </div>

                      <div className="max-h-64 overflow-auto rounded-2xl border border-slate-200 p-2">
                        <div className="flex flex-wrap gap-2">
                          {values.map((value) => {
                            const selected = selectedValues.includes(value);
                            const disableNewMultiSelection =
                              !selected && isMulti && selectedValues.length >= MAX_MULTI_SELECT;

                            return (
                              <div key={value} className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={isLocked || disableNewMultiSelection}
                                  onClick={() => handleToggleValue(category, value)}
                                  className={[
                                    "rounded-xl border px-3 py-1 text-sm",
                                    selected
                                      ? "border-slate-900 bg-slate-900 text-white"
                                      : "border-slate-200 bg-white text-slate-700",
                                    isLocked || disableNewMultiSelection ? "cursor-not-allowed opacity-50" : ""
                                  ].join(" ")}
                                >
                                  {value}
                                </button>

                                {manageMode[category] ? (
                                  <button
                                    type="button"
                                    disabled={isLocked}
                                    onClick={() => handleRemoveValue(category, value)}
                                    className={[
                                      "rounded-xl border border-slate-200 px-2 py-1 text-xs text-slate-500",
                                      isLocked ? "cursor-not-allowed opacity-50" : "bg-white"
                                    ].join(" ")}
                                    title={`Remove ${value}`}
                                  >
                                    Remove
                                  </button>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-wrap justify-center gap-2 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
          <Button onClick={randomizeAll} className="rounded-2xl">
            <motion.span
              animate={
                isRandomizing
                  ? { rotate: [0, -18, 18, -12, 12, 0], scale: [1, 1.12, 1] }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.6 }}
              className="mr-2 inline-flex"
            >
              <Shuffle className="h-4 w-4" />
            </motion.span>
            Randomize
          </Button>

          <Button variant="outline" onClick={clearAll} className="rounded-2xl">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>

          <Button variant="outline" onClick={copyCurrentPrompt} className="rounded-2xl" disabled={!prompt.trim()}>
            <Copy className="mr-2 h-4 w-4" />
            {copiedCurrentPrompt ? "Copied / Selected" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  );
}