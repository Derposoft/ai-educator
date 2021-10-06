The following is an example of a "course generation algorithm".


My simple algorithm is designed with the following tenets in mind:

1. **Learning is interactive.** The algorithm should at the very least receive binary responses on whether or not a user truly understands the material before moving on and serving new material. Optimally, it should give the user the opportunity to expand on specifically what they do not understand, and provide related resources automatically.
2. **Learning must be reinforced.**  Most people can't learn something perfectly on their first try - and even if they do, most people find it hard to retain newly-learned, complicated concepts for a long time. The algorithm should make sure to occasionally drill old concepts back into a user's mind.
3. **Everyone learns differently.** The best algorithm should, over time, learn how a specific user will respond to a learning experience, and provide materials that it knows that the user will respond more positively to. This includes choosing:
- optimal initial course lectures when generating a course to begin with
- optimal supplemental materials when a user doesn't understand something
- optimal interpretation of a user's feedback to provide best suggestions
- essentially any other facet of this problem which requires "choosing" something


The 2 steps of the algorithm (granted, there are some sub-steps) are as follows:
1. **Find Course Backbone (one-time step)**

Start with a YouTube playlist on the topic from a reputable source (e.g. MIT OCW, Stanford, Khan Academy, etc.). These videos will serve as a "backbone" for the learning experience. This is the most efficient way to ensure a cohesive learning experience. However, in the future, the individual videos could potentially be generated using video transcripts or video titles.

2. **Teach (recursive step)**

Begin playing through the course 1 lecture at a time. 

(tenet 1 + tenet 2)
After each lecture, ask the student whether or not they understood the material.
- If they didn't, ask why they didn't and save the response.
  - Understand why they didn't and inject more videos related to their misunderstanding into the material before feeding them the next lecture.
  - Repeat this process of injecting videos until the user understands the content. Save the time it took them to understand the content to determine when to give them a refresher.
- Otherwise continue to the next lecture

***CURRENTLY NOT DONE BUT THINGS WHICH COULD BE ADDED ON***
(tenet 2 + tenet 3)
Before each lecture, feed a transcript for that lecture into a machine that scores the content on its complexity. I will be using a fine-tuned version of BERT to do this (https://arxiv.org/pdf/1905.05583.pdf ?).
- Use the complexity score of the material to determine when the user should see the video again, based on how the user has interacted with material that had similar complexity scores in the past.
