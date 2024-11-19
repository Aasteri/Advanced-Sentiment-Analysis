interface SentimentCategories {
  positive: {
    strong: Set<string>;
    moderate: Set<string>;
    mild: Set<string>;
  };
  negative: {
    strong: Set<string>;
    moderate: Set<string>;
    mild: Set<string>;
  };
}

export const sentimentLexicon: SentimentCategories = {
  positive: {
    strong: new Set([
      // Achievement & Success
      'excellent', 'outstanding', 'amazing', 'incredible', 'brilliant', 'perfect',
      'exceptional', 'phenomenal', 'magnificent', 'spectacular', 'extraordinary',
      'superb', 'wonderful', 'fantastic', 'sublime', 'delighted', 'overjoyed',
      'triumphant', 'victorious', 'revolutionary', 'groundbreaking', 'masterful',
      'unmatched', 'unparalleled', 'legendary', 'remarkable', 'breathtaking',

      // Emotional Highs
      'ecstatic', 'thrilled', 'exhilarated', 'euphoric', 'elated', 'jubilant',
      'blissful', 'radiant', 'enchanted', 'captivated', 'passionate', 'inspired',
      'energized', 'empowered', 'transformed', 'uplifted', 'blessed', 'grateful',

      // Professional Excellence
      'innovative', 'visionary', 'pioneering', 'exemplary', 'outstanding',
      'distinguished', 'acclaimed', 'renowned', 'prestigious', 'celebrated',
      'influential', 'transformative', 'revolutionary', 'game-changing',

      // Personal Growth
      'flourishing', 'thriving', 'evolving', 'prospering', 'advancing',
      'excelling', 'succeeding', 'achieving', 'accomplishing', 'mastering'
    ]),
    moderate: new Set([
      // General Positive
      'good', 'great', 'happy', 'pleased', 'satisfied', 'impressive', 'lovely',
      'enjoyable', 'favorable', 'positive', 'successful', 'proud', 'confident',
      'reliable', 'efficient', 'effective', 'helpful', 'valuable',

      // Professional
      'productive', 'proficient', 'skilled', 'capable', 'competent', 'qualified',
      'accomplished', 'experienced', 'knowledgeable', 'professional', 'organized',
      'systematic', 'methodical', 'strategic', 'resourceful', 'innovative',

      // Emotional
      'content', 'cheerful', 'optimistic', 'motivated', 'encouraged', 'inspired',
      'hopeful', 'peaceful', 'balanced', 'harmonious', 'fulfilled', 'gratified',

      // Interpersonal
      'friendly', 'supportive', 'cooperative', 'collaborative', 'understanding',
      'respectful', 'considerate', 'thoughtful', 'kind', 'generous', 'empathetic',

      // Quality
      'consistent', 'dependable', 'trustworthy', 'authentic', 'genuine', 'solid',
      'stable', 'steady', 'reliable', 'robust', 'durable', 'sustainable'
    ]),
    mild: new Set([
      // Basic Positive
      'nice', 'okay', 'fine', 'decent', 'acceptable', 'better', 'improved',
      'comfortable', 'adequate', 'satisfactory', 'pleasant', 'promising',

      // Progress
      'developing', 'growing', 'learning', 'progressing', 'advancing', 'moving',
      'gaining', 'building', 'establishing', 'forming', 'emerging',

      // Potential
      'potential', 'promising', 'hopeful', 'budding', 'developing', 'evolving',
      'improving', 'progressing', 'advancing', 'rising', 'growing',

      // Stability
      'steady', 'stable', 'balanced', 'consistent', 'regular', 'predictable',
      'reliable', 'dependable', 'secure', 'sound', 'solid',

      // Comfort
      'comfortable', 'relaxed', 'calm', 'peaceful', 'quiet', 'settled',
      'composed', 'collected', 'assured', 'at-ease', 'content'
    ])
  },
  negative: {
    strong: new Set([
      // Severe Problems
      'terrible', 'horrible', 'awful', 'disastrous', 'catastrophic', 'dreadful',
      'abysmal', 'appalling', 'horrific', 'devastating', 'atrocious', 'furious',
      'outrageous', 'inexcusable', 'unforgivable', 'deplorable', 'despicable',

      // Extreme Emotions
      'enraged', 'livid', 'seething', 'horrified', 'disgusted', 'devastated',
      'heartbroken', 'shattered', 'traumatized', 'tormented', 'anguished',

      // Critical Failures
      'catastrophic', 'disastrous', 'ruinous', 'calamitous', 'destructive',
      'crippling', 'devastating', 'fatal', 'ruined', 'destroyed', 'obliterated',

      // Severe Impact
      'dangerous', 'hazardous', 'lethal', 'toxic', 'poisonous', 'deadly',
      'critical', 'severe', 'extreme', 'dire', 'grave', 'serious',

      // Complete Rejection
      'abhorrent', 'detestable', 'repulsive', 'revolting', 'offensive',
      'intolerable', 'unbearable', 'insufferable', 'unacceptable'
    ]),
    moderate: new Set([
      // General Negative
      'bad', 'poor', 'disappointing', 'frustrated', 'annoyed', 'unhappy',
      'unsatisfactory', 'inadequate', 'inferior', 'problematic', 'concerning',
      'unpleasant', 'difficult', 'challenging', 'questionable',

      // Problems
      'faulty', 'defective', 'flawed', 'imperfect', 'damaged', 'broken',
      'malfunctioning', 'ineffective', 'inefficient', 'unreliable',

      // Emotions
      'angry', 'upset', 'distressed', 'disturbed', 'troubled', 'worried',
      'anxious', 'nervous', 'tense', 'stressed', 'overwhelmed', 'pressured',

      // Criticism
      'ineffective', 'incompetent', 'unreliable', 'unprofessional', 'careless',
      'negligent', 'irresponsible', 'inconsistent', 'inappropriate',

      // Obstacles
      'complicated', 'complex', 'confusing', 'puzzling', 'perplexing',
      'mysterious', 'unclear', 'vague', 'ambiguous', 'obscure'
    ]),
    mild: new Set([
      // Minor Issues
      'mediocre', 'average', 'uncertain', 'unclear', 'confused', 'unsure',
      'doubtful', 'hesitant', 'worried', 'concerned', 'uncomfortable',

      // Slight Problems
      'inconvenient', 'awkward', 'clumsy', 'unwieldy', 'cumbersome',
      'troublesome', 'bothersome', 'annoying', 'irritating', 'frustrating',

      // Uncertainty
      'ambivalent', 'undecided', 'indecisive', 'wavering', 'fluctuating',
      'unreliable', 'unpredictable', 'inconsistent', 'irregular', 'variable',

      // Mild Dissatisfaction
      'underwhelming', 'uninspiring', 'unimpressive', 'ordinary', 'plain',
      'boring', 'dull', 'tedious', 'monotonous', 'repetitive',

      // Minor Concerns
      'questionable', 'debatable', 'disputable', 'contentious', 'controversial',
      'problematic', 'troubling', 'worrying', 'concerning', 'unsettling'
    ])
  }
};