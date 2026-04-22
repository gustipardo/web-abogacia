SEO for LLMs
How Large Language Models Discover, Cite, and Recommend Content
A practical guide based on research, experiments, and real-world cases

1. The Two Ways LLMs Can Recommend You
When an LLM like ChatGPT, Gemini, or Perplexity recommends a product, a company, or a piece of content, it does so through one of two mechanisms:

1. Training data (parametric memory):
This is knowledge baked into the model's weights during training. It is slow to change — influencing it takes months or years, as it requires appearing in the data used to retrain the model.

2. RAG / Web search (retrieval):
The LLM searches the web in real time and summarizes what it finds. This is what ChatGPT with search, Perplexity, Claude, and Gemini do when they browse live. This mechanism is much faster to influence — sometimes within hours.

💡 The RAG/web search mechanism is the most actionable for businesses today. A well-placed piece of content can be picked up and cited by an LLM within 24 hours of being indexed.

2. The Hotdog Experiment — How Easy Is It to Manipulate an LLM?
Q: Where exactly did journalist Thomas Germain publish his post? Was it on the official BBC site, Wikipedia, Reddit? How did a single blog post get the LLM to recommend him?
Where Germain Published
Germain published on his personal website — tomgermain.com — not on BBC.com. It was a single blog post titled "The best tech journalists at eating hot dogs," written in just 20 minutes. No Wikipedia entry, no Reddit post, no official media platform. Just his own personal site.
Why It Worked
The key insight is that this has more to do with search engine crawling than with the AI model itself. The LLM executes a web search the same way a user would. If an article shows up in the first few results for a very specific query, the LLM will find it and cite it.

The trick was targeting a niche query with zero competition. Nobody had ever written about "best tech journalists at eating hotdogs" — so his single post became the only source on the entire internet, and LLMs cited it as truth. Gemini couldn't even tell users where it got its information. The other AIs linked to his article but rarely mentioned he was the only source.

💡 The success of this kind of manipulation depends entirely on traditional SEO techniques. If your article doesn't appear in the first few search results for a query, neither the user nor the LLM will find it.
Which LLMs Were Fooled?
Google's Gemini, AI Overviews, and ChatGPT all repeated his false claims as fact within 24 hours. Anthropic's Claude was not fooled. Because chatbots occasionally noted the claims might be a joke, Germain updated his post to say "this is not satire" — which caused the other models to take it more seriously.

3. Community Platforms — Reddit, Quora, Wikipedia
Q: If someone makes sure their product is mentioned in Wikipedia, Reddit, or Quora — but doesn't worry about people visiting or commenting on the post — is it still effective? Or is engagement required?
Yes, mentions on these platforms still help — even with zero engagement — but with important nuances depending on which mechanism is at play.

The value of platforms like Reddit, Quora, and Wikipedia isn't the comments or votes. It's that they are heavily crawled and trusted by default. LLMs were trained on massive amounts of content from these sources, so mentions there carry implicit authority weight.

Mechanism
Does engagement matter?
What matters most
Training data (parametric memory)
No — just needs to exist and be crawled
Existence on trusted, high-authority platforms
RAG / Real-time web search
Yes — upvotes help the post rank higher in search
Search ranking of the post at the time of query


💡 Posts without engagement are better than nothing. But engagement amplifies reach significantly for real-time AI search, because it drives search ranking which determines what the LLM's web search retrieves.

4. Social Platforms — Instagram, TikTok, YouTube
Q: Are social platforms that don't index on Search Engines useless for LLM visibility? Like Instagram or TikTok?
Instagram and TikTok — Mostly Limited
For current LLM visibility, Instagram and TikTok offer limited direct value:
Their content is not indexed by Google or Bing, so LLMs doing real-time web search can't retrieve it
Content lives behind login walls or app-only environments
LLMs were not trained directly on Instagram or TikTok posts

However, they still help indirectly — brand awareness on these platforms drives people to search for your product elsewhere, generating mentions in blogs, Reddit threads, and reviews that are indexed. Instagram posts that are opted into indexing (as of mid-2025) can also contribute if properly tagged with captions and alt text.
YouTube — A Special Case
YouTube is indexed and cited frequently by LLMs, making it one of the more valuable platforms. However, LLMs cannot watch videos — they read text. What they actually process is:
The video title and description
The transcript / captions (if available as plain text)
External mentions of the video in blogs and articles

If instructed to do so, most LLMs can fetch a YouTube transcript from a public URL and summarize it. But during automatic web search, they won't spontaneously go deep into a video — they rely on the surrounding text. YouTube's terms of service also prohibit bulk scraping, so transcripts are not part of LLMs' general training data at scale.

Platform
Indexed by Google?
Useful for LLM visibility?
Personal blog / website
✅ Yes
✅ High — as Germain proved
Reddit / Quora
✅ Yes
✅ High
Wikipedia
✅ Yes
✅ Very high
YouTube
✅ Yes
✅ High (via transcripts & metadata)
LinkedIn articles
✅ Yes
🟡 Medium
Instagram (opted in)
⚠️ Partially
🟡 Growing
TikTok
❌ No
❌ Low


5. Language and LLM Search — A Hidden Bias
Q: If I search in Spanish — 'El mejor periodista comiendo Hot Dogs del mundo' — will the Search Engine show Thomas Germain's English post? Will the LLM use it? Does the LLM search the web in the same language as the user's query?
The LLM Does NOT Search in the Same Language You Asked
This is one of the most important and underappreciated dynamics in LLM optimization. When users ask questions in Spanish, German, Polish, or any other language, ChatGPT conducts its background research and nearly half of it happens in English — even when the original question wasn't in English.

ChatGPT uses a dual-query approach: when a user asks in their native language, it queries the web twice — once in English and once in the user's language.

💡 The LLM separates two operations: (1) searching the web, which may happen in English or both languages; and (2) answering the user, which always happens in the language they used to ask.
What This Means for the Hotdog Example
If a Spanish speaker asks "El mejor periodista comiendo Hot Dogs del mundo," ChatGPT would search in both Spanish and English behind the scenes. Thomas Germain's English post at tomgermain.com could absolutely surface and be cited — and the answer would be delivered to the user in Spanish, even though the source was in English.
Does Spanish Content Get Disadvantaged?
Yes, significantly. Research confirmed this at scale: when a Spanish user asks about Spanish companies, ChatGPT was recommending international brands — not a single local brand appeared — because it primarily searches English sources. The same pattern occurred for Polish, French, and German users.

Across 1.3 million citations analyzed, the finding was consistent: untranslated websites are essentially invisible to AI search in languages they don't support. One company that had its site interface translated to German but kept its blog in English saw 41 citations in English queries but only 8 in German — with zero blog articles appearing in German results at all.

Situation
What happens
You ask in Spanish, content only in English
LLM may still find and cite it, then answer in Spanish
You ask in Spanish, content in both languages
The Spanish version is strongly preferred and cited
You ask in Spanish, content only in Spanish
Surfaces for Spanish queries but invisible to English queries
You ask in Spanish, no content exists anywhere
LLM may hallucinate or say it doesn't know


6. Building a Bilingual Strategy for LLM Visibility
Q: Does this mean that even if I'm selling to Spanish-only speakers, I should create content in both Spanish and English? How should that be done in practice for a consulting company? Should I post on Reddit in both languages? Should the blog be bilingual? Which technical framework is best?
Yes — Publish in Both Languages
Your instinct is correct. Research analyzing 1.3 million AI-generated citations found that translated websites can gain up to 327% more visibility in AI search for queries made in languages they didn't originally serve. Untranslated sites were almost invisible when users searched in another language.

For a consulting company targeting Spanish speakers: having English content alone means only capturing the fraction of ChatGPT's searches that happen in English. With both languages, you capture both passes.
Localization, Not Just Translation
This distinction is critical. Do not assume that a direct translation of your English keywords is sufficient. People often use completely different phrases to search for the same concept in different languages.

For Spanish specifically: a person in Spain says "ordenador" while someone in Mexico says "computadora." For a consulting company, terms like "consultoría estratégica" vs "asesoría empresarial" carry different intent and volume depending on the country. Research keywords in each target market separately.
Blog Structure That Works Best for LLM Citation
Bilingual blog posts are the highest-leverage move. Structure your content for atomic clarity — sentences under 25 words that AI can extract and cite directly:
Use question-style H2/H3 headers (e.g., "¿Cuál es la mejor consultora para startups en Argentina?")
Provide a direct answer in the first sentence under each header
Implement FAQ schema markup
Host both language versions at separate URLs with proper hreflang tags linking them
Keep paragraphs short — 2 to 3 sentences maximum per idea
Reddit and Quora — Yes, Both Languages
Reddit is worth the effort in both English and Spanish. For English: subreddits like r/consulting, r/smallbusiness, r/startups. For Spanish: r/es, r/espanol, country-specific subreddits. Quora has a solid Spanish-language section as well.

Focus on genuinely helpful, specific answers — not promotional content. Even zero-engagement posts can be indexed and cited, but authentically useful posts that get upvoted carry significantly more weight for real-time LLM search.
The Non-Negotiable Technical Implementation: Hreflang Tags
Regardless of which framework you choose, hreflang tags are mandatory. These HTML signals tell both Google and LLM crawlers that your Spanish page and your English page are equivalent versions of the same content. Without them, search engines and AIs may treat the two versions as duplicate content and penalize you, or simply not connect them.

<link rel="alternate" hreflang="en" href="https://yoursite.com/en/consulting" />
<link rel="alternate" hreflang="es" href="https://yoursite.com/es/consultoria" />
Framework Recommendation
For a consulting company blog or website, the choice depends on your technical capacity:

Astro — If you have a developer (or want to DIY):
Astro is the standout choice for multilingual content sites. It manages bilingual content with type safety, catches broken translations at build time, and makes hreflang implementation cleaner than any other framework. A real example: 136 pages (68 English + 68 Romanian) built in under 30 seconds, with Lighthouse performance scores consistently 95–100. LLM crawlers love Astro because it outputs pure static HTML with zero JavaScript — they can read every word without executing code.

WordPress — If you want no-code / low-code:
WordPress with the WPML or Polylang plugin handles bilingual sites well and has been doing multilingual SEO correctly for years. It automates hreflang tags and metadata. Always do manual spot checks to verify the implementation is correct.
Three-Layer Action Plan for a Consulting Company

Layer 1 — Your own site (highest impact)
Bilingual blog with proper hreflang, FAQ-structured posts answering the exact questions your clients ask in both languages, schema markup, and plain crawlable HTML. This is the foundation everything else builds on.

Layer 2 — Indexed community platforms
Answer questions on Reddit and Quora in both English and Spanish. Focus on genuinely helpful, specific answers — not promotional content. LLMs cite these platforms heavily.

Layer 3 — Third-party mentions
Get listed on directories (Clutch, G2, GoodFirms) and aim to get mentioned in industry articles in both languages. Even a single mention in a well-ranked English article can make you visible to Spanish speakers asking ChatGPT, due to the dual-search behavior described in Section 5.

💡 The biggest mistake to avoid: partial translation. Translating your site interface but keeping the blog in English gives you almost no benefit for non-English LLM queries. The content you don't translate becomes the content AI can't cite.


SEO for LLMs — A Practical Guide
