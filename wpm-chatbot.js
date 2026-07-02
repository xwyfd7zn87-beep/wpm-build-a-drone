/**
 * WPM Management Systems — AI Chat Widget
 * Version 1.0
 * Self-contained, no external dependencies, no API keys required.
 * Embed with: <script src="wpm-chatbot.js" defer></script>
 */
(function () {
  'use strict';
  if (window.__WPMChatLoaded) return;
  window.__WPMChatLoaded = true;

  /* ============================================================
     KNOWLEDGE BASE
  ============================================================ */
  var KB = {

    greetings: {
      patterns: ['hello', 'hi', 'hey', 'howdy', 'good morning', 'good afternoon', 'good evening', "what's up", 'whats up', 'sup', 'yo', 'start', 'help'],
      response: "Hey there! 👋 Welcome to **WPM Management Systems**.\n\nI'm here to help you:\n\n• 🚁 Build or configure a custom drone\n• 🛒 Find and buy drone parts\n• 🌐 Learn about WPM's aerial services\n• 📞 Connect with our team\n\nWhat can I help you with today?",
      quickReplies: ['Help me build a drone', 'Shop parts', 'Learn about aerial services', 'Talk to someone']
    },

    wpm: {
      patterns: ['wpm management', 'about wpm', 'who are you', 'what is wpm', 'about you', 'your company', 'who is wpm', 'tell me about wpm'],
      response: "**WPM Management Systems** 🏢\n\nWe're a multi-service company based in the **Binghamton / Southern Tier NY** area with three core divisions:\n\n🚁 **WPM AeroMed** — Professional drone services (inspection, thermal imaging, mapping, SAR)\n\n🔨 **Handymanzz** — Home repair and maintenance services\n\n🎓 **Drone Program Consulting** — Helping schools and law enforcement launch drone programs\n\nWe also run a **drone parts store** (100+ components, fulfilled by Orbit Works) and a free **Build-a-Drone Configurator** tool.\n\n📧 [wpmsystems@gmail.com](mailto:wpmsystems@gmail.com)",
      quickReplies: ['Learn about aerial services', 'Help me build a drone', 'Shop parts', 'Talk to someone']
    },

    configurator: {
      patterns: ['configurator', 'build a drone', 'build drone', 'configure drone', 'how to build', 'custom drone', 'drone builder', 'build my drone', 'make a drone', '7 stages', 'stages', 'real-time pricing', 'build tool', 'drone tool', 'free tool'],
      response: "**Build-a-Drone Configurator** 🚁\n\nOur free interactive tool walks you through every step of designing a custom drone!\n\n**Features:**\n• 7 guided build stages\n• 113 selectable parts\n• Real-time price calculation as you configure\n• Recommendations for your use case\n\n**The 7 stages:**\n1. Frame (structure & size)\n2. Motors (thrust & power)\n3. ESCs (motor speed control)\n4. Flight Controller (the brain)\n5. Battery (power source)\n6. GPS & Receiver (positioning & RC link)\n7. Camera / FPV System (visual payload)\n\n🚀 [Launch the Free Configurator](https://xwyfd7zn87-beep.github.io/wpm-build-a-drone/)",
      quickReplies: ['Racing drone build', 'Photography drone build', 'SAR/inspection build', 'Shop parts']
    },

    frame: {
      patterns: ['frame', 'chassis', 'body', 'carbon fiber', '5 inch', '5"', '6 inch', '6"', '7 inch', '7"', '8 inch', '8"', 'quad frame', 'hex frame', 'octo frame', 'quadcopter', 'structure'],
      response: "**Drone Frames** 🏗️\n\nThe frame is your drone's skeleton — it determines size, weight, and purpose.\n\n**Key specs:**\n• **Size** — measured by propeller diameter it fits (e.g., 5\", 6\", 7\")\n• **Material** — Carbon fiber: lightest & strongest. Plastic/G10: cheaper, heavier\n• **Configuration** — Quad (4 motors), Hex (6), Octo (8)\n\n**By use case:**\n• 🏎️ **Racing/Freestyle** — 3–5\" lightweight frames\n• 📷 **Photography** — 5–7\" rigid frames with gimbal mounts\n• 🔍 **Inspection/SAR** — 6–8\" or fixed-wing for endurance\n• 🌾 **Agriculture** — Heavy-lift Hex/Octo frames\n\n🛒 [Browse frames in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Tell me about motors', 'Tell me about flight controllers', 'Help me build a drone']
    },

    motors: {
      patterns: ['motor', 'motors', 'kv rating', 'kv', 'thrust', '2306', '2207', '2205', 'brushless', 'stator', 'motor size'],
      response: "**Drone Motors** ⚙️\n\nMotors generate thrust — matching them to your build is crucial.\n\n**Key specs:**\n• **Stator size** (e.g., 2306 = 23mm wide, 6mm tall) — larger = more torque\n• **KV rating** — RPM per volt. Lower KV = big slow props (more lift). Higher KV = small fast props (speed)\n• **Poles** — more poles = smoother, more efficient power delivery\n\n**By use case:**\n• 🏎️ **Racing** — 2205–2306, 2300–2600KV, 4S battery\n• 📷 **Photography** — 2306–2312, 1500–1900KV, 4–6S\n• 🔍 **SAR/Inspection** — 2208–2812, 1000–1500KV\n• 🌾 **Agriculture** — 4008–5010, 400–700KV for large props\n\n🛒 [Browse motors in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Tell me about ESCs', 'Tell me about batteries', 'Help me build a drone']
    },

    esc: {
      patterns: ['esc', 'electronic speed controller', 'speed controller', 'blheli', 'dshot', 'current rating', 'amp rating', '30a', '40a', '45a', '60a', '4-in-1', 'four in one'],
      response: "**ESCs — Electronic Speed Controllers** 🔌\n\nESCs translate your flight controller's commands into motor speed by regulating power.\n\n**Key specs:**\n• **Current rating (Amps)** — must exceed your motor's peak draw (e.g., 35A, 45A, 60A)\n• **Protocol** — DSHOT300/600 is modern standard; BLHeli_32 / AM32 firmware are popular\n• **4-in-1 vs. individual** — 4-in-1 saves space/weight; individual allows easier replacement\n\n**Tips:**\n• Rate your ESC 20–30% above the motor's max current draw\n• 4-in-1 ESCs are ideal for 5\" racing/freestyle builds\n• Match voltage rating to your battery (4S = 16.8V max, 6S = 25.2V max)\n\n🛒 [Browse ESCs in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Tell me about flight controllers', 'Tell me about batteries', 'Help me build a drone']
    },

    flightController: {
      patterns: ['flight controller', ' fc ', 'flight control', 'betaflight', 'ardupilot', 'pixhawk', 'f4', 'f7', 'gyroscope', 'imu', 'the brain', 'autopilot', 'f405', 'f722', 'gyro', 'stabilization'],
      response: "**Flight Controllers (FC)** 🧠\n\nThe FC is the brain of your drone — it reads sensors and adjusts motor speeds 2,000+ times per second to keep you stable.\n\n**Key specs:**\n• **Processor** — F4, F7, H7 (faster chip = better filtering & features)\n• **Firmware** — Betaflight (racing/freestyle), ArduPilot / Pixhawk (autonomous/mapping)\n• **Built-ins** — OSD, barometer, blackbox logging, integrated gyro\n\n**By use case:**\n• 🏎️ **Racing/Freestyle** — Betaflight F7 stack, compact form factor\n• 📷 **Cinematic** — F7 with good vibration damping\n• 🔍 **Autonomous/Mapping** — Pixhawk / ArduPilot with mission planning\n• 🌾 **Agriculture** — Pixhawk Cube with CAN bus support\n\n🛒 [Browse flight controllers in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Tell me about GPS', 'Tell me about cameras', 'Help me build a drone']
    },

    battery: {
      patterns: ['battery', 'batteries', 'lipo', 'lihv', 'mah', '4s', '6s', 'voltage', 'capacity', 'c rating', 'lithium', 'li-ion', 'cell count', 'flight time', 'power'],
      response: "**Drone Batteries** 🔋\n\nBatteries determine flight time, power output, and total weight. LiPo (Lithium Polymer) is the standard.\n\n**Key specs:**\n• **Cell count (S)** — 4S = 14.8V nominal, 6S = 22.2V. More cells = more power\n• **Capacity (mAh)** — higher = longer flight, but heavier\n• **C rating** — max discharge rate. Higher C = more burst current\n• **Connector** — XT60 is standard; XT30 for micros\n\n**By use case:**\n• 🏎️ **Racing** — 4S 1300–1500mAh, 75C+ rating\n• 📷 **Photography** — 4–6S 3000–5000mAh, balance weight vs. flight time\n• 🔍 **SAR/Inspection** — 6S 5000–10000mAh for long endurance\n• 🌾 **Agriculture** — Large 6S–12S packs, often multi-pack parallel\n\n🛒 [Browse batteries in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Tell me about motors', 'Help me build a drone', 'Shop parts']
    },

    gps: {
      patterns: ['gps', 'positioning', 'gnss', 'glonass', 'beidou', 'geofencing', 'return to home', 'rth', 'waypoint', 'location', 'm8n', 'm9n', 'm10', 'rtk'],
      response: "**GPS & Positioning** 📍\n\nGPS modules give your drone position awareness — essential for autonomous flight, return-to-home, and mapping.\n\n**What GPS enables:**\n• Position hold (hover without drifting)\n• Return-to-Home (RTH) on signal loss\n• Waypoint missions and automated surveys\n• Geofencing boundaries\n\n**Popular modules:**\n• **M8N / M9N** — reliable, great value, fast lock\n• **M10** — latest gen, multi-constellation, quick cold start\n• **RTK GPS** — centimeter-level accuracy for precision mapping and agriculture\n\n**Note:** Most GPS modules include a built-in compass (magnetometer) — mount away from power wires to avoid interference.\n\n🛒 [Browse GPS modules in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Tell me about receivers', 'SAR/inspection build', 'Shop parts']
    },

    receiver: {
      patterns: ['receiver', ' rx ', 'remote control', 'rc link', 'radio link', 'crossfire', 'elrs', 'expresslrs', 'sbus', 'crsf', 'transmitter', 'controller link', 'signal range', 'radio range'],
      response: "**Receivers & RC Links** 📡\n\nThe receiver picks up your transmitter's signal and passes it to the flight controller.\n\n**Popular systems:**\n• **ExpressLRS (ELRS)** — open-source, ultra-low latency, excellent range. Currently the most popular choice\n• **TBS Crossfire** — industry-standard long range, up to 40km\n• **FrSky** — reliable, solid mid-range performance\n• **Spektrum** — common with beginners and RTF (Ready-to-Fly) models\n\n**Protocols:**\n• CRSF, SBUS, IBUS — digital, low latency (preferred)\n• PPM — older analog standard, avoid for new builds\n\n**For SAR / Long Range missions** — use ELRS 900MHz or TBS Crossfire for maximum range and link reliability.\n\n🛒 [Browse receivers in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Tell me about FPV systems', 'SAR/inspection build', 'Help me build a drone']
    },

    fpv: {
      patterns: ['fpv', 'first person view', 'video transmitter', 'vtx', 'goggles', 'analog fpv', 'digital fpv', 'dji o3', 'walksnail', 'hdzero', 'video feed', 'live video', 'fpv camera'],
      response: "**FPV Systems** 👓\n\nFPV (First Person View) lets you see live through your drone's camera via goggles or a monitor.\n\n**Analog vs Digital:**\n• **Analog** — lowest latency, works at long range, very affordable. Lower image quality\n• **Digital** — HD quality video. Three major systems:\n  - **DJI O3/O4** — best image quality, closed ecosystem\n  - **Walksnail Avatar** — excellent quality, more open platform\n  - **HDZero** — lowest latency digital, popular for racing\n\n**Components needed:**\n• **VTX (Video Transmitter)** — on the drone, sends video\n• **FPV Camera** — captures the image\n• **Goggles or Monitor** — displays the feed on the ground\n\n🛒 [Browse FPV gear in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Racing drone build', 'Tell me about cameras', 'Shop parts']
    },

    camera: {
      patterns: ['camera', 'gimbal', 'payload', 'gopro', '4k video', 'mapping camera', 'thermal camera', 'thermal imaging', 'infrared', 'flir', 'aerial photo', 'aerial video', 'photography drone', 'filming drone', 'stabilized'],
      response: "**Cameras & Gimbals** 📷\n\nYour camera payload depends heavily on your mission type.\n\n**Types:**\n• **Action Cameras** (GoPro, Insta360) — great for cinematic FPV and freestyle\n• **Gimbal-stabilized setups** — 3-axis stabilization for buttery smooth video (Gremsy, DJI, RunCam)\n• **Mapping Cameras** — Sony, MicaSense for photogrammetry, GIS, and orthomosaic mapping\n• **Thermal / Infrared** — FLIR Boson, Lepton for heat detection, inspection, and SAR operations\n\n**WPM AeroMed uses:**\n• High-resolution cameras for infrastructure inspection\n• Thermal imaging cameras for heat detection and SAR missions\n• Mapping cameras for GIS and aerial survey work\n\n**Gimbal tip:** Ensure your frame has a front/belly mount and your FC supports gimbal control outputs.\n\n🛒 [Browse cameras in our store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Photography drone build', 'Learn about aerial services', 'Shop parts']
    },

    racingBuild: {
      patterns: ['racing', 'race drone', 'racing drone', 'freestyle drone', 'fpv racing', 'speed drone', 'fast drone', '5 inch build', 'whoops', 'racing build', 'freestyle build'],
      response: "**Racing / Freestyle Build** 🏎️\n\nHere's a recommended spec sheet for a 5\" racing or freestyle quad:\n\n• **Frame:** 5\" carbon fiber, H or True-X layout, under 100g\n• **Motors:** 2205–2306, 2300–2600KV\n• **ESC:** 4-in-1, 35–45A, BLHeli_32, DSHOT600\n• **Flight Controller:** F7 stack with Betaflight, integrated OSD\n• **Battery:** 4S LiPo, 1300–1500mAh, 75C+\n• **Receiver:** ExpressLRS 2.4GHz\n• **FPV Camera + VTX:** Analog or Walksnail digital\n• **Props:** 5\" tri-blade for racing, 5\" bi-blade for efficiency\n\n💰 **Estimated cost:** $250–$600 depending on component quality\n\n🚀 [Configure your racing build](https://xwyfd7zn87-beep.github.io/wpm-build-a-drone/)\n🛒 [Shop racing parts](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Photography drone build', 'Shop parts', 'Help me build a drone']
    },

    photographyBuild: {
      patterns: ['photography', 'photo drone', 'video drone', 'cinematic drone', 'cinema drone', 'photography build', 'camera drone', 'filming drone', 'aerial photography', 'aerial video', 'cinematic build'],
      response: "**Photography / Cinematic Build** 📷\n\nHere's a recommended spec sheet for a photography/cinematic drone:\n\n• **Frame:** 5–7\" rigid frame, gimbal mount, vibration dampening\n• **Motors:** 2306–2312, 1500–1900KV, 4–6S capable\n• **ESC:** 4-in-1 or individual, 40–60A, DSHOT capable\n• **Flight Controller:** F7 with ArduPilot for GPS modes, or Betaflight with GPS rescue\n• **Battery:** 4–6S, 3000–5000mAh for longer flight time\n• **GPS:** M9N or M10 for position hold and return-to-home\n• **Receiver:** ExpressLRS or FrSky\n• **Camera/Gimbal:** GoPro + 3-axis gimbal, or Naked GoPro on board\n• **FPV:** DJI O3 or Walksnail for HD visual reference\n\n💰 **Estimated cost:** $400–$900+\n\n🚀 [Configure your photography build](https://xwyfd7zn87-beep.github.io/wpm-build-a-drone/)\n🛒 [Shop photography parts](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['SAR/inspection build', 'Learn about aerial services', 'Shop parts']
    },

    sarBuild: {
      patterns: ['sar build', 'search and rescue build', 'inspection build', 'inspection drone', 'long range drone', 'endurance drone', 'mapping drone', 'survey drone', 'gis drone', 'photogrammetry', 'professional drone', 'law enforcement drone'],
      response: "**SAR / Inspection / Mapping Build** 🔍\n\nHere's a recommended spec sheet for a professional long-range or inspection drone:\n\n• **Frame:** 6–8\" efficient quad or fixed-wing platform\n• **Motors:** 2208–2812, 1000–1500KV for maximum efficiency\n• **ESC:** Individual 40–60A, BLHeli_32 or AM32\n• **Flight Controller:** Pixhawk / ArduPilot for full autonomous mission capability\n• **Battery:** 6S, 5000–10000mAh (targets 25–45+ min flight time)\n• **GPS:** M10 or RTK for precision\n• **Receiver:** TBS Crossfire or ELRS 900MHz for long-range link\n• **Camera:** Gimbal + thermal camera (FLIR) for SAR; mapping camera for GIS\n\n💰 **Estimated cost:** $800–$3,000+\n\n🌐 **WPM AeroMed** provides professional aerial inspection services in Southern Tier NY!\n\n🚀 [Configure your SAR build](https://xwyfd7zn87-beep.github.io/wpm-build-a-drone/)\n🛒 [Shop professional parts](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Agriculture build', 'Learn about aerial services', 'Talk to someone']
    },

    agBuild: {
      patterns: ['agriculture', 'agriculture build', 'farming drone', 'crop drone', 'spray drone', 'agricultural drone', 'heavy lift', 'payload drone', 'octocopter', 'hexacopter', 'hex build', 'octo build', 'sprayer drone'],
      response: "**Agriculture / Heavy Lift Build** 🌾\n\nHere's a recommended spec sheet for an agriculture or heavy-lift drone:\n\n• **Frame:** Hex (X6/Y6) or Octo frame, 30–60\" motor arm spread\n• **Motors:** 4008–5010, 400–700KV for 15\"–30\" props\n• **ESC:** 60–80A per motor, FOC capable (e.g., AM32, Flame)\n• **Flight Controller:** Pixhawk Cube or Herelink with CAN bus\n• **Battery:** Multi-pack 6S–12S in parallel, 15000–30000mAh\n• **GPS:** RTK dual-antenna for precision spray path\n• **Receiver:** ELRS 900MHz or Crossfire for field range\n• **Payload:** Spray tank + pump system, or hopper + spreader\n\n**Key considerations:**\n• Weight and CG (center of gravity) are critical for stable flight\n• Plan for quick battery swap cycles between battery packs\n• Check your state's commercial ag drone regulations\n\n🚀 [Configure your build](https://xwyfd7zn87-beep.github.io/wpm-build-a-drone/)\n🛒 [Shop heavy-lift parts](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['SAR/inspection build', 'Learn about aerial services', 'Talk to someone']
    },

    aeromed: {
      patterns: ['aeromed', 'aero med', 'aerial service', 'aerial inspection', 'inspection service', 'thermal imaging service', 'mapping service', 'sar support', 'search rescue', 'storm damage', 'post storm', 'damage assessment', 'binghamton', 'southern tier', 'infrastructure inspection', 'drone service'],
      response: "**WPM AeroMed — Professional Aerial Services** 🚁\n\nFAA Part 107 compliant drone services for the **Binghamton / Southern Tier NY** region.\n\n🔍 **Infrastructure Inspection**\nBridges, towers, rooftops, utility lines — detailed visual and thermal inspection without scaffolding or cranes\n\n🌡️ **Thermal Imaging**\nBuilding heat-loss detection, electrical hot-spot identification, pipeline leak detection, wildfire monitoring support\n\n🗺️ **Mapping & GIS**\nPhotogrammetry surveys, topographic maps, orthomosaic imagery, 3D site models for engineering and planning\n\n🆘 **SAR Coordination Support**\nSearch and rescue operations — thermal + visual scanning, night operations, large area coverage\n\n🌪️ **Post-Storm Damage Assessment**\nRapid aerial documentation for insurance claims, restoration planning, and emergency response\n\n📍 **Serving:** Binghamton, Vestal, Endicott, Johnson City, Owego, and surrounding Southern Tier communities\n\n📧 [Get a quote: wpmsystems@gmail.com](mailto:wpmsystems@gmail.com)",
      quickReplies: ['Drone consulting', 'Handymanzz services', 'Talk to someone', 'Shop parts']
    },

    handymanzz: {
      patterns: ['handymanzz', 'handyman', 'home repair', 'home service', 'maintenance service', 'fix home', 'home improvement', 'contractor service', 'repair service'],
      response: "**Handymanzz — Home Services** 🔨\n\n**Handymanzz** is WPM's home services division providing reliable repair and maintenance for homeowners in the Southern Tier NY area.\n\n**Services include:**\n• General home repairs\n• Routine maintenance and upkeep\n• Home improvement projects\n\nFor a quote or to schedule service:\n\n📧 [wpmsystems@gmail.com](mailto:wpmsystems@gmail.com)\n\nWant to learn more about WPM's other services?",
      quickReplies: ['Learn about aerial services', 'Drone consulting', 'Talk to someone']
    },

    consulting: {
      patterns: ['consulting', 'drone program', 'education drone', 'law enforcement drone', 'police drone', 'school drone', 'university drone', 'training program', 'program development', 'drone policy', 'curriculum', 'drone training program'],
      response: "**Drone Program Consulting** 🎓\n\nWPM helps organizations launch and scale professional drone programs from the ground up.\n\n**For Education Institutions:**\n• UAS curriculum development\n• Equipment selection and sourcing guidance\n• Lab setup and safety protocol creation\n• Student build and flight programs\n\n**For Law Enforcement:**\n• Drone program launch planning\n• Operational procedure development\n• Equipment recommendations for public safety missions\n• Training program design and implementation\n\nWhether starting from zero or expanding an existing program, we can help you build it right.\n\n📧 [Let's talk: wpmsystems@gmail.com](mailto:wpmsystems@gmail.com)",
      quickReplies: ['Learn about aerial services', 'Talk to someone', 'Help me build a drone']
    },

    shopParts: {
      patterns: ['shop', 'buy', 'purchase', 'order', 'store', 'price', 'cost', 'how much', 'orbit works', 'parts store', 'drone parts', 'shopify store', 'online store'],
      response: "**WPM Drone Parts Store** 🛒\n\nOur online store carries a wide selection of quality drone components.\n\n**Available categories:**\n• Frames\n• Motors\n• ESCs (Electronic Speed Controllers)\n• Flight Controllers\n• Batteries\n• GPS Modules\n• Receivers & RC Links\n• FPV Systems & Cameras\n• Gimbals & Payloads\n• Props, Hardware & Accessories\n\n**Fulfillment:** All parts are shipped by our partner **Orbit Works** with reliable, tracked shipping.\n\n**Pricing:** Competitive — 20% above base component cost.\n\n👉 [Browse the full Drone Parts collection](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Help me build a drone', 'Racing drone build', 'Photography drone build', 'Talk to someone']
    },

    compatibility: {
      patterns: ['compatible', 'compatibility', 'work together', 'fit together', 'work with', 'which motor', 'which esc', 'which battery', 'which fc', 'what should i get', 'best for', 'best combination', 'what motor', 'what battery'],
      response: "**Compatibility Guide** 🔧\n\nHere are the key compatibility rules for drone builds:\n\n**Motor ↔ ESC:** ESC current rating should be 20–30% above the motor's max amp draw\n\n**ESC ↔ Battery:** ESC voltage rating must match your cell count (4S max 16.8V, 6S max 25.2V)\n\n**Props ↔ Motor KV:** Lower KV = larger, slower props for efficiency. Higher KV = smaller, faster props for speed\n\n**FC ↔ ESC:** Most modern FCs support DSHOT protocol — match firmware support\n\n**Frame ↔ Props:** Frame size (e.g., 5\") must match prop diameter (e.g., 5\" props)\n\n**Want a full matched build?** Tell me your use case or try our configurator — it handles compatibility automatically!\n\n🚀 [Build-a-Drone Configurator](https://xwyfd7zn87-beep.github.io/wpm-build-a-drone/)",
      quickReplies: ['Racing drone build', 'Photography drone build', 'Help me build a drone', 'Shop parts']
    },

    regulations: {
      patterns: ['faa', 'regulation', 'legal', 'license', 'part 107', 'registration', 'rules', 'allowed', 'airspace', 'waiver', 'commercial drone', 'fly legally'],
      response: "**FAA Drone Regulations (USA)** ⚖️\n\n**Registration:**\nAll drones 0.55–55 lbs must be FAA-registered ($5 fee, must be visible on the drone)\n\n**Part 107 License:**\nRequired for any commercial drone operation (being paid for drone services)\n• Written exam, $175 fee, renewable every 24 months\n• WPM AeroMed operates under Part 107 certification\n\n**Basic Operating Rules:**\n• Fly below 400 feet AGL (above ground level)\n• Stay clear of airports without LAANC authorization\n• Maintain visual line of sight at all times (without waiver)\n• No flight over people or moving vehicles (without waiver)\n• No night flying (without TRUST + night waiver)\n\n**Useful tools:** FAA B4UFLY app, LAANC system (AirMap, Kittyhawk) for airspace authorization\n\n📧 Questions about commercial operations? [Contact us](mailto:wpmsystems@gmail.com)",
      quickReplies: ['Learn about aerial services', 'Drone consulting', 'Talk to someone']
    },

    contact: {
      patterns: ['contact', 'talk to', 'speak to', 'email', 'reach out', 'human', 'real person', 'someone', 'representative', 'support', 'get in touch', 'phone', 'call'],
      response: "**Get in Touch with WPM** 📬\n\nOur team is happy to help with:\n• Custom drone build advice\n• Bulk or professional parts orders\n• Aerial service quotes\n• Drone program consulting\n• General questions\n\n📧 **Email:** [wpmsystems@gmail.com](mailto:wpmsystems@gmail.com)\n\nWe typically respond within 24 hours on business days.\n\n**Explore resources while you wait:**\n🚁 [Build-a-Drone Configurator](https://xwyfd7zn87-beep.github.io/wpm-build-a-drone/)\n🛒 [Drone Parts Store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)",
      quickReplies: ['Help me build a drone', 'Shop parts', 'Learn about aerial services']
    },

    fallback: {
      response: "I don't have a specific answer for that, but our team definitely does! 😊\n\n📧 **Email us:** [wpmsystems@gmail.com](mailto:wpmsystems@gmail.com)\n\nOr try exploring:\n🚁 [Build-a-Drone Configurator](https://xwyfd7zn87-beep.github.io/wpm-build-a-drone/)\n🛒 [Drone Parts Store](https://eb5dv8-uq.myshopify.com/collections/drone-parts)\n\nWhat else can I help you with?",
      quickReplies: ['Help me build a drone', 'Shop parts', 'Learn about aerial services', 'Talk to someone']
    }

  };

  /* ============================================================
     QUICK REPLY ROUTING
  ============================================================ */
  var QUICK_REPLY_MAP = {
    'Help me build a drone':       KB.configurator,
    'Shop parts':                  KB.shopParts,
    'Learn about aerial services': KB.aeromed,
    'Talk to someone':             KB.contact,
    'Racing drone build':          KB.racingBuild,
    'Photography drone build':     KB.photographyBuild,
    'SAR/inspection build':        KB.sarBuild,
    'Agriculture build':           KB.agBuild,
    'Tell me about motors':        KB.motors,
    'Tell me about ESCs':          KB.esc,
    'Tell me about flight controllers': KB.flightController,
    'Tell me about GPS':           KB.gps,
    'Tell me about batteries':     KB.battery,
    'Tell me about cameras':       KB.camera,
    'Tell me about FPV systems':   KB.fpv,
    'Tell me about receivers':     KB.receiver,
    'Help me pick a frame':        KB.frame,
    'Handymanzz services':         KB.handymanzz,
    'Drone consulting':            KB.consulting
  };

  /* ============================================================
     INTENT MATCHING ENGINE
  ============================================================ */
  var INTENT_ORDER = [
    'greetings', 'wpm', 'regulations', 'compatibility',
    'racingBuild', 'photographyBuild', 'sarBuild', 'agBuild',
    'configurator', 'frame', 'motors', 'esc', 'flightController',
    'battery', 'gps', 'receiver', 'fpv', 'camera',
    'aeromed', 'handymanzz', 'consulting', 'shopParts', 'contact'
  ];

  function matchIntent(input) {
    var normalized = ' ' + input.toLowerCase().trim() + ' ';
    for (var i = 0; i < INTENT_ORDER.length; i++) {
      var key = INTENT_ORDER[i];
      var entry = KB[key];
      if (!entry || !entry.patterns) continue;
      for (var j = 0; j < entry.patterns.length; j++) {
        if (normalized.indexOf(entry.patterns[j]) !== -1) {
          return entry;
        }
      }
    }
    return KB.fallback;
  }

  /* ============================================================
     MARKDOWN → HTML RENDERER (lightweight)
  ============================================================ */
  function renderMarkdown(text) {
    var s = text;
    // Bold
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Links
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="wpm-chat-link">$1</a>');
    // Bullet items starting with •
    s = s.replace(/^•[ \t](.+)$/gm, '<li>$1</li>');
    // Numbered list items (1. 2. etc)
    s = s.replace(/^\d+\.\s+(.+)$/gm, '<li class="wpm-ol">$1</li>');
    // Wrap groups of li elements
    s = s.replace(/((<li[^>]*>.*<\/li>\n?)+)/g, function(match) {
      if (match.indexOf('wpm-ol') !== -1) {
        match = match.replace(/class="wpm-ol"/g, '');
        return '<ol class="wpm-list">' + match + '</ol>';
      }
      return '<ul class="wpm-list">' + match + '</ul>';
    });
    // Double newline = paragraph break
    s = s.replace(/\n\n/g, '</p><p class="wpm-p">');
    // Single newline = line break
    s = s.replace(/\n/g, '<br>');
    // Wrap in paragraph
    s = '<p class="wpm-p">' + s + '</p>';
    return s;
  }

  /* ============================================================
     STYLES
  ============================================================ */
  var CSS = [
    '#wpm-chat-root *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}',

    /* Toggle button */
    '#wpm-chat-toggle{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(245,158,11,0.45);display:flex;align-items:center;justify-content:center;z-index:99999;transition:transform 0.2s,box-shadow 0.2s;outline:none}',
    '#wpm-chat-toggle:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(245,158,11,0.6)}',
    '#wpm-chat-toggle svg{width:28px;height:28px;fill:#0a1628;transition:opacity 0.2s}',
    '#wpm-chat-toggle .wpm-icon-close{display:none}',
    '#wpm-chat-toggle.open .wpm-icon-chat{display:none}',
    '#wpm-chat-toggle.open .wpm-icon-close{display:block}',

    /* Unread badge */
    '#wpm-chat-badge{position:absolute;top:-3px;right:-3px;width:18px;height:18px;border-radius:50%;background:#ef4444;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff;display:none}',

    /* Panel */
    '#wpm-chat-panel{position:fixed;bottom:100px;right:24px;width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 120px);background:#0a1628;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(245,158,11,0.15);display:flex;flex-direction:column;z-index:99998;overflow:hidden;transform:scale(0.92) translateY(16px);opacity:0;pointer-events:none;transition:transform 0.25s cubic-bezier(.34,1.56,.64,1),opacity 0.2s;transform-origin:bottom right}',
    '#wpm-chat-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}',

    /* Header */
    '#wpm-chat-header{background:linear-gradient(135deg,#112244 0%,#0d1f3c 100%);padding:16px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(245,158,11,0.2);flex-shrink:0}',
    '#wpm-chat-logo{width:40px;height:40px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:900;font-size:15px;color:#0a1628;letter-spacing:-0.5px}',
    '#wpm-chat-header-text{flex:1;min-width:0}',
    '#wpm-chat-title{color:#fff;font-size:15px;font-weight:700;margin:0;line-height:1.2}',
    '#wpm-chat-subtitle{color:#f59e0b;font-size:11px;margin:2px 0 0;font-weight:500;letter-spacing:0.3px}',
    '#wpm-chat-status{display:flex;align-items:center;gap:5px;margin-top:3px}',
    '.wpm-status-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px rgba(34,197,94,0.6)}',
    '.wpm-status-text{color:#94a3b8;font-size:10px}',
    '#wpm-chat-header-close{background:none;border:none;cursor:pointer;color:#94a3b8;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:color 0.15s,background 0.15s;flex-shrink:0}',
    '#wpm-chat-header-close:hover{color:#fff;background:rgba(255,255,255,0.08)}',

    /* Messages */
    '#wpm-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;scrollbar-color:rgba(245,158,11,0.3) transparent}',
    '#wpm-chat-messages::-webkit-scrollbar{width:4px}',
    '#wpm-chat-messages::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:2px}',

    /* Message bubbles */
    '.wpm-msg{max-width:88%;display:flex;flex-direction:column;animation:wpmFadeUp 0.2s ease}',
    '.wpm-msg.bot{align-self:flex-start}',
    '.wpm-msg.user{align-self:flex-end}',
    '.wpm-bubble{padding:11px 14px;border-radius:14px;font-size:13.5px;line-height:1.55;word-break:break-word}',
    '.wpm-msg.bot .wpm-bubble{background:#112244;color:#e2e8f0;border-bottom-left-radius:4px;border:1px solid rgba(245,158,11,0.1)}',
    '.wpm-msg.user .wpm-bubble{background:linear-gradient(135deg,#1e4080,#1a3460);color:#fff;border-bottom-right-radius:4px}',
    '.wpm-msg-time{font-size:10px;color:#475569;margin-top:4px}',
    '.wpm-msg.user .wpm-msg-time{text-align:right}',

    /* Markdown inside bubbles */
    '.wpm-bubble .wpm-p{margin:0 0 8px}',
    '.wpm-bubble .wpm-p:last-child{margin-bottom:0}',
    '.wpm-bubble .wpm-list{margin:6px 0 6px 18px;padding:0}',
    '.wpm-bubble .wpm-list li{margin-bottom:3px}',
    '.wpm-bubble strong{color:#fbbf24;font-weight:700}',
    '.wpm-bubble em{color:#93c5fd;font-style:italic}',
    '.wpm-bubble .wpm-chat-link{color:#fbbf24;text-decoration:underline;text-underline-offset:2px}',
    '.wpm-bubble .wpm-chat-link:hover{color:#fde68a}',

    /* Quick replies */
    '#wpm-quick-replies{padding:0 16px 12px;display:flex;flex-wrap:wrap;gap:7px}',
    '.wpm-qr{background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);color:#f59e0b;border-radius:20px;padding:6px 13px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;white-space:nowrap;outline:none}',
    '.wpm-qr:hover{background:rgba(245,158,11,0.2);border-color:rgba(245,158,11,0.6);color:#fbbf24}',

    /* Typing indicator */
    '#wpm-typing{padding:0 16px 4px;display:none}',
    '.wpm-typing-bubble{background:#112244;border:1px solid rgba(245,158,11,0.1);border-radius:14px;border-bottom-left-radius:4px;padding:10px 14px;display:inline-flex;gap:5px;align-items:center}',
    '.wpm-typing-dot{width:7px;height:7px;border-radius:50%;background:#f59e0b;opacity:0.4;animation:wpmTyping 1.2s infinite}',
    '.wpm-typing-dot:nth-child(2){animation-delay:0.2s}',
    '.wpm-typing-dot:nth-child(3){animation-delay:0.4s}',

    /* Input area */
    '#wpm-chat-footer{padding:12px 14px;border-top:1px solid rgba(245,158,11,0.1);background:#0d1b36;flex-shrink:0}',
    '#wpm-chat-input-row{display:flex;gap:8px;align-items:flex-end}',
    '#wpm-chat-input{flex:1;background:#112244;border:1px solid rgba(245,158,11,0.2);border-radius:12px;color:#e2e8f0;padding:10px 14px;font-size:13.5px;resize:none;outline:none;min-height:42px;max-height:100px;line-height:1.45;transition:border-color 0.15s}',
    '#wpm-chat-input::placeholder{color:#475569}',
    '#wpm-chat-input:focus{border-color:rgba(245,158,11,0.5)}',
    '#wpm-chat-send{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity 0.15s,transform 0.15s;outline:none}',
    '#wpm-chat-send:hover{opacity:0.9;transform:scale(1.05)}',
    '#wpm-chat-send svg{width:18px;height:18px;fill:#0a1628}',
    '#wpm-chat-footer-note{text-align:center;color:#334155;font-size:10px;margin-top:8px}',
    '#wpm-chat-footer-note a{color:#475569;text-decoration:none}',
    '#wpm-chat-footer-note a:hover{color:#f59e0b}',

    /* Animations */
    '@keyframes wpmFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes wpmTyping{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.25)}}',

    /* Mobile */
    '@media(max-width:440px){',
    '#wpm-chat-panel{right:12px;bottom:88px;width:calc(100vw - 24px)}',
    '#wpm-chat-toggle{right:16px;bottom:16px}',
    '}'
  ].join('');

  /* ============================================================
     HTML TEMPLATE
  ============================================================ */
  var HTML = [
    '<div id="wpm-chat-root">',

    /* Inject styles */
    '<style>' + CSS + '</style>',

    /* Toggle button */
    '<button id="wpm-chat-toggle" aria-label="Chat with WPM" aria-expanded="false">',
      '<span id="wpm-chat-badge">1</span>',
      /* Chat icon */
      '<svg class="wpm-icon-chat" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">',
        '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>',
      '</svg>',
      /* Close icon */
      '<svg class="wpm-icon-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">',
        '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
      '</svg>',
    '</button>',

    /* Panel */
    '<div id="wpm-chat-panel" role="dialog" aria-label="WPM Chat" aria-hidden="true">',

      /* Header */
      '<div id="wpm-chat-header">',
        '<div id="wpm-chat-logo">WPM</div>',
        '<div id="wpm-chat-header-text">',
          '<div id="wpm-chat-title">WPM Management Systems</div>',
          '<div id="wpm-chat-subtitle">DRONE EXPERT &amp; AERIAL SERVICES</div>',
          '<div id="wpm-chat-status">',
            '<span class="wpm-status-dot"></span>',
            '<span class="wpm-status-text">Online · Typically replies instantly</span>',
          '</div>',
        '</div>',
        '<button id="wpm-chat-header-close" aria-label="Close chat">',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">',
            '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
          '</svg>',
        '</button>',
      '</div>',

      /* Messages */
      '<div id="wpm-chat-messages" role="log" aria-live="polite"></div>',

      /* Typing */
      '<div id="wpm-typing">',
        '<div class="wpm-typing-bubble">',
          '<div class="wpm-typing-dot"></div>',
          '<div class="wpm-typing-dot"></div>',
          '<div class="wpm-typing-dot"></div>',
        '</div>',
      '</div>',

      /* Quick replies */
      '<div id="wpm-quick-replies"></div>',

      /* Footer */
      '<div id="wpm-chat-footer">',
        '<div id="wpm-chat-input-row">',
          '<textarea id="wpm-chat-input" placeholder="Ask about drones, parts, or services..." rows="1" aria-label="Type your message"></textarea>',
          '<button id="wpm-chat-send" aria-label="Send message">',
            '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">',
              '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>',
            '</svg>',
          '</button>',
        '</div>',
        '<div id="wpm-chat-footer-note">',
          'Powered by <a href="https://wpmsystems.com" target="_blank">WPM Management Systems</a>',
        '</div>',
      '</div>',

    '</div>', // end panel
    '</div>'  // end root
  ].join('');

  /* ============================================================
     WIDGET CONTROLLER
  ============================================================ */
  function getTime() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m < 10 ? '0' + m : m) + ' ' + ampm;
  }

  var isOpen = false;
  var messagesEl, typingEl, quickRepliesEl, inputEl, toggleBtn, panel, badge;

  function open() {
    isOpen = true;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    badge.style.display = 'none';
    setTimeout(function() { inputEl.focus(); }, 300);
  }

  function close() {
    isOpen = false;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  function toggle() {
    if (isOpen) close(); else open();
  }

  function addMessage(type, html, time) {
    var div = document.createElement('div');
    div.className = 'wpm-msg ' + type;
    div.innerHTML =
      '<div class="wpm-bubble">' + html + '</div>' +
      '<div class="wpm-msg-time">' + (time || getTime()) + '</div>';
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setQuickReplies(replies) {
    quickRepliesEl.innerHTML = '';
    if (!replies || !replies.length) return;
    replies.forEach(function(label) {
      var btn = document.createElement('button');
      btn.className = 'wpm-qr';
      btn.textContent = label;
      btn.addEventListener('click', function() {
        handleQuickReply(label);
      });
      quickRepliesEl.appendChild(btn);
    });
  }

  function showTyping() {
    typingEl.style.display = 'block';
    scrollToBottom();
  }

  function hideTyping() {
    typingEl.style.display = 'none';
  }

  function handleQuickReply(label) {
    setQuickReplies([]);
    addMessage('user', escapeHtml(label));
    var response = QUICK_REPLY_MAP[label] || matchIntent(label);
    deliverBotResponse(response);
  }

  function handleUserInput() {
    var text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    resizeInput();
    setQuickReplies([]);
    addMessage('user', escapeHtml(text));
    var response = matchIntent(text);
    deliverBotResponse(response);
  }

  function deliverBotResponse(entry) {
    showTyping();
    // Simulate thinking delay (400–800ms)
    var delay = 400 + Math.floor(Math.random() * 400);
    setTimeout(function() {
      hideTyping();
      addMessage('bot', renderMarkdown(entry.response));
      setQuickReplies(entry.quickReplies || []);
      scrollToBottom();
    }, delay);
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function resizeInput() {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    // Inject HTML
    var container = document.createElement('div');
    container.innerHTML = HTML;
    document.body.appendChild(container.firstChild);

    // Cache elements
    messagesEl    = document.getElementById('wpm-chat-messages');
    typingEl      = document.getElementById('wpm-typing');
    quickRepliesEl = document.getElementById('wpm-quick-replies');
    inputEl       = document.getElementById('wpm-chat-input');
    toggleBtn     = document.getElementById('wpm-chat-toggle');
    panel         = document.getElementById('wpm-chat-panel');
    badge         = document.getElementById('wpm-chat-badge');

    // Events
    toggleBtn.addEventListener('click', toggle);
    document.getElementById('wpm-chat-header-close').addEventListener('click', close);
    document.getElementById('wpm-chat-send').addEventListener('click', handleUserInput);

    inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
      }
    });

    inputEl.addEventListener('input', resizeInput);

    // Close on backdrop click (outside panel and toggle)
    document.addEventListener('click', function(e) {
      if (isOpen &&
          !panel.contains(e.target) &&
          !toggleBtn.contains(e.target)) {
        close();
      }
    });

    // Greeting message on load (with short delay)
    setTimeout(function() {
      addMessage('bot', renderMarkdown(KB.greetings.response));
      setQuickReplies(KB.greetings.quickReplies);
      // Show badge to attract attention
      badge.style.display = 'flex';
    }, 1200);
  }

  /* ============================================================
     BOOTSTRAP
  ============================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
