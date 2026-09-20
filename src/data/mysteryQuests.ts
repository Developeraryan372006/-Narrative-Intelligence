import { MysteryQuest } from '../types';

export const MYSTERY_QUESTS: MysteryQuest[] = [
  {
    id: 'quest_1',
    title: 'The 2:40 AM Phantom Alarm',
    prompt: 'Alex was experiencing intense heart palpitations and insomnia in mid-January. Find the ambient music track, the midnight panic search, and the impulse purchase that formed this 20-minute spiral.',
    difficulty: 'Easy',
    clueCategory: ['music', 'searches', 'purchases'],
    targetReceiptIds: ['rec_001', 'rec_002', 'rec_003'],
    solvedExplanation: 'Between 02:41 AM and 03:02 AM on Jan 14, Alex looped Brian Eno\'s "Music for Airports", searched for resting heart rates from caffeine/stress, and impulse-bought L-Theanine and chamomile tea from Amazon. This revealed the psychosomatic spiral of corporate burnout.',
    rewardInsight: 'Burnout rarely announces itself loudly; it manifests as late-night micro-purchases attempting to medicate exhaustion while continuing the grind.'
  },
  {
    id: 'quest_2',
    title: 'The Turning Point Spark',
    prompt: 'Identify the grueling corporate calendar invite that pushed Alex over the edge, followed by the financial calculation search that paved the way for resignation.',
    difficulty: 'Medium',
    clueCategory: ['events', 'searches', 'notes'],
    targetReceiptIds: ['rec_010', 'rec_011', 'rec_012'],
    solvedExplanation: 'On Feb 12 at 10:00 AM, Alex attended the "Q1 Final Release Alignment War Room" with VP Product. At 1:45 PM that same afternoon, they searched "how to calculate 6 months emergency fund for resignation". Eleven days later, the resignation letter was drafted.',
    rewardInsight: 'Decisions to change one\'s life are almost always preceded by a concrete catalyst followed by financial sanity-checking.'
  },
  {
    id: 'quest_3',
    title: 'The Analog Antidote: Tokyo to Haight St',
    prompt: 'Trace how a film camera purchased from a Tokyo seller on eBay in March ended up capturing a candlelit dinner in San Francisco 5 months later.',
    difficulty: 'Detective',
    clueCategory: ['purchases', 'places', 'photos'],
    targetReceiptIds: ['rec_016', 'rec_018', 'rec_042'],
    solvedExplanation: 'Alex bought a vintage Olympus OM-1 manual 35mm film camera on March 4 to force themselves to slow down. After capturing raindrops on Kyoto temple tiles, that exact camera was used on August 15 to photograph the first Sunday Supper Club with lifelong friends.',
    rewardInsight: 'Tools are not just objects; when chosen with intention, they become the lens through which our new life is permanently documented.'
  },
  {
    id: 'quest_4',
    title: 'The Tale of the Lopsided Bowl',
    prompt: 'Uncover the sequence: from searching for beginner wheel pottery in the Mission, to the proud photo of the first wonky bowl, to serving homemade dinner in it to friends.',
    difficulty: 'Medium',
    clueCategory: ['searches', 'purchases', 'photos', 'events'],
    targetReceiptIds: ['rec_021', 'rec_022', 'rec_024', 'rec_040'],
    solvedExplanation: 'On April 3, Alex searched for beginner wheel classes in SF. On April 5, they enrolled at Clay & Kiln Studio. On April 14, they photographed their first lopsided bowl ("wobbles with pride"). On August 15, that very bowl held handmade pasta at the Sunday Supper Club.',
    rewardInsight: 'The transition from passive consumer of digital content to active creator of physical objects is one of the deepest healing acts available to modern humans.'
  },
  {
    id: 'quest_5',
    title: 'The Circadian Miracle',
    prompt: 'Find the two receipts separated by 5 months that show Alex awake at almost the same minute of the day—one in terror, one in pure vitality.',
    difficulty: 'Detective',
    clueCategory: ['music', 'events'],
    targetReceiptIds: ['rec_001', 'rec_031'],
    solvedExplanation: 'On Jan 14 at 02:41 AM, Alex was awake listening to Brian Eno in a dark room battling insomnia. On June 6 at 05:45 AM, Alex set a phone alarm labeled "Look at the sunrise, not your notifications" and went for a 4.2-mile sunrise ocean run to Tycho.',
    rewardInsight: 'Your relationship with time changes when your life is no longer something you are trying to distract yourself from.'
  }
];
