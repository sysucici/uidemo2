gsap.registerPlugin(ScrollTrigger)

function initHeroEntrance(containerSelector, itemSelector) {
  gsap.from(itemSelector || `${containerSelector} > *`, {
    y: 32,
    opacity: 0,
    filter: "blur(6px)",
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
    clearProps: "filter",
  })
}

function initParallax(layers) {
  layers.forEach(({ selector, speed }) => {
    gsap.to(selector, {
      y: () => window.innerHeight * (speed - 1) * -0.4,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: speed,
      },
    })
  })
}

function initMagneticPill(pillSelector, radius, strength) {
  radius = radius || 120
  strength = strength || 0.28
  const pill = document.querySelector(pillSelector)
  if (!pill) return

  document.addEventListener("mousemove", (e) => {
    const r = pill.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)

    if (dist < radius) {
      const pull = 1 - dist / radius
      gsap.to(pill, { x: dx * pull * strength, y: dy * pull * strength, duration: 0.4, ease: "power2.out" })
    } else {
      gsap.to(pill, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" })
    }
  })
}

function initSplitNav() {
  const nav = document.querySelector(".split-nav")
  if (!nav) return
  let isCompressed = false
  ScrollTrigger.create({
    start: "top top",
    end: "+=120",
    onUpdate: (self) => {
      if (self.progress > 0.5 && !isCompressed) {
        nav.classList.add("nav-compressed")
        isCompressed = true
      } else if (self.progress <= 0.5 && isCompressed) {
        nav.classList.remove("nav-compressed")
        isCompressed = false
      }
    },
  })
}

function initTimeline() {
  const items = document.querySelectorAll(".js-timeline-item")
  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 80%",
      onEnter: () => item.classList.add("is-visible"),
    })
  })

  const progress = document.querySelector(".js-timeline-progress")
  if (progress) {
    gsap.to(progress, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".variant-c-section",
        start: "top 60%",
        end: "bottom 60%",
        scrub: true,
      },
    })
  }
}

function initPricingToggle() {
  const toggle = document.querySelector(".js-billing-toggle")
  if (!toggle) return
  const buttons = toggle.querySelectorAll(".billing-toggle-btn")
  const prices = document.querySelectorAll(".price-amount")
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      const target = btn.getAttribute("data-target")
      toggle.setAttribute("data-billing", target)
      prices.forEach((p) => {
        const value = p.getAttribute(target === "annual" ? "data-annual" : "data-monthly")
        p.textContent = value
      })
    })
  })
}

function initTestimonialsGlow() {
  const cards = document.querySelectorAll(".testimonial-card")
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
    })
  })
}

function initFAQ() {
  const items = document.querySelectorAll(".js-faq-item")
  items.forEach((item) => {
    const trigger = item.querySelector(".v-a-trigger")
    trigger.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true"
      item.setAttribute("data-open", isOpen ? "false" : "true")
      trigger.setAttribute("aria-expanded", isOpen ? "false" : "true")
    })
  })
}

function initUploadModal() {
  const dropzone = document.querySelector(".js-dropzone")
  const input = document.querySelector("#file-input")
  const closeBtn = document.querySelector(".upload-close")
  const modal = document.querySelector(".upload-modal")
  const pickBtn = document.querySelector(".drop-btn")

  if (!dropzone || !input || !modal) return

  const prevent = (e) => { e.preventDefault(); e.stopPropagation() }

  ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, prevent, false)
  })

  dropzone.addEventListener("dragenter", () => dropzone.classList.add("dragging"))
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragging"))
  dropzone.addEventListener("drop", (e) => {
    dropzone.classList.remove("dragging")
    const files = e.dataTransfer.files
    if (files && files[0]) {
      input.files = files
    }
  })

  dropzone.addEventListener("click", () => input.click())
  pickBtn.addEventListener("click", (e) => { e.stopPropagation(); input.click() })

  closeBtn.addEventListener("click", () => {
    modal.style.opacity = "0"
    modal.style.transform = "translateY(12px)"
    setTimeout(() => { modal.style.display = "none" }, 300)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroEntrance(".hero-b__left", ".hero-b__left > *")
  initParallax([
    { selector: ".hero-glow", speed: 0.7 },
    { selector: ".upload-modal", speed: 1.1 },
  ])
  initMagneticPill(".js-magnetic")
  initSplitNav()
  initTimeline()
  initPricingToggle()
  initTestimonialsGlow()
  initFAQ()
  initUploadModal()

  document.fonts.ready.then(() => ScrollTrigger.refresh())
})
