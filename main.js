function autofill() {

    var val = document.getElementById('number').value;
    var newval = '';
    val = val.replace(/\s/g, '');

    for(var i = 0; i < val.length; i++) {
        // add space if modulus of 4 is 0
        if(i%4 == 0 && i > 0) newval = newval.concat(' ');
        // concatenate the new value
        newval = newval.concat(val[i]);
    }

    document.getElementById('number').value = newval;

    const input1 = document.querySelector('.front-input1');
    input1.value = document.getElementById('number').value;

    const input2 = document.querySelector('.front-input2');
    input2.value = document.getElementById('name').value;

    const input4 = document.querySelector('.back-input');
    input4.value = document.getElementById('cvc').value;
}

const month = document.getElementById('month');
const year = document.getElementById('year');

month.addEventListener('keyup', e => {
    if (!isNaN(e.key) && !isNaN(document.getElementById('year').value) && !isNaN(document.getElementById('month').value)) {
        const input3 = document.querySelector('.front-input3');
        input3.value = document.getElementById('month').value + "/" + document.getElementById('year').value;
    }
})

year.addEventListener('keyup', e => {
    if (!isNaN(e.key) && !isNaN(document.getElementById('month').value) && !isNaN(document.getElementById('year').value)) {
        const input3 = document.querySelector('.front-input3');
        input3.value = document.getElementById('month').value + "/" + document.getElementById('year').value;
    }
})

const form1 = document.getElementById('form-1');
const form2 = document.getElementById('form-2');
const name2 = document.getElementById('name');
const number = document.getElementById('number');
const cvc = document.getElementById('cvc');

let i = 0;

form1.addEventListener('submit', e => {
    e.preventDefault();
    let num = /(\d{4}\s){3}\d{4}/.test(number.value);

    if (!name2.value || !/\S/.test(name2.value)) {
        error(name2, "can't be blank");
    } else {
        removeE(name2);
        i = 1;
    }

    if (number.value === '') {
        error(number, "can't be blank");
    } else if (!num) {
        error(number, "Wrong format");
    } else {
        removeE(number);
        if (i === 1) {
            i = 2;
        }
    }


    const d = new Date();

    if(!month.value || !/\S/.test(month.value)) {
        removeE2(year);
        error2(month, "can't be blank");
    } else if (month.value < 1 || month.value > 12 || /\D/.test(month.value)) {
        removeE2(year);
        error2(month, "Wrong format");
    } else if (year.value == (d.getFullYear() - 2000) && (month.value <= d.getMonth())) {
        removeE2(year);
        error2(month, "Card expired")
    } else if (!year.value || !/\S/.test(year.value)) {
        removeE2(month);
        error2(year, "can't be blank");
    } else if (year.value < 1 || /\D/.test(year.value)) {
        removeE2(month);
        error2(year, "Wrong format");
    } else if (year.value < (d.getFullYear() - 2000) ){
        removeE2(month);
        error2(year, "Card expired")
    } else {
        removeE2(month);
        removeE2(year);
        if (i === 2) {
            i = 3;
        }
    }

    if(!cvc.value || !/\S/.test(cvc.value)) {
        error(cvc, "can't be blank");
    } else if (cvc.value < 100 || /\D/.test(cvc.value)) {
        error(cvc, "Wrong format");
    } else {
        removeE(cvc);
        if (i === 3) {
            i = 4;
        }
    }

    if (i === 4) {
        form1.style.display = 'none';
        form2.style.display = 'block';
    }
})

function error(x, y) {
    x.classList.add("error");
    x.nextElementSibling.style.display = 'block';
    x.nextElementSibling.innerHTML = y;
}

function error2(x, y) {
    x.classList.add("error");
    x.parentElement.nextElementSibling.style.display = 'block';
    x.parentElement.nextElementSibling.innerHTML = y;
}

function removeE(x) {
    x.classList.remove("error");
    x.nextElementSibling.style.display = 'none';
}

function removeE2(x) {
    x.classList.remove("error");
    x.parentElement.nextElementSibling.style.display = 'none';
}