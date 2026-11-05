(() => {
  const config = window.RESERVAFACIL_CONFIG || {};
  const form = document.getElementById("quoteForm");
  const message = document.getElementById("formMessage");
  const dateInput = document.getElementById("visitDate");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  document.getElementById("year").textContent = new Date().getFullYear();
  dateInput.min = new Date().toISOString().slice(0, 10);

  const waNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  const waReady = waNumber.length >= 10 && waNumber !== "573001234567";
  const waUrl = waReady
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent("Hola, quisiera información sobre " + (config.businessName || "la finca") + ".")}`
    : "#";
  document.getElementById("floatingWhatsApp").href = waUrl;
  document.getElementById("floatingWhatsApp").addEventListener("click", (event) => {
    if (!waReady) {
      event.preventDefault();
      alert("Configura primero el número real de WhatsApp en config.js.");
    }
  });

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      business: config.businessName || "Finca",
      name: data.name.trim(),
      date: data.date,
      people: data.people,
      eventType: data.eventType,
      phone: data.phone.trim(),
      notes: (data.notes || "").trim(),
      createdAt: new Date().toISOString()
    };

    // Registro opcional en Google Sheets. Si no se configura endpoint, continúa con WhatsApp.
    if (config.googleSheetsEndpoint) {
      try {
        await fetch(config.googleSheetsEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.warn("No fue posible enviar el registro a Sheets:", error);
      }
    }

    const text = [
      `Hola, quiero cotizar una visita a ${payload.business}.`,
      `Nombre: ${payload.name}`,
      `Fecha tentativa: ${payload.date}`,
      `Personas: ${payload.people}`,
      `Tipo de visita: ${payload.eventType}`,
      `Teléfono: ${payload.phone}`,
      payload.notes ? `Detalles: ${payload.notes}` : ""
    ].filter(Boolean).join("\n");

    if (!waReady) {
      message.textContent = "Demostración: configura el WhatsApp real en config.js para habilitar el envío.";
      return;
    }
    message.textContent = "Abriendo WhatsApp con tu solicitud. Revisa el mensaje y pulsa Enviar.";
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
})();
