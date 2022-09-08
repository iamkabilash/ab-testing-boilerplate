function fetchAssetsReport() {
  fetch("http://localhost:8080/webpack-dev-server")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      document
        .getElementById("c-assets-report")
        .insertAdjacentHTML("afterbegin", data);
    });
}

fetchAssetsReport();
