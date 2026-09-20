import { LifeReceipt } from '../types';

export const LIFE_RECEIPTS: LifeReceipt[] = [
  // ==========================================
  // CHAPTER 1: THE MIDNIGHT GLITCH (Jan - Feb)
  // ==========================================
  {
    id: 'rec_001',
    category: 'music',
    timestamp: '2026-01-14T02:41:15Z',
    dateFormatted: 'Jan 14, 2026',
    timeFormatted: '02:41 AM',
    timeOfDay: 'late_night',
    title: 'Brian Eno — 1/1 (Music for Airports)',
    subtitle: 'Streamed on Spotify (Repeat 1 ON)',
    details: 'Listened for 47 continuous minutes with noise-canceling headphones at maximum volume.',
    mood: 'restless',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_002', 'rec_003', 'rec_004'],
    connectionReason: 'Played during a late-night panic loop, directly preceding stress-related health searches.',
    tags: ['ambient', 'insomnia', 'late-night', 'focus-trap'],
    metadata: {
      artist: 'Brian Eno',
      album: 'Ambient 1: Music for Airports',
      bpm: 62,
      duration: '17:21',
      playCount: 14
    }
  },
  {
    id: 'rec_002',
    category: 'searches',
    timestamp: '2026-01-14T02:44:20Z',
    dateFormatted: 'Jan 14, 2026',
    timeFormatted: '02:44 AM',
    timeOfDay: 'late_night',
    title: 'Google Search: "resting heart rate 94 while lying down caffeine or stress"',
    subtitle: 'Incognito Tab • 4 tabs opened',
    details: 'User clicked through 3 medical forum threads before scrolling down to "burnout physical warning signs".',
    mood: 'exhausted',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_001', 'rec_003', 'rec_005'],
    connectionReason: 'Searched 3 minutes after starting the Brian Eno ambient loop.',
    tags: ['health-anxiety', 'symptom-check', 'caffeine', 'burnout'],
    metadata: {
      searchEngine: 'Google',
      subsequentSearches: [
        'magnesium glycinate sleep cortisol',
        'how to know if tech job is ruining nervous system'
      ]
    }
  },
  {
    id: 'rec_003',
    category: 'purchases',
    timestamp: '2026-01-14T03:02:45Z',
    dateFormatted: 'Jan 14, 2026',
    timeFormatted: '03:02 AM',
    timeOfDay: 'late_night',
    title: 'Amazon Prime 1-Day: Insomnia SOS Care Kit',
    subtitle: 'Total: $46.80 • Express Delivery',
    details: 'Ordered 200mg L-Theanine capsules, Chamomile Lavender tea tins, and 100% blackout eye mask.',
    mood: 'seeking',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_002', 'rec_004'],
    connectionReason: 'Impulse purchase made directly after health searching at 3 AM.',
    tags: ['impulse-buy', 'wellness-patch', 'midnight-delivery'],
    metadata: {
      merchant: 'Amazon.com',
      amount: 46.80,
      itemCount: 3,
      items: [
        { name: 'Pure Encapsulations L-Theanine', price: 28.50 },
        { name: 'Traditional Medicinals Nighty Night Tea', price: 7.30 },
        { name: 'Manta Modular Sleep Mask', price: 11.00 }
      ],
      paymentMethod: 'Apple Pay (•••• 8821)'
    }
  },
  {
    id: 'rec_004',
    category: 'notes',
    timestamp: '2026-01-14T03:22:00Z',
    dateFormatted: 'Jan 14, 2026',
    timeFormatted: '03:22 AM',
    timeOfDay: 'late_night',
    title: 'Apple Notes: "Things that don\'t feel like real life anymore"',
    subtitle: 'Folder: Unsorted Scratchpad',
    details: 'Drafted: "Woke up with slack notifications pinging in my chest. The Figma canvas has 400 artboards and none of them make anyone happier. Why do I feel like a machine keeping another machine running?"',
    mood: 'exhausted',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_001', 'rec_002', 'rec_003'],
    connectionReason: 'Raw emotional confession written immediately after the midnight purchase.',
    tags: ['existential', 'raw-thought', 'work-fatigue'],
    metadata: {
      wordCount: 84,
      sentimentScore: -0.78
    }
  },
  {
    id: 'rec_005',
    category: 'purchases',
    timestamp: '2026-01-22T23:48:10Z',
    dateFormatted: 'Jan 22, 2026',
    timeFormatted: '11:48 PM',
    timeOfDay: 'late_night',
    title: 'Uber Comfort: Tech Campus Tower B → Apartment 4G',
    subtitle: 'Total: $42.15 • Distance: 8.4 mi',
    details: 'Late night business departure. Tip: $5.00 added. Driver rating: 5 stars.',
    mood: 'exhausted',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_006', 'rec_007'],
    connectionReason: 'Late night departure receipt marking the 4th consecutive week of 12-hour workdays.',
    tags: ['commute', 'late-office', 'overtime'],
    metadata: {
      merchant: 'Uber Technologies',
      amount: 42.15,
      items: [{ name: 'Uber Comfort Late Fare', price: 37.15 }, { name: 'Driver Tip', price: 5.00 }],
      paymentMethod: 'Corporate Amex Expensed'
    }
  },
  {
    id: 'rec_006',
    category: 'messages',
    timestamp: '2026-01-23T00:15:30Z',
    dateFormatted: 'Jan 23, 2026',
    timeFormatted: '12:15 AM',
    timeOfDay: 'late_night',
    title: 'Unsent iMessage to Mom: "Hey mom sorry I missed Sunday dinner"',
    subtitle: 'Status: Draft deleted without sending',
    details: 'Drafted: "Hey mom, sorry again. The sprint deadline pushed everything back. Eating cold takeaway noodles over the sink right now. I promise I will visit next weekend." — Cleared backspace.',
    mood: 'exhausted',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_005', 'rec_007'],
    connectionReason: 'Emotional fallout right after arriving home in the late-night Uber.',
    tags: ['family-guilt', 'unsent', 'isolation'],
    metadata: {
      recipientOrSender: 'Mom (Cell)',
      channel: 'iMessage',
      isUnsentDraft: true,
      isOutgoing: true
    }
  },
  {
    id: 'rec_007',
    category: 'entertainment',
    timestamp: '2026-01-23T01:10:00Z',
    dateFormatted: 'Jan 23, 2026',
    timeFormatted: '01:10 AM',
    timeOfDay: 'late_night',
    title: 'Netflix: Severance — Season 1, Episode 4',
    subtitle: 'Watched 28 min • Paused & closed tab',
    details: 'User paused during the lumon breakout scene. History shows user stared at pause screen for 12 minutes before shutting laptop.',
    mood: 'restless',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_004', 'rec_005', 'rec_006'],
    connectionReason: 'Metaphorical reflection of Alex\'s trapped feelings at work.',
    tags: ['binge-escapism', 'corporate-satire', 'dystopia'],
    metadata: {
      platform: 'Netflix',
      runtime: '54 min',
      rating: 4.8
    }
  },
  {
    id: 'rec_008',
    category: 'places',
    timestamp: '2026-01-29T08:14:00Z',
    dateFormatted: 'Jan 29, 2026',
    timeFormatted: '08:14 AM',
    timeOfDay: 'morning',
    title: 'Check-in: Blue Bottle Coffee — Financial District',
    subtitle: 'Dwell time: 4 mins • Mobile Order Pickup',
    details: 'Grab-and-go order for Quad-Shot Oat Milk Cortado. No seated pause.',
    mood: 'exhausted',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_002', 'rec_009'],
    connectionReason: 'Fueling the cycle of high caffeine despite late-night palpitations.',
    tags: ['caffeine-crutch', 'morning-rush', 'downtown'],
    metadata: {
      locationName: 'Blue Bottle Coffee',
      neighborhood: 'Downtown Financial Center',
      city: 'San Francisco, CA',
      durationStayed: '4 mins'
    }
  },
  {
    id: 'rec_009',
    category: 'photos',
    timestamp: '2026-02-05T19:30:20Z',
    dateFormatted: 'Feb 05, 2026',
    timeFormatted: '07:30 PM',
    timeOfDay: 'evening',
    title: 'iPhone Camera Roll: Blue Monitor Reflection in Dark Room',
    subtitle: 'IMG_4812.HEIC • Office Cubicle 8B',
    details: 'A photo taken accidentally or idly: dual monitors glaring against an empty darkened office floor after everyone else left.',
    mood: 'exhausted',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_004', 'rec_005'],
    connectionReason: 'Visual receipt capturing the physical isolation of the crunch period.',
    tags: ['empty-office', 'overtime', 'accidental-photo'],
    metadata: {
      cameraModel: 'iPhone 15 Pro',
      photoAspect: 'landscape',
      photoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      iso: 1250,
      shutterSpeed: '1/30s'
    }
  },
  {
    id: 'rec_010',
    category: 'events',
    timestamp: '2026-02-12T10:00:00Z',
    dateFormatted: 'Feb 12, 2026',
    timeFormatted: '10:00 AM',
    timeOfDay: 'morning',
    title: 'Google Calendar: "Q1 Final Release Alignment War Room"',
    subtitle: 'Recurring event • 6 attendees • 120 mins',
    details: 'Status: Accepted. Private note attached by user: "Survive this meeting without crying."',
    mood: 'exhausted',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_004', 'rec_011'],
    connectionReason: 'The boiling point corporate event that triggered the resignation thought process.',
    tags: ['work-meeting', 'calendar-dread', 'corporate'],
    metadata: {
      attendees: ['VP Product', 'Lead Architect', 'Alex Chen', 'PM Team'],
      status: 'confirmed'
    }
  },
  {
    id: 'rec_011',
    category: 'searches',
    timestamp: '2026-02-12T13:45:10Z',
    dateFormatted: 'Feb 12, 2026',
    timeFormatted: '01:45 PM',
    timeOfDay: 'afternoon',
    title: 'Google Search: "how to calculate 6 months emergency fund for resignation"',
    subtitle: 'Searched 15 mins after War Room Meeting ended',
    details: 'User calculated living expenses spreadsheet immediately after reading article on burn rates.',
    mood: 'seeking',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_010', 'rec_012'],
    connectionReason: 'Immediate reaction following the exhausting 2-hour war room meeting.',
    tags: ['escape-plan', 'financial-runway', 'career-crossroads'],
    metadata: {
      searchEngine: 'Google',
      subsequentSearches: [
        'COBRA health insurance cost freelance',
        'is taking a 3 month gap bad for tech resume'
      ]
    }
  },

  // ==========================================
  // CHAPTER 2: THE FRACTURE & THE LEAP (Late Feb - March)
  // ==========================================
  {
    id: 'rec_012',
    category: 'notes',
    timestamp: '2026-02-23T21:15:00Z',
    dateFormatted: 'Feb 23, 2026',
    timeFormatted: '09:15 PM',
    timeOfDay: 'evening',
    title: 'Document Draft: "Resignation & Gratitude Letter — Alex Chen"',
    subtitle: 'Word Count: 312 words • Saved locally',
    details: '"Dear Team, after four intense years, I have decided to step down to take a long-delayed creative sabbatical. I am proud of what we built..."',
    mood: 'reflective',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_011', 'rec_013', 'rec_014'],
    connectionReason: 'The turning point milestone: turning burnout panic into decisive action.',
    tags: ['resignation', 'turning-point', 'courage', 'new-leaf'],
    metadata: {
      wordCount: 312,
      sentimentScore: 0.45
    }
  },
  {
    id: 'rec_013',
    category: 'messages',
    timestamp: '2026-02-27T16:04:00Z',
    dateFormatted: 'Feb 27, 2026',
    timeFormatted: '04:04 PM',
    timeOfDay: 'afternoon',
    title: 'Signal to Sarah (Best Friend): "I sent it."',
    subtitle: 'Sent with heart reaction • 2 replies received',
    details: 'Sarah: "NO WAY. YOU ACTUALLY SENT IT?! Proud of you Alex. Drinks on me tonight. You are free."',
    mood: 'peaceful',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_012', 'rec_014'],
    connectionReason: 'Confirmation of the resignation email submission.',
    tags: ['relief', 'freedom', 'friendship'],
    metadata: {
      recipientOrSender: 'Sarah Lin',
      channel: 'Signal',
      isOutgoing: true
    }
  },
  {
    id: 'rec_014',
    category: 'music',
    timestamp: '2026-02-27T18:30:00Z',
    dateFormatted: 'Feb 27, 2026',
    timeFormatted: '06:30 PM',
    timeOfDay: 'evening',
    title: 'The Cinematic Orchestra — To Build A Home',
    subtitle: 'Streamed on Spotify on repeat walking down Market St',
    details: 'Volume 80%. Walk pace slowed from 4.2 mph to 2.6 mph according to Apple Health pedometer.',
    mood: 'reflective',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_013', 'rec_015'],
    connectionReason: 'Soundtrack to the first walk as an ex-corporate designer.',
    tags: ['catharsis', 'walking-music', 'slow-down'],
    metadata: {
      artist: 'The Cinematic Orchestra',
      album: 'Ma Fleur',
      bpm: 74,
      duration: '06:11',
      playCount: 9
    }
  },
  {
    id: 'rec_015',
    category: 'purchases',
    timestamp: '2026-03-02T14:22:15Z',
    dateFormatted: 'Mar 02, 2026',
    timeFormatted: '02:22 PM',
    timeOfDay: 'afternoon',
    title: 'Singapore Airlines Flight Booking: SFO → NRT (Tokyo Narita)',
    subtitle: 'Total: $894.20 • Departure: March 10',
    details: 'One-way ticket selected with 1 checked baggage and window seat 24A.',
    mood: 'seeking',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_012', 'rec_016', 'rec_017'],
    connectionReason: 'The ultimate physical manifestation of the leap: booking a one-way trip to Japan.',
    tags: ['flight-booking', 'japan', 'solo-travel', 'sabbatical'],
    metadata: {
      merchant: 'Singapore Airlines',
      amount: 894.20,
      items: [{ name: 'Nonstop Economy SFO to NRT Single Flight', price: 894.20 }],
      paymentMethod: 'Chase Sapphire Reserve'
    }
  },
  {
    id: 'rec_016',
    category: 'purchases',
    timestamp: '2026-03-04T11:05:00Z',
    dateFormatted: 'Mar 04, 2026',
    timeFormatted: '11:05 AM',
    timeOfDay: 'morning',
    title: 'eBay Purchase: Vintage Olympus OM-1 35mm Film Camera + 50mm f/1.8 Lens',
    subtitle: 'Total: $175.00 • Seller: Tokyo_Vintage_Cameras',
    details: 'Condition: Mint Japanese mechanical manual camera. Notes: "No digital screen. Need to force myself to wait to see pictures."',
    mood: 'creative',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_015', 'rec_018', 'rec_019'],
    connectionReason: 'Deliberate decision to abandon digital feeds in favor of analog friction.',
    tags: ['film-camera', 'analog', 'mindfulness', 'photography'],
    metadata: {
      merchant: 'eBay Japan Vintage',
      amount: 175.00,
      itemCount: 2,
      items: [
        { name: 'Olympus OM-1 Black Body', price: 135.00 },
        { name: 'Kodak Portra 400 35mm (3 Pack)', price: 40.00 }
      ],
      paymentMethod: 'PayPal'
    }
  },
  {
    id: 'rec_017',
    category: 'places',
    timestamp: '2026-03-12T07:15:00Z',
    dateFormatted: 'Mar 12, 2026',
    timeFormatted: '07:15 AM',
    timeOfDay: 'morning',
    title: 'Check-in: Yanaka Old Town & Nezu Shrine, Tokyo',
    subtitle: 'Distance Walked: 6.8 miles • Solitary Morning Walk',
    details: 'Visited wooden merchant houses, listened to morning temple gongs, stopped at a tiny wooden soba counter.',
    mood: 'peaceful',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_015', 'rec_018'],
    connectionReason: 'First serene morning without Slack alarms or quarterly reviews.',
    tags: ['tokyo', 'old-town', 'quiet-morning', 'japan-walk'],
    metadata: {
      locationName: 'Nezu Shrine Grotto',
      neighborhood: 'Yanaka / Bunkyo-ku',
      city: 'Tokyo, Japan',
      durationStayed: '3 hours'
    }
  },
  {
    id: 'rec_018',
    category: 'photos',
    timestamp: '2026-03-12T08:42:10Z',
    dateFormatted: 'Mar 12, 2026',
    timeFormatted: '08:42 AM',
    timeOfDay: 'morning',
    title: 'Photo: Raindrops on Cedar Temple Shingles in Yanaka',
    subtitle: 'Olympus OM-1 Scan (Kodak Portra 400)',
    details: 'Soft natural light reflecting off damp slate stones. Caption written in field notebook: "The silence here has texture."',
    mood: 'peaceful',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_016', 'rec_017', 'rec_020'],
    connectionReason: 'Captured using the newly purchased Olympus OM-1 film camera.',
    tags: ['temple-rain', 'film-photo', 'wabi-sabi', 'contemplation'],
    metadata: {
      cameraModel: 'Olympus OM-1 (Manual 35mm)',
      photoAspect: 'portrait',
      photoUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      iso: 400,
      shutterSpeed: '1/60s'
    }
  },
  {
    id: 'rec_019',
    category: 'searches',
    timestamp: '2026-03-16T22:18:00Z',
    dateFormatted: 'Mar 16, 2026',
    timeFormatted: '10:18 PM',
    timeOfDay: 'evening',
    title: 'Search: "concept of wabi sabi in daily craft and philosophy"',
    subtitle: 'Read 3 long essays on Japanese aesthetics',
    details: 'Searched after visiting a 400-year-old teahouse in Uji where the host served green tea in cracked kintsugi bowls.',
    mood: 'reflective',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_018', 'rec_021'],
    connectionReason: 'Spiritual seed that directly leads to Chapter 3\'s ceramics journey.',
    tags: ['philosophy', 'wabi-sabi', 'kintsugi', 'imperfection'],
    metadata: {
      searchEngine: 'DuckDuckGo',
      subsequentSearches: [
        'why western design over-indexes on symmetry',
        'history of Sen no Rikyu tea ceremony'
      ]
    }
  },
  {
    id: 'rec_020',
    category: 'notes',
    timestamp: '2026-03-20T23:55:00Z',
    dateFormatted: 'Mar 20, 2026',
    timeFormatted: '11:55 PM',
    timeOfDay: 'late_night',
    title: 'Field Journal: "Nobody is waiting for my reply"',
    subtitle: 'Location: Machiya Guesthouse, Kyoto',
    details: '"I haven\'t looked at my work email in 26 days. The phantom vibration in my right thigh has finally stopped. It turns out the world did not collapse without my Figma prototypes."',
    mood: 'peaceful',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_004', 'rec_012', 'rec_018'],
    connectionReason: 'Direct emotional antidote to the January 14 "Things that don\'t feel like real life" note.',
    tags: ['unplugged', 'healing', 'kyoto-reflections'],
    metadata: {
      wordCount: 142,
      sentimentScore: 0.88
    }
  },

  // ==========================================
  // CHAPTER 3: WABI-SABI & POTTERY WHEEL (April - May)
  // ==========================================
  {
    id: 'rec_021',
    category: 'searches',
    timestamp: '2026-04-03T15:30:00Z',
    dateFormatted: 'Apr 03, 2026',
    timeFormatted: '03:30 PM',
    timeOfDay: 'afternoon',
    title: 'Search: "pottery studios beginner wheel throwing hand building SF Mission"',
    subtitle: 'Looked at studio memberships and class schedules',
    details: 'User spent 40 minutes reviewing local artisan clay collectives upon returning home to San Francisco.',
    mood: 'creative',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_019', 'rec_022'],
    connectionReason: 'Direct translation of the Kyoto teahouse inspiration into hands-on practice.',
    tags: ['ceramics', 'wheel-throwing', 'tactile-hobby'],
    metadata: {
      searchEngine: 'Google Maps',
      subsequentSearches: [
        'clay and kiln studio membership pricing',
        'what clothes to wear to first ceramics pottery class'
      ]
    }
  },
  {
    id: 'rec_022',
    category: 'purchases',
    timestamp: '2026-04-05T10:14:00Z',
    dateFormatted: 'Apr 05, 2026',
    timeFormatted: '10:14 AM',
    timeOfDay: 'morning',
    title: 'Clay & Kiln Studio: 6-Week Beginner Ceramic Course + Studio Access',
    subtitle: 'Total: $380.00 • Receipt #CK-2026-891',
    details: 'Enrolled in Tuesday evening 6:30 PM wheel-throwing sessions with instructor Elena Vance.',
    mood: 'creative',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_021', 'rec_023', 'rec_024'],
    connectionReason: 'First major investment into analog craft instead of tech gadgets.',
    tags: ['course-enrollment', 'ceramics', 'investment-in-self'],
    metadata: {
      merchant: 'Clay & Kiln Studio SF',
      amount: 380.00,
      items: [{ name: '6-Week Intro Wheel & Glazing + Open Lab Pass', price: 380.00 }],
      paymentMethod: 'Debit Card'
    }
  },
  {
    id: 'rec_023',
    category: 'music',
    timestamp: '2026-04-07T19:00:00Z',
    dateFormatted: 'Apr 07, 2026',
    timeFormatted: '07:00 PM',
    timeOfDay: 'evening',
    title: 'Ryo Fukui — Early Summer (Scenery Album)',
    subtitle: 'Played via communal studio speaker during clay prep',
    details: 'Lively, warm Japanese jazz piano accompanying the rhythmic wedging of wet clay.',
    mood: 'creative',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_022', 'rec_024'],
    connectionReason: 'Soundtrack to the tactile ceramics studio sessions.',
    tags: ['japanese-jazz', 'piano', 'studio-vibes', 'flow-state'],
    metadata: {
      artist: 'Ryo Fukui',
      album: 'Scenery (1976)',
      bpm: 118,
      duration: '10:43',
      playCount: 18
    }
  },
  {
    id: 'rec_024',
    category: 'photos',
    timestamp: '2026-04-14T21:10:00Z',
    dateFormatted: 'Apr 14, 2026',
    timeFormatted: '09:10 PM',
    timeOfDay: 'evening',
    title: 'Photo: Clay-Splattered Canvas Apron & First Lopsided Bowl',
    subtitle: 'Studio Bench 4 • Natural lighting',
    details: 'A distinctly non-circular ceramic bowl sitting next to a sponge and wire cutting tool. Caption: "Wobbles with pride."',
    mood: 'creative',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_022', 'rec_025'],
    connectionReason: 'First physical product made with Alex\'s own two hands after years of pixels.',
    tags: ['clay-bowl', 'first-attempt', 'handmade', 'imperfection'],
    metadata: {
      cameraModel: 'iPhone 15 Pro',
      photoAspect: 'square',
      photoUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      iso: 640,
      shutterSpeed: '1/60s'
    }
  },
  {
    id: 'rec_025',
    category: 'messages',
    timestamp: '2026-04-14T21:40:00Z',
    dateFormatted: 'Apr 14, 2026',
    timeFormatted: '09:40 PM',
    timeOfDay: 'evening',
    title: 'Signal to Maya: "I made a bowl that refuses to be a circle"',
    subtitle: 'Attached photo of clay bowl • Sent with laugh sticker',
    details: 'Alex: "If you put soup in it, the soup leans left. I love it more than any UI design system I\'ve ever made." Maya: "Put cereal in it immediately."',
    mood: 'connected',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_024', 'rec_026'],
    connectionReason: 'Playful joy shared with friends contrasting the heavy isolation of Chapter 1.',
    tags: ['humor', 'friendship', 'craft', 'pride'],
    metadata: {
      recipientOrSender: 'Maya Tanaka',
      channel: 'Signal',
      isOutgoing: true
    }
  },
  {
    id: 'rec_026',
    category: 'notes',
    timestamp: '2026-04-22T22:00:00Z',
    dateFormatted: 'Apr 22, 2026',
    timeFormatted: '10:00 PM',
    timeOfDay: 'evening',
    title: 'Notes: "Things clay taught me that screens never could"',
    subtitle: 'Written with clay residue still under fingernails',
    details: '"1. If you rush the wheel, the clay collapses. You cannot 2x speed drying. 2. Centering requires leaning your whole skeleton in, not just fingertips. 3. Mistakes can\'t be Cmd+Z\'d, but they can be reclaimed in the slop bucket."',
    mood: 'peaceful',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_024', 'rec_027'],
    connectionReason: 'Philosophical distillation of hands-on physical engagement.',
    tags: ['mindfulness', 'clay-lessons', 'patience'],
    metadata: {
      wordCount: 168,
      sentimentScore: 0.92
    }
  },
  {
    id: 'rec_027',
    category: 'purchases',
    timestamp: '2026-04-28T14:15:00Z',
    dateFormatted: 'Apr 28, 2026',
    timeFormatted: '02:15 PM',
    timeOfDay: 'afternoon',
    title: 'Arch Pottery Supply: 25kg Laguna B-Mix Stoneware Clay & Kemper Tool Set',
    subtitle: 'Total: $74.50 • In-store pickup',
    details: 'Heavy 55-lb block of high-fire clay loaded into bicycle pannier basket.',
    mood: 'energetic',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_022', 'rec_028'],
    connectionReason: 'Deepening commitment to the pottery practice.',
    tags: ['raw-materials', 'pottery-tools', 'local-craft'],
    metadata: {
      merchant: 'Arch Art Supplies',
      amount: 74.50,
      items: [
        { name: 'Laguna B-Mix Clay 50lb Box', price: 38.00 },
        { name: 'Kemper Complete Ceramic Tool Set', price: 29.50 },
        { name: 'Natural Sea Silk Sponge', price: 7.00 }
      ],
      paymentMethod: 'Apple Pay'
    }
  },
  {
    id: 'rec_028',
    category: 'entertainment',
    timestamp: '2026-05-06T20:30:00Z',
    dateFormatted: 'May 06, 2026',
    timeFormatted: '08:30 PM',
    timeOfDay: 'evening',
    title: 'YouTube: "Restoring an 80-year-old Japanese Woodworker\'s Chisel"',
    subtitle: 'Watched full 42 min video without skipping',
    details: 'No fast-forwarding. Ambient natural audio of water stones sharpening steel.',
    mood: 'peaceful',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_023', 'rec_026'],
    connectionReason: 'Media consumption transformed from anxious scrolling to deliberate slow craft admiration.',
    tags: ['slow-media', 'craftsmanship', 'focus'],
    metadata: {
      platform: 'YouTube',
      runtime: '42 min',
      rating: 5.0
    }
  },

  // ==========================================
  // CHAPTER 4: THE 6:00 AM METAMORPHOSIS (June - July)
  // ==========================================
  {
    id: 'rec_029',
    category: 'searches',
    timestamp: '2026-06-02T09:12:00Z',
    dateFormatted: 'Jun 02, 2026',
    timeFormatted: '09:12 AM',
    timeOfDay: 'morning',
    title: 'Search: "beginner couch to 10k running cadence shoes for wide feet"',
    subtitle: 'Shift in search queries from insomnia to physical conditioning',
    details: 'User researched gait analysis, tempo running, and morning hydration habits.',
    mood: 'seeking',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_030', 'rec_031'],
    connectionReason: 'The start of Alex\'s physical transformation.',
    tags: ['running', 'fitness', 'morning-routine', 'new-challenge'],
    metadata: {
      searchEngine: 'Google',
      subsequentSearches: [
        'Asics Novablast 4 vs Saucony Endorphin Speed',
        'how to avoid shin splints beginner runner'
      ]
    }
  },
  {
    id: 'rec_030',
    category: 'purchases',
    timestamp: '2026-06-03T16:45:00Z',
    dateFormatted: 'Jun 03, 2026',
    timeFormatted: '04:45 PM',
    timeOfDay: 'afternoon',
    title: 'Fleet Feet Sports: Asics Novablast 4 Running Shoes + Balega Socks',
    subtitle: 'Total: $178.25 • Gait analysis completed in store',
    details: 'Sales associate noted: "Neutral pronation, good midfoot strike, enthusiastic beginner."',
    mood: 'energetic',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_029', 'rec_032'],
    connectionReason: 'Tangible commitment to morning running.',
    tags: ['running-gear', 'shoes', 'health-investment'],
    metadata: {
      merchant: 'Fleet Feet Sports SF',
      amount: 178.25,
      items: [
        { name: 'Asics Novablast 4 (Color: Mineral Teal)', price: 145.00 },
        { name: 'Balega Hidden Comfort Running Socks (2 pk)', price: 28.00 },
        { name: 'Local Sales Tax', price: 5.25 }
      ],
      paymentMethod: 'Apple Pay'
    }
  },
  {
    id: 'rec_031',
    category: 'events',
    timestamp: '2026-06-06T05:45:00Z',
    dateFormatted: 'Jun 06, 2026',
    timeFormatted: '05:45 AM',
    timeOfDay: 'morning',
    title: 'Phone Alarm: "Dawn Run — Golden Gate Park to Ocean Beach"',
    subtitle: 'Alarm labeled "Look at the sunrise, not your notifications"',
    details: 'First time Alex woke up before 6:00 AM willingly in 3 years.',
    mood: 'energetic',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_001', 'rec_032', 'rec_033'],
    connectionReason: 'Poignant mirror to Chapter 1\'s 2:41 AM awake times: now awake at 5:45 AM for life.',
    tags: ['sunrise', 'alarm', 'circadian-shift', 'breakthrough'],
    metadata: {
      status: 'confirmed'
    }
  },
  {
    id: 'rec_032',
    category: 'music',
    timestamp: '2026-06-06T06:10:00Z',
    dateFormatted: 'Jun 06, 2026',
    timeFormatted: '06:10 AM',
    timeOfDay: 'morning',
    title: 'Tycho — Awake (Full LP)',
    subtitle: 'Streamed on Apple Music • Cadence locked at 172 steps/min',
    details: 'Bright, rhythmic ambient synthesizer echoing the morning ocean breeze.',
    mood: 'energetic',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_030', 'rec_031', 'rec_033'],
    connectionReason: 'Soundtrack to the sunrise run transformation.',
    tags: ['running-music', 'tycho', 'high-tempo', 'sunrise-stride'],
    metadata: {
      artist: 'Tycho',
      album: 'Awake',
      bpm: 172,
      duration: '42:18',
      playCount: 22
    }
  },
  {
    id: 'rec_033',
    category: 'places',
    timestamp: '2026-06-06T07:15:00Z',
    dateFormatted: 'Jun 06, 2026',
    timeFormatted: '07:15 AM',
    timeOfDay: 'morning',
    title: 'Check-in: Ocean Beach & Great Highway Promenade',
    subtitle: 'Distance: 4.2 miles run • Elevation: 140 ft',
    details: 'Heart rate steady at 148 bpm. User touched the cold Pacific surf before cooling down.',
    mood: 'peaceful',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_031', 'rec_032', 'rec_034'],
    connectionReason: 'Physical destination of the breakthrough morning run.',
    tags: ['ocean-beach', 'pacific', 'run-destination', 'vitality'],
    metadata: {
      locationName: 'Ocean Beach Waves',
      neighborhood: 'Sunset District',
      city: 'San Francisco, CA',
      durationStayed: '45 mins'
    }
  },
  {
    id: 'rec_034',
    category: 'photos',
    timestamp: '2026-06-06T07:22:00Z',
    dateFormatted: 'Jun 06, 2026',
    timeFormatted: '07:22 AM',
    timeOfDay: 'morning',
    title: 'Photo: Long Shadows on Fog-Kissed Sand Dunes at Sunrise',
    subtitle: 'iPhone 15 Pro • Running sweat visible on lens corner',
    details: 'Golden light cutting horizontally across Pacific waves. One runner silhouetted in the distance.',
    mood: 'peaceful',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_009', 'rec_033'],
    connectionReason: 'Visual contrast to Chapter 1\'s blue monitor in the dark office.',
    tags: ['sunrise-photo', 'golden-hour', 'ocean-dunes', 'vitality'],
    metadata: {
      cameraModel: 'iPhone 15 Pro',
      photoAspect: 'landscape',
      photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      iso: 50,
      shutterSpeed: '1/2000s'
    }
  },
  {
    id: 'rec_035',
    category: 'messages',
    timestamp: '2026-06-20T11:15:00Z',
    dateFormatted: 'Jun 20, 2026',
    timeFormatted: '11:15 AM',
    timeOfDay: 'morning',
    title: 'iMessage to Sister: "Guess who just ran 8 miles without dying"',
    subtitle: 'Shared Nike Run Club map screenshot',
    details: 'Sister: "Who is this and what did you do to my brother who complained about walking two blocks to Trader Joe\'s?" Alex: "He retired."',
    mood: 'connected',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_033', 'rec_036'],
    connectionReason: 'Humorous acknowledgment of identity shift from couch potato to runner.',
    tags: ['sibling-banter', 'running-milestone', 'proud'],
    metadata: {
      recipientOrSender: 'Sister (Chloe)',
      channel: 'iMessage',
      isOutgoing: true
    }
  },
  {
    id: 'rec_036',
    category: 'events',
    timestamp: '2026-07-04T07:00:00Z',
    dateFormatted: 'Jul 04, 2026',
    timeFormatted: '07:00 AM',
    timeOfDay: 'morning',
    title: 'Event: Bridge to Bridge 10K Fun Run — Official Finisher',
    subtitle: 'Bib #4192 • Time: 52:14 • Position: Top 25%',
    details: 'Crossed the finish line in front of the Ferry Building. Drank chocolate milk on the pier with fellow runners.',
    mood: 'energetic',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_030', 'rec_035', 'rec_037'],
    connectionReason: 'Culmination of the 6 AM Metamorphosis chapter.',
    tags: ['race-day', '10k', 'medal', 'achievement'],
    metadata: {
      attendees: ['Alex Chen', '1,200 participants'],
      status: 'confirmed'
    }
  },
  {
    id: 'rec_037',
    category: 'notes',
    timestamp: '2026-07-04T13:30:00Z',
    dateFormatted: 'Jul 04, 2026',
    timeFormatted: '01:30 PM',
    timeOfDay: 'afternoon',
    title: 'Notes: "The geography of my own stamina"',
    subtitle: 'Written while soaking legs in Epsom salt bath',
    details: '"Six months ago, a slack message gave me chest palpitations. Today I ran 10 kilometers uphill against ocean headwind and my heart felt like a calm, steady metronome. My body was never broken. It was just trapped indoors."',
    mood: 'peaceful',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_002', 'rec_004', 'rec_036'],
    connectionReason: 'Direct emotional reconciliation with the January health anxiety searches.',
    tags: ['epiphany', 'body-wisdom', 'reclamation'],
    metadata: {
      wordCount: 154,
      sentimentScore: 0.95
    }
  },

  // ==========================================
  // CHAPTER 5: THE ANALOG RENAISSANCE & SHARED TABLE (Aug - Sept)
  // ==========================================
  {
    id: 'rec_038',
    category: 'searches',
    timestamp: '2026-08-08T11:20:00Z',
    dateFormatted: 'Aug 08, 2026',
    timeFormatted: '11:20 AM',
    timeOfDay: 'morning',
    title: 'Search: "handmade pasta dough hydration semolina ratio Marcella Hazan"',
    subtitle: 'Bookmarked Italian culinary heritage forum',
    details: 'User spent 30 minutes learning about egg yolk to flour ratios for handmade tagliatelle.',
    mood: 'creative',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_039', 'rec_040'],
    connectionReason: 'New exploration into communal cooking and table hosting.',
    tags: ['cooking', 'pasta', 'culinary-craft', 'gathering'],
    metadata: {
      searchEngine: 'Google',
      subsequentSearches: [
        'wooden chitarra pasta cutter buy San Francisco',
        'how to store heirloom tomatoes without losing sweetness'
      ]
    }
  },
  {
    id: 'rec_039',
    category: 'purchases',
    timestamp: '2026-08-15T09:45:00Z',
    dateFormatted: 'Aug 15, 2026',
    timeFormatted: '09:45 AM',
    timeOfDay: 'morning',
    title: 'Ferry Plaza Farmers Market: Organic Provisions for Saturday Dinner',
    subtitle: 'Total: $86.50 • 6 Local Farm Vendors',
    details: 'Purchased 4 lbs Early Girl dry-farmed tomatoes, Genovese sweet basil, Meyer lemons, crusty sourdough boules, and aged goat cheese.',
    mood: 'peaceful',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_038', 'rec_040', 'rec_041'],
    connectionReason: 'Shopping at physical markets with real farmers instead of late-night Amazon kits.',
    tags: ['farmers-market', 'fresh-produce', 'organic', 'slow-food'],
    metadata: {
      merchant: 'Ferry Plaza Farmers Market',
      amount: 86.50,
      itemCount: 5,
      items: [
        { name: 'Dirty Girl Produce Dry-Farmed Early Girls', price: 24.00 },
        { name: 'Tartine Sourdough Country Loaf', price: 14.50 },
        { name: 'Point Reyes Farmstead Toma Cheese', price: 18.00 },
        { name: 'Fresh Sweet Basil & Chives Bundles', price: 8.00 },
        { name: 'Frog Hollow Farm Peaches', price: 22.00 }
      ],
      paymentMethod: 'Cash'
    }
  },
  {
    id: 'rec_040',
    category: 'events',
    timestamp: '2026-08-15T18:00:00Z',
    dateFormatted: 'Aug 15, 2026',
    timeFormatted: '06:00 PM',
    timeOfDay: 'evening',
    title: 'Event: "The First Sunday Supper Club" — Apartment 4G',
    subtitle: 'Hosted by Alex • 6 guests in attendance',
    details: 'All food served in the handmade ceramic bowls crafted during April/May. Phones placed in a wooden box at the entrance.',
    mood: 'connected',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_024', 'rec_039', 'rec_041', 'rec_042'],
    connectionReason: 'The apex synthesis where ceramics, food, and rekindled relationships converge.',
    tags: ['supper-club', 'hosting', 'dinner-party', 'unplugged'],
    metadata: {
      attendees: ['Alex Chen', 'Sarah Lin', 'Maya Tanaka', 'David Wu', 'Elena Vance', 'Chloe (Sister)'],
      status: 'confirmed'
    }
  },
  {
    id: 'rec_041',
    category: 'music',
    timestamp: '2026-08-15T18:30:00Z',
    dateFormatted: 'Aug 15, 2026',
    timeFormatted: '06:30 PM',
    timeOfDay: 'evening',
    title: 'Stan Getz & João Gilberto — The Girl from Ipanema / Corcovado',
    subtitle: 'Vinyl record playing on vintage Technics turntable',
    details: 'Warm vinyl crackle blending with laughter, clinking wine glasses, and simmering tomato garlic sauce.',
    mood: 'connected',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_040', 'rec_042'],
    connectionReason: 'Soundtrack to the communal supper club.',
    tags: ['bossa-nova', 'vinyl', 'dinner-music', 'warmth'],
    metadata: {
      artist: 'Stan Getz & João Gilberto',
      album: 'Getz/Gilberto',
      bpm: 96,
      duration: '33:45',
      playCount: 12
    }
  },
  {
    id: 'rec_042',
    category: 'photos',
    timestamp: '2026-08-15T21:45:00Z',
    dateFormatted: 'Aug 15, 2026',
    timeFormatted: '09:45 PM',
    timeOfDay: 'evening',
    title: 'Photo: Candlelit Dinner Table with Empty Ceramic Bowls & Shared Smiles',
    subtitle: 'Olympus OM-1 Film Camera • Natural candlelight',
    details: 'Six friends lingering over espresso cups and olive oil cake. Crumbs scattered across linen tablecloth. Laughter caught mid-sentence.',
    mood: 'connected',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_009', 'rec_016', 'rec_024', 'rec_040'],
    connectionReason: 'The visual masterpiece: the camera bought in Tokyo capturing friends eating from bowls made in April.',
    tags: ['candlelight', 'friendship', 'supper-table', 'analog-life'],
    metadata: {
      cameraModel: 'Olympus OM-1 (Kodak Portra 800)',
      photoAspect: 'landscape',
      photoUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
      iso: 800,
      shutterSpeed: '1/30s'
    }
  },
  {
    id: 'rec_043',
    category: 'messages',
    timestamp: '2026-08-16T10:30:00Z',
    dateFormatted: 'Aug 16, 2026',
    timeFormatted: '10:30 AM',
    timeOfDay: 'morning',
    title: 'Group Chat (The Supper Club): "Best Saturday of the entire year"',
    subtitle: '5 new photos dropped into the shared album',
    details: 'Sarah: "Still dreaming about that pasta sauce Alex. When is the next edition?" David: "Also the ceramic mugs felt so grounding to hold. Can I buy one?"',
    mood: 'connected',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_040', 'rec_042'],
    connectionReason: 'Warm community afterglow following the supper club.',
    tags: ['group-chat', 'gratitude', 'friendship', 'belonging'],
    metadata: {
      recipientOrSender: 'Supper Club Crew',
      channel: 'Signal',
      isOutgoing: false
    }
  },
  {
    id: 'rec_044',
    category: 'notes',
    timestamp: '2026-09-01T21:00:00Z',
    dateFormatted: 'Sep 01, 2026',
    timeFormatted: '09:00 PM',
    timeOfDay: 'evening',
    title: 'Personal Journal: "The Total Cost of Coming Back to Life"',
    subtitle: 'End of 9-Month Sabbatical Synthesis',
    details: '"I used to think life was what you purchased or optimized between sprints. Now I know life is the friction you choose to embrace: the clay that collapses, the legs that ache at mile 5, the sauce that takes 4 hours to simmer, and the friends who stay until midnight because nobody is checking their watches."',
    mood: 'peaceful',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_004', 'rec_020', 'rec_026', 'rec_037'],
    connectionReason: 'Final philosophical resolution completing the entire narrative arc.',
    tags: ['sabbatical-reflection', 'wisdom', 'transformation', 'life-ledger'],
    metadata: {
      wordCount: 245,
      sentimentScore: 0.98
    }
  },

  // Additional Supporting Evidence Receipts to ensure high data density (~55+ receipts total)
  {
    id: 'rec_045',
    category: 'purchases',
    timestamp: '2026-01-18T13:20:00Z',
    dateFormatted: 'Jan 18, 2026',
    timeFormatted: '01:20 PM',
    timeOfDay: 'afternoon',
    title: 'DoorDash: Sweetgreen Guacamole Greens Bowl + Kombucha',
    subtitle: 'Total: $29.40 • Desk delivery',
    details: 'Eaten in 7 minutes while debugging product telemetry metrics.',
    mood: 'exhausted',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_005', 'rec_008'],
    connectionReason: 'Automated corporate meal consumption at workstation.',
    tags: ['desk-lunch', 'doordash', 'work-tunnel'],
    metadata: {
      merchant: 'DoorDash (Sweetgreen)',
      amount: 29.40,
      paymentMethod: 'Corporate Card'
    }
  },
  {
    id: 'rec_046',
    category: 'searches',
    timestamp: '2026-01-20T03:15:00Z',
    dateFormatted: 'Jan 20, 2026',
    timeFormatted: '03:15 AM',
    timeOfDay: 'late_night',
    title: 'Search: "how many hours of deep sleep required to prevent memory loss"',
    subtitle: 'Insomnia health rabbit hole',
    details: 'Browsed sleep science research papers until 3:55 AM.',
    mood: 'restless',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_001', 'rec_002'],
    connectionReason: 'Ongoing sleep anxiety loop during January crunch.',
    tags: ['sleep-anxiety', 'insomnia', 'night-research'],
    metadata: {
      searchEngine: 'Google'
    }
  },
  {
    id: 'rec_047',
    category: 'entertainment',
    timestamp: '2026-02-01T22:40:00Z',
    dateFormatted: 'Feb 01, 2026',
    timeFormatted: '10:40 PM',
    timeOfDay: 'evening',
    title: 'Audible: Four Thousand Weeks — Time Management for Mortals',
    subtitle: 'Listened to Chapter 2: The Efficiency Trap',
    details: '"The problem with trying to make time for everything that matters isn\'t that you might fail... it\'s that you\'re trying to control the uncontrollable."',
    mood: 'reflective',
    chapterId: 'ch_1',
    connectedReceiptIds: ['rec_004', 'rec_011'],
    connectionReason: 'Intellectual catalyst planting the seed to stop optimizing every minute.',
    tags: ['audiobook', 'philosophy', 'oliver-burkeman', 'time'],
    metadata: {
      platform: 'Audible',
      runtime: '32 min',
      rating: 5.0
    }
  },
  {
    id: 'rec_048',
    category: 'places',
    timestamp: '2026-03-14T15:00:00Z',
    dateFormatted: 'Mar 14, 2026',
    timeFormatted: '03:00 PM',
    timeOfDay: 'afternoon',
    title: 'Check-in: Daikanyama T-Site Tsutaya Books, Tokyo',
    subtitle: 'Duration: 4.5 hours • Reading architecture and craft periodicals',
    details: 'Sat in the lounge surrounded by Japanese print publications and black coffee.',
    mood: 'reflective',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_017', 'rec_018'],
    connectionReason: 'Immersive afternoon discovering Japanese print crafts and typography.',
    tags: ['bookstore', 'tokyo-architecture', 'inspiration'],
    metadata: {
      locationName: 'Daikanyama T-Site',
      city: 'Tokyo, Japan',
      durationStayed: '4.5 hours'
    }
  },
  {
    id: 'rec_049',
    category: 'purchases',
    timestamp: '2026-03-18T14:30:00Z',
    dateFormatted: 'Mar 18, 2026',
    timeFormatted: '02:30 PM',
    timeOfDay: 'afternoon',
    title: 'Ippodo Tea Kyoto Main Store: Ceremonial Matcha Sayaka-no-Mukashi',
    subtitle: 'Total: ¥4,200 ($28.50) • Hand-whisked demonstration included',
    details: 'Purchased traditional bamboo chasen whisk and tin of stone-ground Uji green tea.',
    mood: 'peaceful',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_019', 'rec_020'],
    connectionReason: 'First ritual object brought back from Japan to anchor morning calm.',
    tags: ['matcha', 'kyoto', 'tea-ceremony', 'ritual'],
    metadata: {
      merchant: 'Ippodo Tea Kyoto',
      amount: 28.50,
      paymentMethod: 'Credit Card'
    }
  },
  {
    id: 'rec_050',
    category: 'photos',
    timestamp: '2026-03-22T06:40:00Z',
    dateFormatted: 'Mar 22, 2026',
    timeFormatted: '06:40 AM',
    timeOfDay: 'morning',
    title: 'Photo: Bamboo Grove at Dawn Before Tourists Arrive, Arashiyama',
    subtitle: 'Olympus OM-1 • Long exposure on bridge railing',
    details: 'Towering stalks swaying in morning breeze with gentle creaking sound recorded in memory.',
    mood: 'peaceful',
    chapterId: 'ch_2',
    connectedReceiptIds: ['rec_018', 'rec_020'],
    connectionReason: 'Iconic visual testament to waking early for tranquility rather than panic.',
    tags: ['bamboo-grove', 'kyoto', 'dawn', 'film-scans'],
    metadata: {
      cameraModel: 'Olympus OM-1',
      photoAspect: 'portrait',
      photoUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      iso: 200,
      shutterSpeed: '1/15s'
    }
  },
  {
    id: 'rec_051',
    category: 'places',
    timestamp: '2026-04-18T14:00:00Z',
    dateFormatted: 'Apr 18, 2026',
    timeFormatted: '02:00 PM',
    timeOfDay: 'afternoon',
    title: 'Check-in: Heath Ceramics Factory Showroom, Mission District',
    subtitle: 'Studied glaze formulations and matte ceramic tiles',
    details: 'Spent 2 hours inspecting high-fire stoneware tableware and chatting with the kiln master.',
    mood: 'creative',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_021', 'rec_024'],
    connectionReason: 'Appreciation of historic California pottery tradition.',
    tags: ['heath-ceramics', 'mission-sf', 'craft-heritage'],
    metadata: {
      locationName: 'Heath Ceramics Showroom',
      neighborhood: 'Mission District',
      city: 'San Francisco, CA',
      durationStayed: '2 hours'
    }
  },
  {
    id: 'rec_052',
    category: 'purchases',
    timestamp: '2026-05-12T16:20:00Z',
    dateFormatted: 'May 12, 2026',
    timeFormatted: '04:20 PM',
    timeOfDay: 'afternoon',
    title: 'Local Hardware Store: Heavy Duty Work Apron & Canvas Tool Roll',
    subtitle: 'Total: $42.00 • American made raw duck canvas',
    details: 'Purchased for ceramic workshop trimming and pottery wheel throwing.',
    mood: 'creative',
    chapterId: 'ch_3',
    connectedReceiptIds: ['rec_024', 'rec_027'],
    connectionReason: 'Everyday uniform of Alex\'s pottery creative phase.',
    tags: ['workwear', 'apron', 'craftsman'],
    metadata: {
      merchant: 'Center Hardware SF',
      amount: 42.00,
      paymentMethod: 'Apple Pay'
    }
  },
  {
    id: 'rec_053',
    category: 'music',
    timestamp: '2026-06-18T06:05:00Z',
    dateFormatted: 'Jun 18, 2026',
    timeFormatted: '06:05 AM',
    timeOfDay: 'morning',
    title: 'Khruangbin — Texas Sun / Time (You and I)',
    subtitle: 'Tempo playlist for tempo running on Crissy Field',
    details: 'Bass-heavy groove driving 6:00 AM tempo strides along the Golden Gate bay view.',
    mood: 'energetic',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_032', 'rec_033'],
    connectionReason: 'Energetic running soundtrack during peak fitness conditioning.',
    tags: ['khruangbin', 'running-groove', 'morning-run'],
    metadata: {
      artist: 'Khruangbin',
      album: 'Mordechai',
      bpm: 110,
      duration: '05:42',
      playCount: 16
    }
  },
  {
    id: 'rec_054',
    category: 'purchases',
    timestamp: '2026-06-25T17:30:00Z',
    dateFormatted: 'Jun 25, 2026',
    timeFormatted: '05:30 PM',
    timeOfDay: 'afternoon',
    title: 'Sports Basement: LMNT Electrolytes & Nathan Handheld Hydration Flask',
    subtitle: 'Total: $54.00 • Preparation for 10-mile training distance',
    details: 'Citrus salt electrolyte packets and soft-flask running water bottle.',
    mood: 'energetic',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_030', 'rec_036'],
    connectionReason: 'Supporting the runner endurance phase.',
    tags: ['hydration', 'electrolytes', 'running-nutrition'],
    metadata: {
      merchant: 'Sports Basement Presidio',
      amount: 54.00,
      paymentMethod: 'Apple Pay'
    }
  },
  {
    id: 'rec_055',
    category: 'photos',
    timestamp: '2026-07-20T06:15:00Z',
    dateFormatted: 'Jul 20, 2026',
    timeFormatted: '06:15 AM',
    timeOfDay: 'morning',
    title: 'Photo: Golden Gate Bridge Emerging Through Dawn Fog',
    subtitle: 'Shot from Marshall\'s Beach trail during morning 7-miler',
    details: 'Rust-red towers cutting through pink-hued marine fog layer. Crisp 52°F air.',
    mood: 'peaceful',
    chapterId: 'ch_4',
    connectedReceiptIds: ['rec_034', 'rec_036'],
    connectionReason: 'Showcasing the runner\'s city landscape from the trail.',
    tags: ['golden-gate', 'marine-fog', 'morning-trail', 'san-francisco'],
    metadata: {
      cameraModel: 'iPhone 15 Pro',
      photoAspect: 'landscape',
      photoUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
      iso: 64,
      shutterSpeed: '1/1200s'
    }
  },
  {
    id: 'rec_056',
    category: 'purchases',
    timestamp: '2026-08-10T15:10:00Z',
    dateFormatted: 'Aug 10, 2026',
    timeFormatted: '03:10 PM',
    timeOfDay: 'afternoon',
    title: 'Cookin\' Vintage Cookware: Italian Marcella Hazan Pasta Roller',
    subtitle: 'Total: $65.00 • Heavy vintage chrome hand-crank machine',
    details: 'Restored 1970s Imperia manual pasta maker found in Haight Ashbury kitchen antique shop.',
    mood: 'creative',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_038', 'rec_040'],
    connectionReason: 'Analog kitchen tool to prepare the handmade dinner party.',
    tags: ['vintage-kitchen', 'pasta-maker', 'analog-tools'],
    metadata: {
      merchant: 'Cookin\' Recycled Gourmet Tools',
      amount: 65.00,
      paymentMethod: 'Cash'
    }
  },
  {
    id: 'rec_057',
    category: 'messages',
    timestamp: '2026-09-15T19:20:00Z',
    dateFormatted: 'Sep 15, 2026',
    timeFormatted: '07:20 PM',
    timeOfDay: 'evening',
    title: 'Signal to Sarah: "I got a freelance studio offer. Only 20 hours a week."',
    subtitle: 'Alex deciding their next life chapter terms',
    details: 'Alex: "They offered full-time with stock, but I asked for 20 hours capped. That leaves 3 days for clay, running, and cooking. I\'m never giving up my mornings again."',
    mood: 'peaceful',
    chapterId: 'ch_5',
    connectedReceiptIds: ['rec_012', 'rec_044'],
    connectionReason: 'Proof of permanent transformation: choosing balance and autonomy over corporate sprint culture.',
    tags: ['boundaries', 'new-work-life', 'autonomy', 'growth'],
    metadata: {
      recipientOrSender: 'Sarah Lin',
      channel: 'Signal',
      isOutgoing: true
    }
  }
];
