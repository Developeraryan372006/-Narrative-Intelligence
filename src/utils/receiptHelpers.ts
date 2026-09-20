import { ReceiptCategory, MoodType, LifeReceipt } from '../types';

export const CATEGORY_CONFIG: Record<
  ReceiptCategory,
  {
    label: string;
    iconName: string;
    color: string;
    bg: string;
    border: string;
    description: string;
  }
> = {
  music: {
    label: 'Music',
    iconName: 'Music',
    color: 'text-violet-400',
    bg: 'bg-violet-950/40',
    border: 'border-violet-800/40',
    description: 'Tracks played, repeat loops, bpm tempos, and emotional acoustics'
  },
  entertainment: {
    label: 'Movies & Media',
    iconName: 'Film',
    color: 'text-rose-400',
    bg: 'bg-rose-950/40',
    border: 'border-rose-800/40',
    description: 'Films, episodes watched, paused timestamps, and media consumption'
  },
  places: {
    label: 'Places',
    iconName: 'MapPin',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-800/40',
    description: 'Physical locations, neighborhoods, cafes, and movement trails'
  },
  purchases: {
    label: 'Purchases',
    iconName: 'Receipt',
    color: 'text-amber-400',
    bg: 'bg-amber-950/40',
    border: 'border-amber-800/40',
    description: 'Itemized receipts, merchant payments, and financial intent'
  },
  photos: {
    label: 'Photos',
    iconName: 'Camera',
    color: 'text-cyan-400',
    bg: 'bg-cyan-950/40',
    border: 'border-cyan-800/40',
    description: 'Visual frames captured, cameras used, shutter speeds, and captions'
  },
  messages: {
    label: 'Messages',
    iconName: 'MessageSquare',
    color: 'text-blue-400',
    bg: 'bg-blue-950/40',
    border: 'border-blue-800/40',
    description: 'iMessages, Signal exchanges, unsent drafts, and communication shifts'
  },
  searches: {
    label: 'Searches',
    iconName: 'Search',
    color: 'text-yellow-400',
    bg: 'bg-yellow-950/40',
    border: 'border-yellow-800/40',
    description: 'Private queries, late-night curiosity, medical rabbit holes, and research'
  },
  events: {
    label: 'Events',
    iconName: 'Calendar',
    color: 'text-orange-400',
    bg: 'bg-orange-950/40',
    border: 'border-orange-800/40',
    description: 'Calendar bookings, alarms, races, and gathered assemblies'
  },
  notes: {
    label: 'Personal Notes',
    iconName: 'FileText',
    color: 'text-stone-300',
    bg: 'bg-stone-900/60',
    border: 'border-stone-700/50',
    description: 'Raw private reflections, unsorted scratchpads, and journals'
  }
};

export const MOOD_CONFIG: Record<
  MoodType,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    emoji: string;
  }
> = {
  exhausted: {
    label: 'Exhausted / Burned Out',
    color: 'text-red-400',
    bg: 'bg-red-950/50',
    border: 'border-red-800/40',
    emoji: '🔴'
  },
  restless: {
    label: 'Restless / Insomniac',
    color: 'text-purple-400',
    bg: 'bg-purple-950/50',
    border: 'border-purple-800/40',
    emoji: '🟣'
  },
  seeking: {
    label: 'Seeking / Questioning',
    color: 'text-amber-400',
    bg: 'bg-amber-950/50',
    border: 'border-amber-800/40',
    emoji: '🟡'
  },
  reflective: {
    label: 'Reflective / Still',
    color: 'text-sky-400',
    bg: 'bg-sky-950/50',
    border: 'border-sky-800/40',
    emoji: '🔵'
  },
  creative: {
    label: 'Creative / Flow',
    color: 'text-pink-400',
    bg: 'bg-pink-950/50',
    border: 'border-pink-800/40',
    emoji: '🎨'
  },
  energetic: {
    label: 'Energetic / Vital',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/50',
    border: 'border-emerald-800/40',
    emoji: '🟢'
  },
  peaceful: {
    label: 'Peaceful / Grounded',
    color: 'text-teal-400',
    bg: 'bg-teal-950/50',
    border: 'border-teal-800/40',
    emoji: '🌿'
  },
  connected: {
    label: 'Deeply Connected',
    color: 'text-orange-400',
    bg: 'bg-orange-950/50',
    border: 'border-orange-800/40',
    emoji: '🤝'
  }
};

/**
 * Given a receipt, find all connected receipts (both outgoing and incoming links)
 */
export function getConnectedReceipts(
  target: LifeReceipt,
  allReceipts: LifeReceipt[]
): LifeReceipt[] {
  const targetId = target.id;
  const directConnectedIds = new Set(target.connectedReceiptIds || []);

  // Also include incoming links (receipts that link to target)
  allReceipts.forEach((r) => {
    if (r.id !== targetId && r.connectedReceiptIds?.includes(targetId)) {
      directConnectedIds.add(r.id);
    }
  });

  return allReceipts.filter((r) => directConnectedIds.has(r.id));
}

/**
 * Calculate totals for a collection of receipts (for the Life Receipt summary)
 */
export function computeReceiptSummary(receipts: LifeReceipt[]) {
  let totalSpend = 0;
  let purchaseCount = 0;
  let songsListened = 0;
  let searchesMade = 0;
  let photosTaken = 0;
  let wordsDrafted = 0;
  const moodCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};

  receipts.forEach((r) => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
    moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;

    if (r.category === 'purchases' && r.metadata.amount) {
      totalSpend += r.metadata.amount;
      purchaseCount++;
    }
    if (r.category === 'music') {
      songsListened += r.metadata.playCount || 1;
    }
    if (r.category === 'searches') {
      searchesMade++;
    }
    if (r.category === 'photos') {
      photosTaken++;
    }
    if (r.category === 'notes' && r.metadata.wordCount) {
      wordsDrafted += r.metadata.wordCount;
    }
  });

  return {
    totalReceipts: receipts.length,
    totalSpend,
    purchaseCount,
    songsListened,
    searchesMade,
    photosTaken,
    wordsDrafted,
    dominantMood: Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as MoodType || 'reflective',
    categoryCounts,
    moodCounts
  };
}

/**
 * Intelligent Narrative Synthesizer: Given a set of picked receipts,
 * derive the latent narrative connection between them.
 */
export function synthesizeNarrative(picked: LifeReceipt[]): {
  headline: string;
  story: string;
  theme: string;
  crossDomainInsights: string[];
} {
  if (picked.length === 0) {
    return {
      headline: 'Select receipts to weave a story',
      story: 'Click any two or more receipts from the ledger to discover the invisible threads tying them together.',
      theme: 'Awaiting discovery',
      crossDomainInsights: []
    };
  }

  const categories = Array.from(new Set(picked.map((r) => r.category)));
  const moods = Array.from(new Set(picked.map((r) => r.mood)));
  const dates = picked.map((r) => new Date(r.timestamp).getTime()).sort((a, b) => a - b);
  const timeSpanDays = Math.round((dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24));

  const titles = picked.map((r) => `"${r.title}"`).join(', ');

  let headline = 'The Convergence of Disconnected Moments';
  let story = '';
  const insights: string[] = [];

  // Determine narrative archetypes
  const hasMidnight = picked.some((r) => r.timeOfDay === 'late_night');
  const hasMorning = picked.some((r) => r.timeOfDay === 'morning');
  const hasPurchase = picked.some((r) => r.category === 'purchases');
  const hasNote = picked.some((r) => r.category === 'notes');
  const hasMusic = picked.some((r) => r.category === 'music');
  const hasPhoto = picked.some((r) => r.category === 'photos');

  if (hasMidnight && hasMorning) {
    headline = 'From Insomnia Dark to Sunrise Gold: The Circadian Inversion';
    story = `Spanning ${timeSpanDays} days, these records track a human being stepping out of late-night panic loops and into deliberate morning sunlight. Notice how the internal monologue shifts: what began in the shadows of the night culminates in daylight strides.`;
    insights.push('Circadian shift: Time of day transformed from an hour of dread to a sanctuary of vitality.');
  } else if (hasPurchase && hasNote) {
    headline = 'The Balance Sheet of the Soul: What Was Bought vs. What Was Felt';
    story = `When a financial transaction is juxtaposed against a private personal note, the true ROI of a human life becomes visible. The records indicate how money spent shifted from coping mechanisms to tangible raw materials of human creation.`;
    insights.push('Value transformation: Moving from buying solutions to investing in tactile agency.');
  } else if (hasPhoto && hasMusic) {
    headline = 'Audio-Visual Resonance: Soundtrack of a Changing Lens';
    story = `Soundtracks and still frames are emotional bookmarks. These moments capture not merely sensory data, but the acoustic and visual textures of someone learning to look and listen with unfiltered presence.`;
    insights.push('Presence over speed: The deliberate choice of contemplative media slowed down the pace of living.');
  } else {
    headline = `Cross-Domain Thread: ${categories.join(' + ')}`;
    story = `These ${picked.length} receipts encompass ${categories.length} distinct domains of life across ${timeSpanDays === 0 ? 'the same day' : `${timeSpanDays} days`}. Together, they demonstrate how seemingly disparate actions—from an inquiry to a melody—form a unified emotional chapter.`;
    insights.push(`Multi-dimensional footprint: Spanning ${categories.join(', ')}.`);
  }

  insights.push(`Emotional spectrum: Transitions across ${moods.map((m) => MOOD_CONFIG[m]?.label.split('/')[0].trim()).join(' → ')}.`);
  insights.push(`Narrative cluster includes: ${titles}.`);

  return {
    headline,
    story,
    theme: `${categories.length} Life Dimensions • ${picked.length} Moments Connected`,
    crossDomainInsights: insights
  };
}
