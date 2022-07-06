const booksList = document.querySelectorAll("#results");
new URLSearchParams(window.location.search).forEach((value, name) => {
  booksList.append(`${name}, ${value}`);
  booksList.append(document.createElement("br"));
});
