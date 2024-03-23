document.addEventListener("DOMContentLoaded", function() {
    const userDataContainer = document.getElementById('userData');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const lastRequestTime = localStorage.getItem('lastRequestTime');
  
    if (userData && lastRequestTime && (Date.now() - lastRequestTime < 60000)) {
      
      showUserData(userData);
    } else {
      
      fetchDataFromServer();
    }
  
    function fetchDataFromServer() {
      fetch('https://reqres.in/api/users?delay=3')
        .then(response => response.json())
        .then(data => {
         
          localStorage.setItem('userData', JSON.stringify(data.data));
          localStorage.setItem('lastRequestTime', Date.now());
  
      
          showUserData(data.data);
        })
        .catch(error => console.error('Error fetching data from server:', error));
    }
  
    function showUserData(usersData) {
     
      const table = document.createElement('table');
      table.classList.add('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');
  
      
      const headerRow = document.createElement('tr');
      ['id', 'first_name', 'last_name', 'email', 'avatar'].forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.toUpperCase();
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      
      usersData.forEach(user => {
        const tr = document.createElement('tr');
        ['id', 'first_name', 'last_name', 'email', 'avatar'].forEach(key => {
          const td = document.createElement('td');
          if (key === 'avatar') {
           
            const img = document.createElement('img');
            img.src = user[key];
            img.classList.add('avatar-image'); 
            td.appendChild(img);
          } else {
            td.textContent = user[key];
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
  
      table.appendChild(tbody);
      userDataContainer.appendChild(table);
    }
  });
  
  

  