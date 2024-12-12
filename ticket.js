// Handle Booking Form Submission
document.querySelector("#bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form default submission behavior

  // Collect form data
  const formData = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#emailInput").value,
    phone: document.querySelector("#phoneInput").value,
  };

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `${formData.firstName} ${formData.lastName}`,
        body: `Email: ${formData.email}\nPhone: ${formData.phone}`,
        userId: 1,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Response from JSONPlaceholder:", result);

      // Notify user of success
      alert("Form submitted successfully! Post ID: " + result.id);

      // Reset the form
      document.querySelector("#bookingForm").reset();
    } else {
      alert("Error submitting the form. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
});

// Handle Product Form Total Calculation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const checkboxes = form.querySelectorAll("input[type='checkbox']");
  const totalAmount = document.getElementById("totalAmount");

  function updateTotal() {
    let total = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        // Find the associated product container
        const product = checkbox.closest(".product");
        const price = parseFloat(product.querySelector(".price").textContent.replace("$", ""));
        const quantity = parseInt(product.querySelector("select").value, 10);
        total += price * quantity;
      }
    });

    totalAmount.textContent = total.toFixed(2);
  }

  // Event listeners for checkboxes and quantity dropdowns
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateTotal); // Trigger calculation on checkbox click
  });

  form.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", updateTotal); // Update total if quantity changes
  });
});
