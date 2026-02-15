---
title: "Dancefest2025"
description: "Lorem ipsum dolor sit amet"
pubDate: "Feb 14 2025"
heroImage: "/DF25_TRYBE.png"
---

Student-driven dance show featuring 29 pieces and 5 student dance groups.

<style>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
}

.video-wrapper iframe {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Stack on small screens */
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="video-grid">
  <div class="video-wrapper">
    <iframe 
      src="https://www.youtube.com/embed/lSXgieBMgM8?si=2lEgT4PXkmDZSdnT"
      title="Video 1"
      allowfullscreen>
    </iframe>
  </div>

  <div class="video-wrapper">
    <iframe 
      src="https://www.youtube.com/embed/oktjYAuDR0U?si=eRm2fDVpdv0GcOGf"
      title="Flamenco"
      allowfullscreen>
    </iframe>
  </div> 
  
  <div class="video-wrapper">
    <iframe 
      src="https://www.youtube.com/embed/yNOUVHYGqLA?si=tkCGr4uCdVYqAF8U"
      title="Imitadora"
      allowfullscreen>
    </iframe>
  </div>

  <div class="video-wrapper">
    <iframe 
      src="https://www.youtube.com/embed/wvZboCIzZFs?si=H9P2evjqHMPvYif2"
      title="Pompeii"
      allowfullscreen>
    </iframe>
  </div>
  
</div>
