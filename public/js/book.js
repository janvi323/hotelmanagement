document.addEventListener('DOMContentLoaded', function () {
    const checkinVal = document.getElementById("checkinDateVal")?.value;
    const checkoutVal = document.getElementById("checkoutDateVal")?.value;
    const priceVal = parseInt(document.getElementById("pricePerNightVal")?.value || 10000);
  
    if (!checkinVal || !checkoutVal) {
      console.warn("❌ Missing check-in or check-out date.");
      return;
    }
  
    const checkin = new Date(checkinVal);
    const checkout = new Date(checkoutVal);
  
    const nights = Math.round((checkout - checkin) / (1000 * 60 * 60 * 24));
    if (nights > 0) {
      document.getElementById("nights").textContent = nights;
      const total = nights * priceVal;
      document.getElementById("totalPrice").textContent = total.toLocaleString("en-IN");
  
      document.getElementById("nightsInput").value = nights;
      document.getElementById("totalPriceInput").value = total;
    } else {
      console.warn("⚠️ Invalid number of nights calculated");
    }
  });
  