Vue.filter('doneLabelPay', (value) => value === false ? "Não Paga": "Paga");

Vue.filter('statusBillsPay', (value) => {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return "Não existe(m) conta(s) para pagar";
    } else {
        return value + " conta(s)";
    }
});

Vue.filter('doneLabelReceive', (value) => value === false ? "Não Recebido": "Recebido");

Vue.filter('statusBillsReceive', (value) => {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return "Não existe(m) conta(s)";
    } else {
        return value + " conta(s)";
    }
});

Vue.filter('numberFormat', {
    read(value, locale = 'pt-BR', coin = 'BRL') {
        let number = 0;
        if(value && typeof value !== undefined) {
            let numberRegex = value.toString().match(/\d+(\.{0,1}\d{1,2}){1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        return new Intl.NumberFormat(locale,{
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency',
            currency: coin
        }).format(number);
    },
    write(value){
        let number = 0;
        if(value.length > 0) {
            number = value.replace(/[^\d\,]/g, '')
                .replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read(value, locale) { //Escreve na view
        let dateString = "";
        if(value && typeof value !== undefined) {
            if(!(value instanceof Date)){
                let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                dateString = dateRegex ? dateRegex[0] : dateRegex;
                if(dateString){
                    value = new Date(dateString+"T03:00:00");
                }else {
                    return value;
                }
            }
            return Intl.DateTimeFormat(locale).format(value).split(' ')[0];
        }
        return value;
    },
    write(value){ //Pega o valor da view e converte para o formato do modelo
        let dateRegex= value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if(dateRegex){
            let dateString = dateRegex[0];
            let date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if(!isNaN(date.getTime())){
                return date;
            }
        }
        return value;
    }
});

Vue.filter('nameFormat', {
    read(value) { //Escreve na view
        let nameString = "";
        if(value && typeof value !== undefined) {
            return value.toString().toUpperCase();
        }
        return value;
    },
    write(value){ //Pega o valor da view e converte para o formato do modelo
        return value.toString().toLowerCase();
    }
});