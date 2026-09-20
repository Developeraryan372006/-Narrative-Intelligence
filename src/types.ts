export type ReceiptCategory =
  | 'music'
  | 'entertainment'
  | 'places'
  | 'purchases'
  | 'photos'
  | 'messages'
  | 'searches'
  | 'events'
  | 'notes';

export type MoodType =
  | 'exhausted'
  | 'restless'
  | 'seeking'
  | 'reflective'
  | 'creative'
  | 'energetic'
  | 'peaceful'
  | 'connected';

export type TimeOfDay = 'late_night' | 'morning' | 'afternoon' | 'evening';

export interface LifeReceipt {
  id: string;
  category: ReceiptCategory;
  timestamp: string; // ISO string e.g. "2026-02-14T02:42:00Z"
  dateFormatted: string; // "Feb 14, 2026"
  timeFormatted: string; // "02:42 AM"
  timeOfDay: TimeOfDay;
  title: string;
  subtitle: string;
  details: string;
  mood: MoodType;
  chapterId: string; // which life chapter it primarily belongs to
  connectedReceiptIds: string[]; // explicit narrative links
  connectionReason?: string; // why it connects to the primary arc
  tags: string[];
  
  // Category-specific optional metadata
  metadata: {
    // Music
    artist?: string;
    album?: string;
    bpm?: number;
    duration?: string;
    playCount?: number;

    // Entertainment
    platform?: string;
    runtime?: string;
    rating?: number;

    // Places
    locationName?: string;
    neighborhood?: string;
    city?: string;
    durationStayed?: string;

    // Purchases
    amount?: number;
    merchant?: string;
    itemCount?: number;
    items?: Array<{ name: string; price: number }>;
    paymentMethod?: string;

    // Photos
    photoUrl?: string;
    photoAspect?: 'landscape' | 'portrait' | 'square';
    cameraModel?: string;
    shutterSpeed?: string;
    iso?: number;

    // Messages
    recipientOrSender?: string;
    channel?: 'iMessage' | 'Signal' | 'Slack' | 'WhatsApp';
    isUnsentDraft?: boolean;
    isOutgoing?: boolean;

    // Searches
    searchEngine?: string;
    subsequentSearches?: string[];

    // Events
    attendees?: string[];
    status?: 'confirmed' | 'cancelled' | 'tentative';

    // Notes
    wordCount?: number;
    sentimentScore?: number; // -1 to 1
  };
}

export interface StoryChapter {
  id: string;
  title: string;
  theme: string;
  dateRange: string;
  synopsis: string;
  narrativeLead: string;
  quote: string;
  colorScheme: {
    accent: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
    border: string;
  };
  dominantMood: MoodType;
  emotionalTrajectory: string;
  behavioralShift: string;
  keyInsights: string[];
  receiptIds: string[];
  featuredReceiptSequence: string[]; // sequence for story playback
}

export interface MysteryQuest {
  id: string;
  title: string;
  prompt: string;
  difficulty: 'Easy' | 'Medium' | 'Detective';
  clueCategory: ReceiptCategory[];
  targetReceiptIds: string[];
  solvedExplanation: string;
  rewardInsight: string;
}

export interface NarrativeConnection {
  sourceId: string;
  targetId: string;
  relationshipType: 'causal' | 'emotional_echo' | 'temporal_cluster' | 'spatial_coincidence' | 'habit_shift';
  explanation: string;
}
