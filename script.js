// Criar estrelinhas no fundo
for (let i = 0; i < 40; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.top = Math.random() * 100 + "vh";
  star.style.left = Math.random() * 100 + "vw";
  star.style.animationDuration = (2 + Math.random() * 3) + "s";
  document.body.appendChild(star);
}

let cart = [];

// Adicionar item ao carrinho
function addToCart(item, sizeValue) {
  const [size, price] = sizeValue.split("-");
  cart.push({ item, size, price: parseFloat(price) });
  updateCart();
}

// Atualizar carrinho
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((c, i) => {
    total += c.price;
    const li = document.createElement("li");
    li.textContent = `${c.item} (${c.size}) - R$${c.price}`;
    cartItems.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

// Gerar Nota Fiscal
function generateNF() {
  if (cart.length === 0) return alert("Carrinho vazio!");
  let nf = "Nota Fiscal - Doçura & Encanto\n\n";
  let subtotal = 0;
  cart.forEach((c, i) => {
    nf += `${c.item} (${c.size}) - R$${c.price}\n`;
    subtotal += c.price;
  });
  nf += `\nSubtotal: R$${subtotal}\nTotal: R$${subtotal}`;
  document.getElementById("nf-box").style.display = "block";
  document.getElementById("nf-box").textContent = nf;
  document.getElementById("copyBtn").style.display = "block";
}

// Copiar NF e abrir WhatsApp
function copyNF() {
  const nfText = document.getElementById("nf-box").textContent;
  navigator.clipboard.writeText(nfText).then(() => {
    window.open("https://wa.me/5571984787255?text=" + encodeURIComponent(nfText), "_blank");
  });
}
