fetch("data/datasets.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("dataset-grid");

    data.forEach(d => {
      const card = document.createElement("div");
      card.className = "dataset-card";

      card.innerHTML = `
        <h3>${d.name}</h3>
        <p>${d.description}</p>
        <small>Mach: ${d.mach} | Re: ${d.reynolds}</small>
      `;

      grid.appendChild(card);
    });
  });
