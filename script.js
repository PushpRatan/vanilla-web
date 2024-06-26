(function () {
  const htmlElement = document.documentElement;
  const previewFrame = document.getElementsByClassName("preview-frame")[0];
  const sidetabActions = document.getElementsByClassName("side-tab-action");
  const spinnerElement =
    document.getElementsByClassName("spinner-container")[0];
  let lastActiveTab = sidetabActions[0];

  function showSpinner() {
    previewFrame.classList.remove("show");
    previewFrame.classList.add("hide");

    spinnerElement.classList.remove("hide");
    spinnerElement.classList.add("show");
  }

  function hideSpinner() {
    spinnerElement.classList.remove("show");
    spinnerElement.classList.add("hide");

    previewFrame.classList.remove("hide");
    previewFrame.classList.add("show");
  }

  [...sidetabActions].forEach((sidetabAction) => {
    function handleAnchorClick(event) {
      lastActiveTab.classList.remove("active-tab");
      lastActiveTab = event.target;
      lastActiveTab.classList.add("active-tab");

      showSpinner();
      function handleFrameLoad() {
        hideSpinner();
        previewFrame.removeEventListener("load", handleFrameLoad);
      }

      const href = sidetabAction.dataset.href;
      previewFrame.src = href;
      previewFrame.addEventListener("load", handleFrameLoad);
    }

    sidetabAction.addEventListener("click", handleAnchorClick);
  });

  // theme initially as system
  const theme = matchMedia("(prefers-color-scheme: dark)");
  if (theme.matches) {
    htmlElement.setAttribute("data-theme", "dark");
  }
})();
