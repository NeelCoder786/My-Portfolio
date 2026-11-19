// 1. Skills Category Filter
const filterButtons = document.querySelectorAll(".pill");
const skillItems = document.querySelectorAll(".skill-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selected = btn.getAttribute("data-filter");

    skillItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      if (selected === "all" || category === selected) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

// 2. Project Case-Study Modal
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalStack = document.getElementById("modalStack");
const modalDetails = document.getElementById("modalDetails");
const closeModalBtn = document.getElementById("closeModal");

document.querySelectorAll(".open-modal").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    modalTitle.textContent = trigger.getAttribute("data-title");
    modalStack.textContent = trigger.getAttribute("data-stack");
    modalDetails.textContent = trigger.getAttribute("data-details");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});

// 3. One-Click Email Copy
const copyEmailBtn = document.getElementById("copyEmailBtn");

copyEmailBtn.addEventListener("click", () => {
  const email = copyEmailBtn.getAttribute("data-email");
  navigator.clipboard.writeText(email).then(() => {
    const original = copyEmailBtn.textContent;
    copyEmailBtn.textContent = "Copied to Clipboard!";
    setTimeout(() => {
      copyEmailBtn.textContent = original;
    }, 2000);
  });
});
