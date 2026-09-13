export type BookGuide = {
  about: string;
  expect: string;
  bestFor: string[];
};

const guides: Record<string, BookGuide> = {
  "Tales from Shakespeare": {
    "about": "Charles and Mary Lamb retell a selection of Shakespeare’s plays as readable prose stories. Instead of requiring you to navigate the original dramatic language and stage directions, the Lambs turn the plots into flowing narratives while preserving much of Shakespeare’s atmosphere and imagery. The collection introduces tragedies, comedies and romances through memorable characters, conflicts and themes such as ambition, jealousy, love, betrayal, forgiveness and mistaken identity.",
    "expect": "Expect a collection rather than one continuous story. Some tales move quickly because complicated subplots are simplified, while others retain the emotional weight of the original plays. It works especially well as a gateway into Shakespeare: you can enjoy the stories first and later return to the original plays with a much clearer sense of what is happening.",
    "bestFor": [
      "Classic literature",
      "Shakespeare",
      "Shorter stories"
    ]
  },
  "The Alchemist": {
    "about": "Paulo Coelho follows Santiago, a young shepherd who becomes convinced that he should pursue a recurring dream about treasure. His journey takes him far from the familiar life he knows and turns into a broader search for purpose, courage and meaning. The novel uses a simple adventure as a framework for ideas about dreams, destiny, uncertainty, love, perseverance and paying attention to the signs that shape our choices.",
    "expect": "This is a philosophical fable rather than a complex, plot-heavy novel. The language is accessible and the story moves quickly, but many scenes are designed to make you pause and interpret what they mean. Expect recurring ideas about finding your “Personal Legend,” taking risks and learning from the journey itself rather than simply chasing an end result.",
    "bestFor": [
      "Purpose & meaning",
      "Philosophical fiction",
      "Accessible classics"
    ]
  },
  "Principles in Maintaining a Godly Organization": {
    "about": "KP Yohannan’s short work examines how a Christian ministry or organization can preserve the spiritual purpose and passion with which it began. Drawing on Scripture and ministry experience, it focuses on maintaining vision, unity, service, humility and dependence on God instead of allowing an organization to become merely institutional or routine.",
    "expect": "Expect a compact, explicitly Christian leadership and ministry book rather than a conventional business-management manual. Its emphasis is spiritual: the health of an organization is connected to the character, priorities and motives of the people leading and serving in it. The book is likely to work best when read slowly alongside the biblical passages and practical questions it raises.",
    "bestFor": [
      "Christian leadership",
      "Ministry",
      "Faith & service"
    ]
  },
  "Meditations": {
    "about": "Meditations is Marcus Aurelius’ private collection of Stoic reflections written while he was dealing with the responsibilities, pressures and uncertainties of Roman rule. There is no conventional plot. Instead, Aurelius repeatedly reminds himself to distinguish between what he can control and what he cannot, act with integrity, accept mortality, treat other people fairly and keep his attention on the present.",
    "expect": "Expect short, dense reflections rather than a linear argument. Some passages feel immediately practical; others are more abstract and rooted in Stoic ideas about nature, reason and duty. It is a book that rewards slow reading, rereading and returning to particular passages when life presents a problem that the text speaks to.",
    "bestFor": [
      "Stoicism",
      "Reflection",
      "Philosophy"
    ]
  },
  "Before You Open Your Bible": {
    "about": "This book is designed to prepare readers to approach the Bible with better questions and expectations. Rather than immediately diving into interpretation of individual passages, it focuses on how to read Scripture responsibly—considering context, genre, the Bible’s overall story and the reader’s own assumptions. Its purpose is to make Bible reading more thoughtful rather than merely more frequent.",
    "expect": "Expect a practical introduction to the habits and mindset behind serious Bible study. It is less about giving you a list of devotional answers and more about helping you notice how biblical texts work. Readers who already spend time in Scripture may find it useful as a reset of their reading approach, while newer readers can use it as a foundation.",
    "bestFor": [
      "Bible study",
      "Christian learning",
      "Reading Scripture"
    ]
  },
  "The Art of Not Overthinking": {
    "about": "Nick Trenton’s book focuses on the cycle of rumination: repeatedly replaying situations, imagining negative outcomes and becoming trapped in analysis instead of action. It presents overthinking as a pattern that can be recognized and interrupted, then introduces practical techniques intended to create distance from anxious thoughts, clarify decisions and bring attention back to the present.",
    "expect": "Expect a hands-on self-help format with exercises and techniques rather than a deep academic treatment of psychology. The book is designed to be applied while reading, so some ideas may feel familiar while others are useful mainly as prompts to change how you respond to recurring thought patterns.",
    "bestFor": [
      "Overthinking",
      "Practical self-help",
      "Mental clarity"
    ]
  },
  "Foxe's Christian Martyrs of the World": {
    "about": "John Foxe’s famous martyrology records accounts of Christians who were persecuted or executed for their faith, with particular emphasis on the history of the English Reformation and earlier periods of Christian persecution. The work combines historical narrative, testimony and religious interpretation to portray the courage, suffering and convictions of people who refused to abandon their beliefs.",
    "expect": "Expect a historical and devotional work, not a modern neutral history textbook. Accounts can be emotionally intense and sometimes graphic, and the presentation reflects Foxe’s Protestant perspective and the historical context in which he wrote. It is best approached as both a primary historical source and a work of religious literature, with attention to its perspective and limitations.",
    "bestFor": [
      "Church history",
      "Christian history",
      "Historical accounts"
    ]
  },
  "Jesus Christ: His Life and Teaching": {
    "about": "This book presents the life and teachings of Jesus through the major events and ideas associated with his ministry: his identity, message, relationships, teaching, suffering, death and resurrection. Rather than treating Jesus only as a historical figure, it approaches his words and actions through a Christian theological lens and invites the reader to consider their significance for faith and discipleship.",
    "expect": "Expect a structured account built around Jesus’ teachings and ministry rather than a fictional biography. Depending on the edition, passages from the Gospels and explanatory commentary may carry much of the book. It is best read with a Bible nearby if you want to compare the presentation with the underlying Gospel accounts.",
    "bestFor": [
      "Jesus & Christianity",
      "Gospel study",
      "Faith"
    ]
  },
  "The Unique Jesus: The Man and His Message": {
    "about": "This short Christian book focuses on the distinctiveness of Jesus—his character, teaching, claims and the message at the center of Christianity. It is less about covering every event in Jesus’ life and more about asking why his person and message have had such a lasting impact and what those claims mean for someone considering Christian faith.",
    "expect": "Because it is a very short book, expect an introductory and focused treatment rather than an exhaustive study. It is suited to reading in one sitting and reflecting on the central questions it raises about Jesus’ identity, teaching and significance.",
    "bestFor": [
      "Jesus",
      "Christian apologetics",
      "Short reads"
    ]
  },
  "Dark Psychology Secrets & Manipulation": {
    "about": "This book explores the darker side of interpersonal behavior: persuasion, manipulation, influence, deception and the psychological patterns that can make people vulnerable to them. Its central appeal is practical awareness—recognizing tactics that may be used in social situations and understanding how emotional triggers, pressure and persuasion can shape decisions.",
    "expect": "Expect a popular-psychology presentation rather than a rigorous academic textbook. Some concepts are simplified or presented in dramatic language, so it is useful to treat the material as a collection of ideas for critical observation rather than as settled scientific fact. The most useful takeaway is often learning to recognize unhealthy influence and protect your own boundaries.",
    "bestFor": [
      "Psychology",
      "Influence",
      "Human behavior"
    ]
  },
  "The Mountain Is You": {
    "about": "Brianna Wiest examines self-sabotage—the ways people can repeatedly get in their own way even when they consciously want change. The “mountain” is a metaphor for the internal patterns, fears, emotional habits and unresolved conflicts that can keep a person stuck. The book connects personal growth with understanding why those patterns exist rather than simply trying to overpower them.",
    "expect": "Expect reflective self-help with a strong emphasis on emotional awareness and personal responsibility. It is less of a step-by-step productivity manual and more of an invitation to examine the hidden reasons behind your choices. Some passages are designed to be reread when you are working through a particular pattern in your own life.",
    "bestFor": [
      "Self-awareness",
      "Personal growth",
      "Emotional patterns"
    ]
  },
  "Everything Is F*cked: A Book About Hope": {
    "about": "Mark Manson turns his attention from individual happiness to a bigger question: why can people feel hopeless even when modern life offers extraordinary levels of safety, information and material comfort? He explores hope, emotion, meaning, pain, religion and human psychology, arguing that a meaningful life cannot be built simply by eliminating discomfort or chasing positive feelings.",
    "expect": "Expect a provocative mix of philosophy, psychology, history and Manson’s deliberately blunt humor. It is more abstract and intellectual than The Subtle Art of Not Giving a F*ck, and it spends considerable time challenging assumptions about what motivates people. The book is meant to provoke thought more than hand you a neat ten-step solution.",
    "bestFor": [
      "Meaning & hope",
      "Modern philosophy",
      "Uncomfortable questions"
    ]
  },
  "Think and Grow Rich": {
    "about": "Napoleon Hill presents a philosophy of achievement built around desire, belief, organized planning, persistence and disciplined action. Drawing on stories of successful people, the book argues that the way a person thinks about goals strongly influences what they attempt and persist in doing. Its famous principles turn ambition into a framework of habits, mental attitudes and deliberate action.",
    "expect": "Expect an old-school motivational style. Some examples and assumptions belong firmly to the era in which the book was written, so it is more useful as a historical classic of success literature than as a modern evidence-based psychology text. Read for its ideas about goal-setting, persistence and self-belief, while evaluating its stronger claims critically.",
    "bestFor": [
      "Motivation",
      "Goals",
      "Classic self-help"
    ]
  },
  "The 48 Laws of Power": {
    "about": "Robert Greene distills recurring patterns of power and influence from thousands of years of history, politics and social conflict into 48 principles. Each law is illustrated through historical figures and stories, showing how people gain status, protect their position, conceal intentions, manage rivals and navigate hierarchies.",
    "expect": "Expect a strategic and sometimes deliberately ruthless book. Greene often describes how power operates rather than how people ideally ought to behave. Some laws are useful as defensive awareness; others can feel ethically uncomfortable. The most interesting way to read it is as a study of social dynamics—learning to recognize games of power without automatically accepting every tactic as something to imitate.",
    "bestFor": [
      "Strategy",
      "Power dynamics",
      "Human behavior"
    ]
  },
  "The Richest Man in Babylon": {
    "about": "George S. Clason teaches personal-finance principles through a series of stories set in ancient Babylon. Characters learn lessons about saving, controlling spending, building productive wealth, avoiding unnecessary debt and seeking knowledgeable advice. The setting is historical and fictionalized, but the underlying lessons are intentionally simple and practical.",
    "expect": "Expect short parables rather than a technical finance course. The language can feel repetitive because the same principles are reinforced through different stories. Its strength is simplicity: it introduces foundational money habits in a memorable way without requiring financial knowledge.",
    "bestFor": [
      "Personal finance",
      "Money basics",
      "Simple lessons"
    ]
  },
  "101 Ways to Boost Your Math Skills": {
    "about": "This practical book is built around techniques, exercises and mental approaches intended to strengthen everyday mathematical ability. Rather than focusing on advanced theory, it aims to make calculation, number sense, problem solving and mathematical confidence more accessible through repeated practice.",
    "expect": "Expect an exercise-oriented book that works best when you actively solve problems instead of simply reading the explanations. The value comes from practice and repetition, so it can be used as a short daily skills workout rather than a book you read straight through once.",
    "bestFor": [
      "Math practice",
      "Problem solving",
      "Skill building"
    ]
  },
  "Master Your Emotions": {
    "about": "Thibaut Meurisse focuses on emotional self-management: understanding how thoughts influence feelings, identifying recurring emotional patterns and developing greater control over your responses. The book encourages readers to become observers of their internal state rather than allowing every emotion to dictate an immediate reaction.",
    "expect": "Expect concise personal-development advice with exercises and reflective prompts. The approach is practical and accessible rather than clinical or highly academic. Some ideas overlap with familiar mindfulness and cognitive-behavioral concepts, so the book works best as a toolkit for reflection and practice.",
    "bestFor": [
      "Emotional control",
      "Self-improvement",
      "Mindfulness"
    ]
  },
  "Atomic Habits": {
    "about": "James Clear explains how small, repeated behaviors compound into major results. Instead of treating change as a matter of motivation alone, he focuses on systems, environment and identity. His Four Laws of Behavior Change—make it obvious, attractive, easy and satisfying—provide a framework for building good habits and making unwanted habits harder to repeat.",
    "expect": "Expect one of the most practical books in your collection. Clear combines psychology, behavioral science, examples and highly usable techniques such as habit stacking and the Two-Minute Rule. The ideas are designed to be applied immediately, so it is worth pausing after chapters and translating them into your own routines.",
    "bestFor": [
      "Habits",
      "Productivity",
      "Behavior change"
    ]
  },
  "Rich Dad Poor Dad": {
    "about": "Robert Kiyosaki uses the contrasting lessons of two father figures to explain his philosophy of financial education. The book challenges conventional assumptions about employment, income and wealth, emphasizing assets, liabilities, cash flow and the importance of learning how money works.",
    "expect": "Expect a provocative introduction to personal finance rather than a detailed investing textbook. Kiyosaki deliberately challenges conventional thinking and uses stories to make his points memorable. Some of his financial claims are controversial, so it is worth separating the useful concepts—cash flow, financial literacy and asset thinking—from advice that requires independent verification.",
    "bestFor": [
      "Financial literacy",
      "Money mindset",
      "Entrepreneurship"
    ]
  },
  "You Can Heal Your Life": {
    "about": "Louise Hay presents a mind-body and spiritual approach to personal change centered on beliefs, self-worth, forgiveness and affirmations. She argues that changing habitual thoughts and attitudes can transform how people experience themselves and their lives. The book is strongly rooted in Hay’s New Thought philosophy and her belief in the power of affirmations.",
    "expect": "Expect an affirmations-heavy, spiritually oriented self-help book. Some of its mind-body claims are philosophical or belief-based rather than established medical science, so they should not be treated as medical advice or a replacement for professional care. Its strongest use is as a reflective text about self-talk, self-acceptance and personal meaning.",
    "bestFor": [
      "Affirmations",
      "Self-love",
      "Spiritual self-help"
    ]
  },
  "The Odyssey": {
    "about": "Homer’s Odyssey follows Odysseus as he struggles to return home after the Trojan War. The journey becomes a series of encounters involving monsters, gods, temptation, hospitality, deception and survival, while his family faces its own problems in Ithaca. Beneath the adventure is a larger story about homecoming, identity, loyalty, endurance and what it means to reclaim one’s place.",
    "expect": "Expect epic storytelling rather than modern realism. The narrative moves between different times and perspectives, and the gods frequently intervene in human affairs. Depending on your edition, the language can range from very accessible to highly literary. The repeated motifs and episodes become more rewarding once you see the larger themes connecting them.",
    "bestFor": [
      "Epic literature",
      "Mythology",
      "Classics"
    ]
  },
  "The Psychology of Money": {
    "about": "Morgan Housel examines why financial success is often less about mathematical knowledge and more about behavior, emotions, habits and personal history. Through short stories and observations, he explores risk, luck, compounding, patience, wealth versus income, and the very different ways people define “enough.”",
    "expect": "Expect short, story-driven chapters rather than a conventional finance course. Housel is interested in how people behave with money under uncertainty, so many lessons are about patience, perspective and avoiding catastrophic mistakes. It is particularly approachable if you want financial ideas without heavy equations or technical investing terminology.",
    "bestFor": [
      "Money psychology",
      "Investing mindset",
      "Financial behavior"
    ]
  },
  "Don't Believe Everything You Think": {
    "about": "Joseph Nguyen focuses on the relationship between thought, suffering and emotional experience. The book argues that distress often grows when we automatically believe every thought that appears in our mind, and it encourages readers to create distance from habitual thinking instead of trying to control every thought directly.",
    "expect": "Expect a short, accessible philosophical self-help book with a strong emphasis on observing thought rather than wrestling with it. Its language is intentionally simple and repetitive, making it easy to revisit. It is best approached as a perspective-shifting book rather than a clinical guide to anxiety or mental health.",
    "bestFor": [
      "Overthinking",
      "Inner peace",
      "Mindfulness"
    ]
  },
  "The Complete Novels of Sherlock Holmes": {
    "about": "This collection brings together Arthur Conan Doyle’s four Sherlock Holmes novels, following the brilliant detective and Dr. John Watson through mysteries solved by observation, deduction, disguise and careful reconstruction of events. Holmes’ cases range from murders and disappearances to conspiracies and strange crimes, while Watson provides the human perspective on his extraordinary friend.",
    "expect": "Expect classic detective fiction with a strong emphasis on clues and reasoning. The Victorian setting, social customs and language are part of the experience. Because the collection contains full novels rather than only short cases, you get a broader view of Holmes and Watson’s relationship alongside the individual mysteries.",
    "bestFor": [
      "Mystery",
      "Detective fiction",
      "Classic literature"
    ]
  },
  "The Diary of a CEO": {
    "about": "Steven Bartlett organizes lessons from his conversations, experiences and observations around principles for building a successful life and career. The book moves beyond business into relationships, identity, health, decision-making and personal growth, asking what habits and beliefs help people create sustainable success rather than merely visible achievement.",
    "expect": "Expect a modern, conversational business-and-life book built around principles rather than one continuous argument. Many chapters are designed to be memorable and actionable, making it easy to read in short sessions. Some ideas are deliberately provocative, so the book is most useful when you test the principles against your own experience rather than treating every rule as universal.",
    "bestFor": [
      "Business",
      "Personal growth",
      "Leadership"
    ]
  },
  "Make Your Bed": {
    "about": "Admiral William H. McRaven turns lessons from Navy SEAL training into principles for everyday life. The central idea is that disciplined small actions—starting with making your bed—can build momentum, responsibility and resilience. Stories from military training illustrate broader lessons about teamwork, failure, courage, perseverance and helping others.",
    "expect": "Expect a short motivational book built around stories and memorable principles. It is direct, accessible and easy to finish quickly. Rather than offering a complicated productivity system, it emphasizes discipline, consistency and character through examples from demanding military experiences.",
    "bestFor": [
      "Discipline",
      "Resilience",
      "Motivation"
    ]
  },
  "The Power of Your Subconscious Mind": {
    "about": "Joseph Murphy explores the idea that subconscious beliefs and mental patterns strongly influence behavior, confidence and the direction of a person’s life. The book combines psychology-flavored language with spiritual and metaphysical ideas, encouraging readers to use visualization, suggestion, prayer and repeated positive thoughts to reshape their inner expectations.",
    "expect": "Expect a classic New Thought text rather than a modern scientific psychology manual. Some claims are presented with more certainty than contemporary evidence supports, so the book is best read critically. Its practical appeal lies in the discussion of self-talk, visualization, belief and the effect that repeated mental patterns can have on behavior.",
    "bestFor": [
      "Mindset",
      "Visualization",
      "Classic self-help"
    ]
  },
  "Good Vibes, Good Life": {
    "about": "Vex King combines personal stories, positive psychology themes and spiritual reflection to explore self-love, gratitude, relationships, mindset and personal growth. The book encourages readers to become more intentional about the thoughts, habits and environments they cultivate, with the broader goal of creating a more positive and meaningful life.",
    "expect": "Expect an upbeat, accessible self-help book with short reflections and practical suggestions. It leans toward inspirational and spiritual language rather than rigorous psychology. The format makes it easy to dip into individual ideas, especially when you want encouragement or a prompt for reflection.",
    "bestFor": [
      "Positivity",
      "Self-love",
      "Personal growth"
    ]
  },
  "The Art of Being Alone": {
    "about": "Renuka Gavrani explores solitude as something that can be intentionally used for self-discovery rather than automatically treated as loneliness. The book encourages readers to become comfortable with their own company, understand their needs and build a stronger sense of self without depending entirely on external validation.",
    "expect": "Expect a gentle, reflective self-help book rather than a technical psychology text. The ideas are accessible and personal, with emphasis on boundaries, independence and enjoying your own space. It is particularly suited to reading slowly and connecting the ideas to your own routines and relationships.",
    "bestFor": [
      "Solitude",
      "Self-discovery",
      "Independence"
    ]
  },
  "Same as Ever": {
    "about": "Morgan Housel asks a deceptively simple question: while the future is difficult to predict, what parts of human behavior can we expect to remain the same? Using stories from history, business, investing and everyday life, he argues that understanding persistent human tendencies can be more useful than trying to forecast every new development.",
    "expect": "Expect short, engaging essays rather than a linear finance manual. Housel uses stories to make broader lessons about risk, incentives, greed, fear, opportunity and human behavior. The book is particularly interesting when you compare its “things that don't change” with the rapidly changing world around you.",
    "bestFor": [
      "Decision-making",
      "Money & behavior",
      "Long-term thinking"
    ]
  },
  "Day by Day: Call to Mission": {
    "about": "This devotional-style Christian book is built around the idea of living with a daily awareness of Christian mission. Rather than treating faith as something confined to church activities, it encourages readers to see ordinary life, relationships, service and personal choices as opportunities to participate in God’s work.",
    "expect": "Expect short, focused readings that work well one day at a time. The book is more devotional and practical than academic, so its value comes from reflection and application rather than from reading large sections quickly.",
    "bestFor": [
      "Christian devotion",
      "Mission",
      "Daily reflection"
    ]
  },
  "Called to Be a Soldier: Exploring the Soldier's Covenant": {
    "about": "This Christian discipleship book uses the metaphor and discipline of a soldier to explore commitment to Christ. It examines ideas such as loyalty, obedience, endurance, sacrifice, service and responsibility, presenting discipleship as a deliberate covenant rather than a passive identity.",
    "expect": "Expect a strongly practical and motivational Christian treatment of discipleship. The military imagery gives the book a clear tone: it is about commitment and action as much as belief. It is best read as a challenge to examine how seriously you approach Christian responsibility and service.",
    "bestFor": [
      "Christian discipleship",
      "Commitment",
      "Spiritual discipline"
    ]
  },
  "Dopamine Detox": {
    "about": "Thibaut Meurisse’s book addresses the pull of highly stimulating activities such as social media, entertainment and constant digital consumption. It argues that deliberately reducing these distractions can help restore attention and make ordinary activities feel more rewarding. The broader goal is not literally to remove dopamine, but to regain control over habits that fragment attention.",
    "expect": "Expect a practical productivity and digital-wellbeing guide rather than a neuroscience textbook. The “detox” language is intentionally simple and should not be interpreted as a literal medical reset of dopamine levels. The useful part is the behavioral experiment: reduce easy stimulation, notice what changes and redesign your environment.",
    "bestFor": [
      "Digital habits",
      "Focus",
      "Productivity"
    ]
  },
  "Called to Be God's People": {
    "about": "This Christian discipleship-oriented book explores what it means for believers to understand themselves as God’s people. It focuses on identity, community, obedience, responsibility and living out faith rather than treating Christianity as merely a private belief system.",
    "expect": "Expect a faith-centered book that connects biblical identity with everyday conduct and community. It is likely to be most useful when read alongside Scripture and considered through the lens of practical Christian life rather than as a purely theological textbook.",
    "bestFor": [
      "Christian identity",
      "Discipleship",
      "Bible reflection"
    ]
  },
  "Stop Overthinking: 23 Techniques to Relieve Stress, Stop Negative Spirals, Declutter Your Mind, and Focus on the Present": {
    "about": "Nick Trenton presents 23 practical techniques for interrupting repetitive negative thought loops and reducing mental clutter. The book focuses on recognizing rumination, changing attention, questioning unhelpful thought patterns and becoming more grounded in the present instead of continuously replaying the past or rehearsing possible futures.",
    "expect": "Expect a technique-heavy self-help book. It is designed to be used rather than simply read, so some chapters may feel like exercises or prompts. The ideas overlap with familiar mindfulness and cognitive strategies, making it especially useful if you want concrete things to try when your mind gets stuck.",
    "bestFor": [
      "Overthinking",
      "Stress management",
      "Practical exercises"
    ]
  },
  "Read This First: A Simple Guide to Getting the Most from the Bible": {
    "about": "This guide is aimed at readers who want to understand the Bible more effectively. It helps frame Scripture as a collection of different literary genres and historical contexts rather than one uniform kind of book. The emphasis is on reading with context, asking better questions and understanding how individual passages fit into the larger biblical story.",
    "expect": "Expect an introductory, practical guide rather than a verse-by-verse commentary. It is useful before or alongside Bible reading because it gives you a framework for approaching unfamiliar books and passages. The payoff comes when you apply its reading principles directly to Scripture.",
    "bestFor": [
      "Bible reading",
      "Christian study",
      "Beginners"
    ]
  },
  "The World's Greatest Short Stories: 70 of the Finest Stories Ever Written": {
    "about": "This anthology gathers a broad selection of celebrated short stories from different authors and periods. Because each story stands on its own, the collection becomes a tour through different voices, genres, cultures and approaches to storytelling—from suspense and tragedy to humor, romance, psychological drama and social observation.",
    "expect": "Expect variety more than a single reading experience. Some stories will immediately appeal to you; others may feel slower or more historically distant. That variety is the point: you can discover authors and styles without committing to a full novel. It also makes the book ideal for reading one story at a time.",
    "bestFor": [
      "Short fiction",
      "Classic stories",
      "Literary exploration"
    ]
  },
  "Ikigai: The Japanese Secret to a Long and Happy Life": {
    "about": "Héctor García and Francesc Miralles introduce the idea of ikigai—the sense of purpose or reason for getting up in the morning—through observations about Japanese life, longevity and everyday habits. The book connects purpose with community, activity, food, movement, relationships and a slower approach to living.",
    "expect": "Expect a light, accessible blend of lifestyle writing, interviews, cultural observations and practical suggestions. It is not a rigorous scientific study of longevity, and some claims should be treated as popular interpretation rather than definitive research. Its appeal is in prompting you to think about purpose, routine and what makes daily life worth engaging with.",
    "bestFor": [
      "Purpose",
      "Lifestyle",
      "Well-being"
    ]
  },
  "The Ikigai Journey: A Practical Guide to Finding Happiness and Purpose the Japanese Way": {
    "about": "This companion-style book develops the idea of ikigai into a more practical process for identifying what gives your life meaning. It explores values, strengths, interests, relationships and everyday activities, encouraging readers to move from simply thinking about purpose to experimenting with ways of living it.",
    "expect": "Expect more exercises and reflection than a conventional narrative. It works well as a workbook-style companion to the broader ikigai concept. The best results come from writing down answers, noticing patterns and revisiting them rather than treating the book as something to finish passively.",
    "bestFor": [
      "Purpose finding",
      "Self-reflection",
      "Life design"
    ]
  },
  "The Republic": {
    "about": "Plato’s Republic begins with a deceptively simple question: what is justice? The conversation expands into a much larger examination of the ideal society, education, leadership, human nature and the relationship between justice and a good life. Through Socrates and his interlocutors, Plato develops famous ideas such as the philosopher-king, the allegory of the cave and the divided soul.",
    "expect": "Expect a philosophical dialogue rather than a conventional story. Some arguments unfold slowly and can be challenging, but the recurring questions remain surprisingly relevant: Who should lead? What should people be educated to become? Is a just life actually better for the person living it? Reading slowly and taking notes pays off.",
    "bestFor": [
      "Philosophy",
      "Political thought",
      "Classics"
    ]
  },
  "Life with Jesus: A Discipleship Course for Every Christian": {
    "about": "This course-style Christian book focuses on what it means to follow Jesus in everyday life. Rather than stopping at belief, it treats discipleship as a continuing process involving spiritual growth, obedience, relationships, habits, service and learning to shape daily decisions around Jesus’ teaching.",
    "expect": "Expect a structured, practical format that lends itself to personal study or group discussion. It is more interactive and application-focused than a conventional biography of Jesus. Reading with a Bible and allowing time for the questions or exercises will likely make it more useful than simply reading it straight through.",
    "bestFor": [
      "Christian discipleship",
      "Group study",
      "Spiritual growth"
    ]
  },
  "Think Straight": {
    "about": "Darius Foroux focuses on mental clarity and the habits that make thinking more deliberate. The book addresses distraction, negative thinking, indecision, attention and the tendency to let other people or circumstances control our mental space. Its central theme is that clearer thinking comes from deliberately choosing what deserves your attention.",
    "expect": "Expect short, direct personal-development advice rather than a deep academic treatment of cognition. The book is easy to consume in small sections and is strongest when its ideas are translated into changes in how you work, consume information and make decisions.",
    "bestFor": [
      "Mental clarity",
      "Focus",
      "Decision-making"
    ]
  },
  "The Art of Spending Money: Simple Choices for a Richer Life": {
    "about": "Morgan Housel shifts the question from how to earn, save or invest money to how to spend it well. He explores the psychology behind consumption, status, expectations, comfort and happiness, arguing that good spending is deeply personal and depends more on self-awareness than on universal budgeting rules.",
    "expect": "Expect stories and reflections rather than a budgeting system or list of financial hacks. Housel is interested in the trade-offs behind spending decisions: what genuinely improves your life versus what merely looks impressive. It pairs naturally with The Psychology of Money but concentrates on the spending side of financial behavior.",
    "bestFor": [
      "Money mindset",
      "Lifestyle choices",
      "Personal finance"
    ]
  },
  "The 7 Habits of Highly Effective People": {
    "about": "Stephen Covey presents a principle-centered framework for personal and professional effectiveness. The seven habits move from personal responsibility and goal clarity to prioritization, communication, cooperation and continual renewal. The underlying idea is that lasting effectiveness comes from character, principles and relationships rather than quick productivity tricks.",
    "expect": "Expect a structured framework with exercises and concepts that are meant to be revisited. Some language feels rooted in the business world of its era, but the emphasis on responsibility, priorities, listening and mutually beneficial relationships remains broadly applicable. It is better treated as a system to practice than a book to speed-read.",
    "bestFor": [
      "Personal effectiveness",
      "Leadership",
      "Productivity"
    ]
  },
  "The Power of a Positive Attitude": {
    "about": "Norman Vincent Peale’s classic self-help work argues that attitude strongly shapes how people approach difficulty, opportunity and relationships. Through anecdotes, principles and faith-infused encouragement, Peale promotes optimism, confidence, constructive thinking and belief as tools for handling challenges and pursuing goals.",
    "expect": "Expect an older motivational style with strong Christian and inspirational elements. Some claims are framed more confidently than modern psychology would justify, so the book is best read as motivational philosophy rather than scientific evidence. Its enduring appeal comes from its emphasis on deliberately cultivating a constructive outlook.",
    "bestFor": [
      "Positive thinking",
      "Motivation",
      "Classic self-help"
    ]
  },
  "The Subtle Art of Not Giving a F*ck": {
    "about": "Mark Manson challenges the idea that a good life comes from eliminating negativity and constantly feeling positive. Instead, he argues that life is full of unavoidable problems and that maturity involves choosing which problems are worth caring about. The book explores values, responsibility, failure, uncertainty, mortality and the importance of accepting limits.",
    "expect": "Expect blunt language, humor, personal stories and deliberately provocative arguments. It is less interested in making you feel good than in forcing you to examine what you value and what you are willing to struggle for. Some claims are intentionally simplified for impact, so the book works best as a conversation starter rather than a final word on psychology.",
    "bestFor": [
      "Values",
      "Personal growth",
      "Counterintuitive self-help"
    ]
  },
  "How to Win Friends and Influence People": {
    "about": "Dale Carnegie’s classic focuses on the fundamentals of human relationships: showing genuine interest in others, listening, avoiding unnecessary criticism, remembering names, appreciating people and communicating in ways that preserve dignity. Its larger lesson is that influence is often built through empathy and respect rather than force or argument.",
    "expect": "Expect many anecdotes and principles repeated through memorable examples. Some social advice reflects the era in which Carnegie wrote, but the underlying emphasis on curiosity, tact and making people feel heard remains useful. It is particularly effective when you turn each principle into a behavior to practice in real conversations.",
    "bestFor": [
      "Communication",
      "Relationships",
      "Social skills"
    ]
  },
  "Today's Story of Jesus": {
    "about": "This book presents the story of Jesus in an accessible form, bringing together the major events and teachings of his life while emphasizing their meaning for Christian faith. It is designed less as a technical historical study and more as an approachable introduction to Jesus’ story and message.",
    "expect": "Expect a straightforward Christian narrative that works well for devotional or introductory reading. Because the focus is accessibility, it is not intended to replace a detailed Gospel study. Reading it alongside the biblical accounts can help you compare the retelling with the original sources.",
    "bestFor": [
      "Jesus",
      "Christian reading",
      "Devotional study"
    ]
  }
};

export function getBookGuide(title: string): BookGuide | null {
  return guides[title] ?? null;
}
