var desusify = (
  function() {
    if (document
        .getElementById("title")
        .innerHTML == "Incremental Adventure") {
      document
        .getElementById("title")
        .innerHTML = "Art Project";
    } else {
      document
        .getElementById("title")
        .innerHTML = "Incremental Adventure";
    }
  }
)
