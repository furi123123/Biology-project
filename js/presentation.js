// Presentation Deck Controller with Fullscreen, Keyboard Shortcuts, and Custom Embed Mode
import { initialSlides } from "./slides-data.js";

export class PresentationDeck {
  constructor() {
    this.slides = [...initialSlides];
    this.currentIndex = 0;
    this.isEmbedMode = false;
    this.embedUrl = "";

    // DOM Elements
    this.deckContainer = document.getElementById("presentation-deck");
    this.slideStage = document.getElementById("slide-stage");
    this.slideContent = document.getElementById("slide-content");
    this.slideTag = document.getElementById("slide-tag");
    this.slideTitle = document.getElementById("slide-title");
    this.slideSubtitle = document.getElementById("slide-subtitle");
    this.slideBullets = document.getElementById("slide-bullets");
    this.slideHighlight = document.getElementById("slide-highlight");
    this.slideIndicator = document.getElementById("slide-indicator");
    this.progressBar = document.getElementById("slide-progress-fill");
    this.notesDrawer = document.getElementById("speaker-notes-drawer");
    this.notesText = document.getElementById("speaker-notes-text");
    this.embedWrapper = document.getElementById("embed-frame-wrapper");
    this.embedIframe = document.getElementById("embed-iframe");

    // Buttons
    this.btnPrev = document.getElementById("btn-prev-slide");
    this.btnNext = document.getElementById("btn-next-slide");
    this.btnFullscreen = document.getElementById("btn-fullscreen");
    this.btnNotes = document.getElementById("btn-toggle-notes");
    this.btnCustomize = document.getElementById("btn-customize-deck");

    // Modal elements
    this.customModal = document.getElementById("deck-custom-modal");
    this.btnCloseModal = document.getElementById("btn-close-modal");
    this.btnSaveCustom = document.getElementById("btn-save-custom");
    this.inputEmbedUrl = document.getElementById("input-embed-url");
    this.radioBuiltIn = document.getElementById("radio-mode-builtin");
    this.radioEmbed = document.getElementById("radio-mode-embed");

    this.init();
  }

  init() {
    // Load persisted custom presentation preferences if available
    const savedEmbed = localStorage.getItem("bio_deck_embed_url");
    const savedMode = localStorage.getItem("bio_deck_mode");
    if (savedEmbed) {
      this.embedUrl = savedEmbed;
      if (this.inputEmbedUrl) this.inputEmbedUrl.value = savedEmbed;
    }
    if (savedMode === "embed" && savedEmbed) {
      this.setEmbedMode(true);
    } else {
      this.setEmbedMode(false);
      this.renderSlide(this.currentIndex);
    }

    this.bindEvents();
  }

  bindEvents() {
    // Nav buttons
    this.btnPrev?.addEventListener("click", () => this.prevSlide());
    this.btnNext?.addEventListener("click", () => this.nextSlide());

    // Fullscreen toggle
    this.btnFullscreen?.addEventListener("click", () => this.toggleFullscreen());

    // Speaker notes toggle
    this.btnNotes?.addEventListener("click", () => this.toggleNotes());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      // Ignore keystrokes when typing into input fields
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        this.toggleNotes();
      }
    });

    // Fullscreen state listener
    document.addEventListener("fullscreenchange", () => {
      const isFs = !!document.fullscreenElement;
      if (this.deckContainer) {
        this.deckContainer.classList.toggle("is-fullscreen", isFs);
      }
      if (this.btnFullscreen) {
        this.btnFullscreen.innerHTML = isFs
          ? `<i data-lucide="minimize"></i><span>Exit Fullscreen</span>`
          : `<i data-lucide="maximize"></i><span>Fullscreen (F)</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    });

    // Customizer Modal
    this.btnCustomize?.addEventListener("click", () => this.openModal());
    this.btnCloseModal?.addEventListener("click", () => this.closeModal());
    this.btnSaveCustom?.addEventListener("click", () => this.saveCustomSettings());
  }

  renderSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    this.currentIndex = index;
    const slide = this.slides[index];

    // Trigger re-animation
    this.slideContent.style.animation = "none";
    this.slideContent.offsetHeight; // trigger reflow
    this.slideContent.style.animation = "slideFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)";

    // Update texts
    this.slideTag.textContent = slide.tag;
    this.slideTitle.textContent = slide.title;
    this.slideSubtitle.textContent = slide.subtitle;

    // Bullets
    this.slideBullets.innerHTML = "";
    slide.bullets.forEach((bullet) => {
      const li = document.createElement("li");
      li.className = "slide-bullet-item";
      li.innerHTML = `
        <span class="bullet-icon">✦</span>
        <span>${bullet}</span>
      `;
      this.slideBullets.appendChild(li);
    });

    // Highlight Box
    if (slide.highlightBox) {
      this.slideHighlight.style.display = "block";
      this.slideHighlight.innerHTML = `
        <div class="slide-highlight-title">${slide.highlightBox.title}</div>
        <div class="slide-highlight-text">${slide.highlightBox.text}</div>
      `;
    } else {
      this.slideHighlight.style.display = "none";
    }

    // Indicator & Progress Bar
    this.slideIndicator.textContent = `Slide ${index + 1} of ${this.slides.length}`;
    const progressPercent = ((index + 1) / this.slides.length) * 100;
    this.progressBar.style.width = `${progressPercent}%`;

    // Speaker notes
    if (this.notesText) {
      this.notesText.textContent = slide.speakerNotes || "No speaker notes for this slide.";
    }

    // Refresh icons if needed
    if (window.lucide) window.lucide.createIcons();
  }

  nextSlide() {
    if (this.isEmbedMode) return;
    if (this.currentIndex < this.slides.length - 1) {
      this.renderSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (this.isEmbedMode) return;
    if (this.currentIndex > 0) {
      this.renderSlide(this.currentIndex - 1);
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.deckContainer.requestFullscreen) {
        this.deckContainer.requestFullscreen().catch(err => {
          console.warn("Fullscreen request failed:", err);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  toggleNotes() {
    if (!this.notesDrawer) return;
    this.notesDrawer.classList.toggle("open");
  }

  setEmbedMode(enabled) {
    this.isEmbedMode = enabled;
    if (enabled && this.embedUrl) {
      this.embedWrapper.classList.add("active");
      this.embedIframe.src = this.embedUrl;
      this.slideContent.style.display = "none";
      this.slideIndicator.textContent = "Embedded Presentation";
    } else {
      this.embedWrapper.classList.remove("active");
      this.embedIframe.src = "";
      this.slideContent.style.display = "block";
      this.renderSlide(this.currentIndex);
    }
  }

  openModal() {
    if (this.customModal) {
      this.customModal.classList.add("open");
      if (this.isEmbedMode && this.radioEmbed) {
        this.radioEmbed.checked = true;
      } else if (this.radioBuiltIn) {
        this.radioBuiltIn.checked = true;
      }
    }
  }

  closeModal() {
    if (this.customModal) {
      this.customModal.classList.remove("open");
    }
  }

  saveCustomSettings() {
    const isEmbed = this.radioEmbed?.checked;
    const url = this.inputEmbedUrl?.value.trim() || "";

    if (isEmbed && url) {
      this.embedUrl = url;
      localStorage.setItem("bio_deck_embed_url", url);
      localStorage.setItem("bio_deck_mode", "embed");
      this.setEmbedMode(true);
    } else {
      localStorage.setItem("bio_deck_mode", "builtin");
      this.setEmbedMode(false);
    }

    this.closeModal();
  }
}
