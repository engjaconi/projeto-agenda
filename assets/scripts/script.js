const localStorage = window.localStorage;
const tableBody = document.querySelector('tbody');
const formAddContact = document.querySelector('#registration');
const formSearch = document.querySelector('#search');

formAddContact.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = document.querySelector('input#name');
    let tel = document.querySelector('input#tel');
    let email = document.querySelector('input#email');
    let address = document.querySelector('input#address');

    let contact = {
        name: name.value,
        tel: tel.value,
        email: email.value,
        address: address.value
    };

    addContact(contact);
    window.location.href = './index.html';
});

function addContact(contact) {
    if (!localStorage.getItem('schedule')) {
        let schedule = [contact];
        localStorage.setItem('schedule', JSON.stringify(schedule));
    } else {
        let schedule = JSON.parse(localStorage.getItem('schedule'));
        schedule.push(contact);
        localStorage.setItem('schedule', JSON.stringify(schedule));
    }

}

formSearch.addEventListener('submit', (event) => {
    event.preventDefault();

    let search = document.querySelector('#input__search');
    searchContact(search.value);
});

function searchContact(search) {
    populateTable();
    if (!tableBody.hasChildNodes()) {
        alert('Não há contatos salvos para serem pesquisados. Adicione um contato!');
        return;
    } else {
        let tr = document.querySelectorAll('tr');
        tr.forEach(item => {
            let find = false;

            for (let i = 0; i < item.children.length; i++) {
                if ((item.children[i].innerText == search) || (item.children[i].innerText == 'Nome')) {
                    find = true;
                }
            }

            if (!find) {
                item.style.display = 'none'
            }
        });
    }
}

function populateTable() {
    if (tableBody) {
        for (let i = tableBody.children.length - 1; i >= 0; i--) {
            tableBody.deleteRow(i);
        }
    }

    if (localStorage.getItem('schedule')) {
        let myContacts = JSON.parse(localStorage.getItem('schedule'));

        for (let i = 0; i < myContacts.length; i++) {
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdTel = document.createElement('td');
            let tdEmail = document.createElement('td');
            let tdAddress = document.createElement('td');
            let tdWats = document.createElement('td');
            let linkWhats = document.createElement('a');
            let imgWhats = document.createElement('img');

            tdName.textContent = myContacts[i].name;
            tdTel.textContent = myContacts[i].tel;
            tdEmail.textContent = myContacts[i].email;
            tdAddress.textContent = myContacts[i].address;
            imgWhats.src = './assets/images/whatsapp.png';
            linkWhats.href = `https://api.whatsapp.com/send?phone=${(myContacts[i].tel)}`;
            linkWhats.target = '_blank';

            tr.appendChild(tdName);
            tr.appendChild(tdTel);
            tr.appendChild(tdEmail);
            tr.appendChild(tdAddress);
            tr.appendChild(tdWats).appendChild(linkWhats).appendChild(imgWhats);
            tableBody.append(tr);

            const noContacts = document.getElementById("no-contacts");
            noContacts.style.display = 'none'
        };
    } else {
        tableBody.parentElement.style.display = 'none';
    }
}

populateTable();