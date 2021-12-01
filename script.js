const items = document.querySelectorAll(".item-pergunta button");

function toggleFAQ() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  items.forEach(item => item.setAttribute('aria-expanded', 'false'))
  
  if (itemToggle == 'false') this.setAttribute('aria-expanded', 'true');
}

items.forEach(item => item.addEventListener('click', toggleFAQ));