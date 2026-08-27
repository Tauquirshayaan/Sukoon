/**
 * A curated collection of well-known, widely-quoted short verses — for the
 * Focus panel (see FocusPanel.tsx): tapping the verse card reveals where
 * the current track sits (surah + reference) and, when the current surah
 * has one or more entries here, the popular verse(s) from it — in Arabic,
 * plus a short English gloss.
 *
 * This is intentionally NOT "one verse per surah" — some surahs (Al-Baqarah
 * especially) have several verses that are independently famous, so they
 * each get their own entry, and most surahs have none at all. The goal is
 * "the popular Quran quotes people already recognize," not full coverage.
 *
 * This is also a DELIBERATE, SCOPED exception to the site's "no translation"
 * rule (see the PRD) — not a general-purpose translation layer. It only
 * ever shows up (a) behind a tap, never ambient/always-on, and (b) only
 * for this hand-picked list of iconic verses, not a running translation of
 * whatever happens to be playing.
 *
 * Sourcing: Arabic text is the Uthmani mushaf text as published on
 * quran.com / api.alquran.cloud; the English gloss is adapted from either
 * quran.com's own displayed translation (The Clear Quran, Dr. Mustafa
 * Khattab) or Sahih International — whichever was actually fetched for
 * that entry, credited per-entry below — with clarifying-word brackets
 * (˹˺ or […]) removed for a shorter, plainer caption. The meaning is
 * unchanged; only the typographic apparatus is simplified.
 * As with src/data/surahMoods.ts, this is a starting point: have someone
 * knowledgeable in the tradition check the Arabic transcription and the
 * gloss wording before treating this list as final.
 */
export interface FamousVerse {
  surahNumber: number;
  reference: string; // e.g. "Al-Baqarah 2:255"
  arabicLines: string[];
  glossLines: string[];
  translationSource: string;
}

export const FAMOUS_VERSES: FamousVerse[] = [
  {
    surahNumber: 1,
    reference: "Al-Fatihah 1:6",
    arabicLines: ["ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ"],
    glossLines: ["Guide us along the straight path."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 2,
    reference: "Al-Baqarah 2:152",
    arabicLines: ["فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ"],
    glossLines: ["So remember Me; I will remember you. And thank Me, and never be ungrateful."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 2,
    reference: "Al-Baqarah 2:153",
    arabicLines: ["يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ"],
    glossLines: ["O believers! Seek comfort in patience and prayer. Allah is truly with those who are patient."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 2,
    reference: "Al-Baqarah 2:186",
    arabicLines: [
      "وَإِذَا سَأَلَكَ عِبَادِى عَنِّى فَإِنِّى قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ ٱلدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا۟ لِى وَلْيُؤْمِنُوا۟ بِى لَعَلَّهُمْ يَرْشُدُونَ",
    ],
    glossLines: [
      "When My servants ask you about Me: I am truly near. I respond to one's prayer when they call upon Me. So let them respond to Me and believe in Me, perhaps they will be guided.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 2,
    reference: "Al-Baqarah 2:216",
    arabicLines: [
      "كُتِبَ عَلَيْكُمُ ٱلْقِتَالُ وَهُوَ كُرْهٌ لَّكُمْ ۖ وَعَسَىٰٓ أَن تَكْرَهُوا۟ شَيْـًٔا وَهُوَ خَيْرٌ لَّكُمْ ۖ وَعَسَىٰٓ أَن تُحِبُّوا۟ شَيْـًٔا وَهُوَ شَرٌّ لَّكُمْ ۗ وَٱللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ",
    ],
    glossLines: [
      "Perhaps you dislike something which is good for you and like something which is bad for you. Allah knows and you do not know.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 2,
    reference: "Al-Baqarah 2:255 — Ayat al-Kursi",
    arabicLines: [
      "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
    ],
    glossLines: [
      "Allah! There is no god worthy of worship except Him, the Ever-Living, All-Sustaining. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who could possibly intercede with Him without His permission? He fully knows what is ahead of them and what is behind them, but no one can grasp any of His knowledge except what He wills to reveal. His Seat encompasses the heavens and the earth, and the preservation of both does not tire Him. For He is the Most High, the Greatest.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 2,
    reference: "Al-Baqarah 2:286",
    arabicLines: [
      "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًۭا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ",
    ],
    glossLines: [
      "Allah does not charge a soul except with what it can bear. It will have what it has earned, and it will bear what it has earned. 'Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, do not lay upon us a burden like that which You laid upon those before us. Our Lord, do not burden us with that which we have no ability to bear. And pardon us, forgive us, and have mercy upon us. You are our protector, so give us victory over the disbelieving people.'",
    ],
    translationSource: "Sahih International",
  },
  {
    surahNumber: 3,
    reference: "Aal-e-Imran 3:139",
    arabicLines: ["وَلَا تَهِنُوا۟ وَلَا تَحْزَنُوا۟ وَأَنتُمُ ٱلْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ"],
    glossLines: ["Do not falter or grieve, for you will have the upper hand, if you are true believers."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 3,
    reference: "Aal-e-Imran 3:173",
    arabicLines: [
      "ٱلَّذِينَ قَالَ لَهُمُ ٱلنَّاسُ إِنَّ ٱلنَّاسَ قَدْ جَمَعُوا۟ لَكُمْ فَٱخْشَوْهُمْ فَزَادَهُمْ إِيمَـٰنًۭا وَقَالُوا۟ حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ",
    ],
    glossLines: [
      "The warning only made them grow stronger in faith and they replied, 'Allah alone is sufficient for us and He is the best Protector.'",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 6,
    reference: "Al-An'am 6:162",
    arabicLines: ["قُلْ إِنَّ صَلَاتِى وَنُسُكِى وَمَحْيَاىَ وَمَمَاتِى لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ"],
    glossLines: ["Say, 'Surely my prayer, my sacrifice, my life, and my death are all for Allah — Lord of all worlds.'"],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 12,
    reference: "Yusuf 12:87",
    arabicLines: [
      "يَٰبَنِىَّ ٱذْهَبُوا۟ فَتَحَسَّسُوا۟ مِن يُوسُفَ وَأَخِيهِ وَلَا تَا۟يْـَٔسُوا۟ مِن رَّوْحِ ٱللَّهِ ۖ إِنَّهُۥ لَا يَا۟يْـَٔسُ مِن رَّوْحِ ٱللَّهِ إِلَّا ٱلْقَوْمُ ٱلْكَٰفِرُونَ",
    ],
    glossLines: [
      "O my sons! Go and search diligently for Joseph and his brother. And do not lose hope in the mercy of Allah, for no one loses hope in Allah's mercy except those with no faith.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 13,
    reference: "Ar-Ra'd 13:11",
    arabicLines: [
      "لَهُۥ مُعَقِّبَـٰتٌۭ مِّنۢ بَيْنِ يَدَيْهِ وَمِنْ خَلْفِهِۦ يَحْفَظُونَهُۥ مِنْ أَمْرِ ٱللَّهِ ۗ إِنَّ ٱللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا۟ مَا بِأَنفُسِهِمْ ۗ وَإِذَآ أَرَادَ ٱللَّهُ بِقَوْمٍۢ سُوٓءًۭا فَلَا مَرَدَّ لَهُۥ ۚ وَمَا لَهُم مِّن دُونِهِۦ مِن وَالٍ",
    ],
    glossLines: [
      "Indeed, Allah would never change a people's state of favour until they change their own state of faith. And if it is Allah's will to bring hardship upon a people, it can never be averted, nor can they find a protector other than Him.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 13,
    reference: "Ar-Ra'd 13:28",
    arabicLines: ["ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ"],
    glossLines: [
      "Those who believe and whose hearts find comfort in the remembrance of Allah — surely in the remembrance of Allah do hearts find comfort.",
    ],
    translationSource: "quran.com",
  },
  {
    surahNumber: 14,
    reference: "Ibrahim 14:7",
    arabicLines: ["وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِى لَشَدِيدٌۭ"],
    glossLines: [
      "And remember when your Lord proclaimed, 'If you are grateful, I will certainly give you more. But if you are ungrateful, surely My punishment is severe.'",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 16,
    reference: "An-Nahl 16:97",
    arabicLines: [
      "مَنْ عَمِلَ صَـٰلِحًۭا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌۭ فَلَنُحْيِيَنَّهُۥ حَيَوٰةًۭ طَيِّبَةًۭ ۖ وَلَنَجْزِيَنَّهُمْ أَجْرَهُم بِأَحْسَنِ مَا كَانُوا۟ يَعْمَلُونَ",
    ],
    glossLines: [
      "Whoever does righteousness, whether male or female, while a believer — We will surely cause them to live a good life, and We will surely give them their reward according to the best of what they used to do.",
    ],
    translationSource: "Sahih International",
  },
  {
    surahNumber: 20,
    reference: "Ta-Ha 20:25",
    arabicLines: ["قَالَ رَبِّ ٱشْرَحْ لِى صَدْرِى"],
    glossLines: ["Moses prayed, 'My Lord, uplift my heart for me.'"],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 21,
    reference: "Al-Anbiya 21:35",
    arabicLines: ["كُلُّ نَفْسٍۢ ذَآئِقَةُ ٱلْمَوْتِ ۗ وَنَبْلُوكُم بِٱلشَّرِّ وَٱلْخَيْرِ فِتْنَةًۭ ۖ وَإِلَيْنَا تُرْجَعُونَ"],
    glossLines: ["Every soul will taste death. And We test you with good and evil as a trial, then to Us you will all be returned."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 21,
    reference: "Al-Anbiya 21:87 — Dua of Yunus",
    arabicLines: [
      "وَذَا ٱلنُّونِ إِذ ذَّهَبَ مُغَـٰضِبًۭا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِى ٱلظُّلُمَـٰتِ أَن لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ",
    ],
    glossLines: [
      "And remember when the Man of the Whale stormed off in a rage, thinking We would not restrain him. Then in the darkness he cried out, 'There is no god except You. Glory be to You! I have certainly done wrong.'",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 24,
    reference: "An-Nur 24:35 — the Verse of Light",
    arabicLines: [
      "ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ مَثَلُ نُورِهِۦ كَمِشْكَوٰةٍۢ فِيهَا مِصْبَاحٌ ۖ ٱلْمِصْبَاحُ فِى زُجَاجَةٍ ۖ ٱلزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌۭ دُرِّىٌّۭ يُوقَدُ مِن شَجَرَةٍۢ مُّبَـٰرَكَةٍۢ زَيْتُونَةٍۢ لَّا شَرْقِيَّةٍۢ وَلَا غَرْبِيَّةٍۢ يَكَادُ زَيْتُهَا يُضِىٓءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌۭ ۚ نُّورٌ عَلَىٰ نُورٍۢ ۗ يَهْدِى ٱللَّهُ لِنُورِهِۦ مَن يَشَآءُ ۚ وَيَضْرِبُ ٱللَّهُ ٱلْأَمْثَـٰلَ لِلنَّاسِ ۗ وَٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمٌۭ",
    ],
    glossLines: [
      "Allah is the Light of the heavens and the earth. The example of His light is like a niche within which is a lamp, the lamp is within glass, the glass as if it were a pearly star lit from a blessed olive tree, neither of the east nor of the west, whose oil would almost glow even if untouched by fire. Light upon light. Allah guides to His light whom He wills.",
    ],
    translationSource: "Sahih International",
  },
  {
    surahNumber: 25,
    reference: "Al-Furqan 25:74",
    arabicLines: ["وَٱلَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ أَعْيُنٍۢ وَٱجْعَلْنَا لِلْمُتَّقِينَ إِمَامًۭا"],
    glossLines: [
      "Those who pray, 'Our Lord! Bless us with pious spouses and offspring who will be the joy of our hearts, and make us models for the righteous.'",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 30,
    reference: "Ar-Rum 30:21",
    arabicLines: [
      "وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ",
    ],
    glossLines: [
      "And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 33,
    reference: "Al-Ahzab 33:21",
    arabicLines: [
      "لَّقَدْ كَانَ لَكُمْ فِى رَسُولِ ٱللَّهِ أُسْوَةٌ حَسَنَةٌۭ لِّمَن كَانَ يَرْجُوا۟ ٱللَّهَ وَٱلْيَوْمَ ٱلْـَٔاخِرَ وَذَكَرَ ٱللَّهَ كَثِيرًۭا",
    ],
    glossLines: ["Indeed, in the Messenger of Allah you have an excellent example for whoever has hope in Allah and the Last Day, and remembers Allah often."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 39,
    reference: "Az-Zumar 39:10",
    arabicLines: [
      "قُلْ يَـٰعِبَادِ ٱلَّذِينَ ءَامَنُوا۟ ٱتَّقُوا۟ رَبَّكُمْ ۚ لِلَّذِينَ أَحْسَنُوا۟ فِى هَـٰذِهِ ٱلدُّنْيَا حَسَنَةٌۭ ۗ وَأَرْضُ ٱللَّهِ وَٰسِعَةٌ ۗ إِنَّمَا يُوَفَّى ٱلصَّـٰبِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍۢ",
    ],
    glossLines: [
      "Say, 'O My servants who believe! Be mindful of your Lord. Those who do good in this world will have a good reward. And Allah's earth is spacious. Only those who endure patiently will be given their reward without limit.'",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 39,
    reference: "Az-Zumar 39:53",
    arabicLines: [
      "قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ",
    ],
    glossLines: [
      "Say, 'O My servants who have exceeded the limits against their souls! Do not lose hope in Allah's mercy, for Allah certainly forgives all sins. He is indeed the All-Forgiving, Most Merciful.'",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 49,
    reference: "Al-Hujurat 49:13",
    arabicLines: [
      "يَـٰٓأَيُّهَا ٱلنَّاسُ إِنَّا خَلَقْنَـٰكُم مِّن ذَكَرٍۢ وَأُنثَىٰ وَجَعَلْنَـٰكُمْ شُعُوبًۭا وَقَبَآئِلَ لِتَعَارَفُوٓا۟ ۚ إِنَّ أَكْرَمَكُمْ عِندَ ٱللَّهِ أَتْقَىٰكُمْ ۚ إِنَّ ٱللَّهَ عَلِيمٌ خَبِيرٌۭ",
    ],
    glossLines: [
      "O humanity! Indeed, We created you from a male and a female, and made you into peoples and tribes so that you may know one another. Surely the most noble of you in the sight of Allah is the most righteous among you.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 65,
    reference: "At-Talaq 65:3",
    arabicLines: [
      "وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥٓ ۚ إِنَّ ٱللَّهَ بَٰلِغُ أَمْرِهِۦ ۚ قَدْ جَعَلَ ٱللَّهُ لِكُلِّ شَىْءٍۢ قَدْرًا",
    ],
    glossLines: [
      "…and He provides for them from sources they could never imagine. And whoever puts their trust in Allah, then He alone is sufficient for them. Certainly Allah achieves His will. Allah has already set a destiny for everything.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 94,
    reference: "Ash-Sharh 94:1",
    arabicLines: ["أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ"],
    glossLines: ["Have We not uplifted your heart for you?"],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 94,
    reference: "Ash-Sharh 94:5-6",
    arabicLines: ["فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"],
    glossLines: ["So, surely with hardship comes ease.", "Surely with that hardship comes more ease."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 103,
    reference: "Al-'Asr 103:1-3",
    arabicLines: [
      "وَٱلْعَصْرِ",
      "إِنَّ ٱلْإِنسَٰنَ لَفِى خُسْرٍ",
      "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ",
    ],
    glossLines: [
      "By the passage of time!",
      "Surely humanity is in grave loss,",
      "except those who have faith, do good, and urge each other to the truth, and urge each other to perseverance.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  {
    surahNumber: 112,
    reference: "Al-Ikhlas 112:1-4",
    arabicLines: ["قُلْ هُوَ ٱللَّهُ أَحَدٌ", "ٱللَّهُ ٱلصَّمَدُ", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ"],
    glossLines: [
      "Say, 'He is Allah — One and Indivisible;'",
      "Allah — the Sustainer needed by all.",
      "He has never had offspring, nor was He born.",
      "And there is none comparable to Him.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
];

export function getFamousVersesForSurah(surahNumber: number | null | undefined): FamousVerse[] {
  if (!surahNumber) return [];
  return FAMOUS_VERSES.filter((v) => v.surahNumber === surahNumber);
}
