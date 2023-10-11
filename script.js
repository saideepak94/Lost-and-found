document.addEventListener('DOMContentLoaded', () => {
    const lostItemForm = document.getElementById('lostItemForm');
    const lostItemsList = document.getElementById('lostItemsList');
  
    lostItemForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const itemName = document.getElementById('itemName').value;
      const description = document.getElementById('description').value;
      const contactInfo = document.getElementById('contactInfo').value;
      const image = document.getElementById('image').files[0];
  
      const formData = new FormData();
      formData.append('itemName', itemName);
      formData.append('description', description);
      formData.append('contactInfo', contactInfo);
      formData.append('image', image);
  
      fetch('/addLostItem', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        lostItemForm.reset();
        fetchLostItems();
      });
    });
  
    function fetchLostItems() {
      fetch('/getLostItems')
      .then(response => response.json())
      .then(items => {
        const itemsHTML = items.map(item => `
          <div>
            <h3>${item.itemName}</h3>
            <p>${item.description}</p>
            <p>Contact: ${item.contactInfo}</p>
            ${item.imagePath ? `<img src="${item.imagePath}" alt="Lost Item">` : ''}
          </div>
        `).join('');
        lostItemsList.innerHTML = itemsHTML;
      });
    }
  
    // Fetch initial lost items
    fetchLostItems();
  });
  

  


 
