function PMT(ir, np, pv, fv, type) {
    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0) return -(pv + fv) / np;

    var pvif = Math.pow(1 + ir, np);
    var pmt = -ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1) pmt /= (1 + ir);

    return pmt;
}

function calculate() {
    var annualRate = parseFloat(document.getElementById('annualRate').value);
    var numPeriods = parseInt(document.getElementById('numPeriods').value);
    var presentValue = parseFloat(document.getElementById('presentValue').value);
    var paymentType = document.getElementById('paymentType').value;
    var tableType = document.getElementById('tableType').value;

    var r, t;

    if (paymentType === 'Monthly') {
        r = (annualRate / 12) / 100;
        t = numPeriods;
    } else if (paymentType === 'Quarterly') {
        r = (annualRate / 4) / 100;
        t = (numPeriods / 12) * 4;
    } else if (paymentType === 'HalfYearly') {
        r = (annualRate / 2) / 100;
        t = (numPeriods / 12) * 2;
    }

    if (tableType === 'EMI') {
        var emi = PMT(r, t, presentValue, 0, 0);
        emi = Math.abs(emi);
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').innerHTML = 'Your EMI is: ' + emi.toFixed(2);
        generateEMITable(r, t, presentValue, emi);
    } else if (tableType === 'Bullet') {
        generateBulletTable(r, t, presentValue);
    } else if (tableType === 'EqualPrincipal') {
        generateEqualPrincipalTable(r, t, presentValue);
    }
}

// emi amort table
function generateEMITable(r, t, p, emi) {
    var table = document.getElementById('emiTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    var blb = p;

    for (var i = 1; i <= t; i++) {
        var payment = emi;
        var interest = blb * r;
        var principal = payment - interest;
        var ending_balance = blb - principal;

        var row = table.insertRow();
        row.insertCell(0).innerHTML = i;
        row.insertCell(1).innerHTML = blb.toFixed(2);
        row.insertCell(2).innerHTML = payment.toFixed(2);
        row.insertCell(3).innerHTML = interest.toFixed(2);
        row.insertCell(4).innerHTML = principal.toFixed(2);
        row.insertCell(5).innerHTML = ending_balance.toFixed(2);
        row.insertCell(6).innerHTML = (-emi).toFixed(2);

        blb = ending_balance;
    }

    document.getElementById('emiTable').style.display = 'table';
}


// bullet payment
function generateBulletTable(r, t, p) {
    var table = document.getElementById('emiTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    var blb = p;

    for (var i = 0; i <= t; i++) {
        var interest = blb * r;
        var principal = (i === t) ? blb : 0;
        var payment = interest + principal;
        var ending_balance = blb - principal;

        var row = table.insertRow();
        row.insertCell(0).innerHTML = i;
        row.insertCell(1).innerHTML = blb.toFixed(2);
        row.insertCell(2).innerHTML = payment.toFixed(2);
        row.insertCell(3).innerHTML = interest.toFixed(2);
        row.insertCell(4).innerHTML = principal.toFixed(2);
        row.insertCell(5).innerHTML = ending_balance.toFixed(2);
        row.insertCell(6).innerHTML = (-payment).toFixed(2);

        blb = ending_balance;
    }

    document.getElementById('emiTable').style.display = 'table';
}


// equal principal table
function generateEqualPrincipalTable(r, t, p) {
    var table = document.getElementById('emiTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    var blb = p;
    var principal_payment = p / t;

    for (var i = 1; i <= t; i++) {
        var interest = blb * r;
        var payment = interest + principal_payment;
        var ending_balance = blb - principal_payment;

        var row = table.insertRow();
        row.insertCell(0).innerHTML = i;
        row.insertCell(1).innerHTML = blb.toFixed(2);
        row.insertCell(2).innerHTML = payment.toFixed(2);
        row.insertCell(3).innerHTML = interest.toFixed(2);
        row.insertCell(4).innerHTML = principal_payment.toFixed(2);
        row.insertCell(5).innerHTML = ending_balance.toFixed(2);
        row.insertCell(6).innerHTML = (-payment).toFixed(2);

        blb = ending_balance;
    }

    document.getElementById('emiTable').style.display = 'table';
}