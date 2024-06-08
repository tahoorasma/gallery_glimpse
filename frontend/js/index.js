const addBtn = document.querySelector('#signup-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#signup-name');
    const pwInput = document.querySelector('#signup-password');
    const name = nameInput.value;
    const password = pwInput.value;

    fetch('http://localhost:5500/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username : name, password : password }) 
    })
    .then(response => response.json());
}
