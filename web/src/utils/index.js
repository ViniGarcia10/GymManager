module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() <= birthDate.getDate())) {
      return (age = age - 1);
    }

    return age;
  },

  date: function(timestamp) {
    const date = new Date(timestamp);

    // yyyy
    const year = date.getUTCFullYear();

    // mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    // dd
    const day = `0${date.getUTCDate()}`.slice(-2);

    // return yyyy-mm-dd
    return `${year}-${month}-${day}`;
  },

  birthFormat: function(timestamp) {
    const date = new Date(timestamp);

    let meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    // mm
    let month = '';

    for (let index = 0; index < meses.length; index++) {
      if (meses.indexOf(meses[index]) == date.getUTCMonth()) {
        month = meses[index];
      }
    }

    // dd
    const day = `0${date.getUTCDate()}`.slice(-2);

    // return dia de mes
    return ` Dia ${day} de ${month}`;
  },

  bloodFormat: function(blood) {
    let typeBlood = blood;

    switch (typeBlood) {
      case 'O1':
        return 'O+';

      case 'O0':
        return 'O-';

      case 'B0':
        return 'B-';

      case 'B1':
        return 'B+';

      case 'AB0':
        return 'AB-';

      case 'AB1':
        return 'AB+';

      case 'A1':
        return 'A+';

      case 'A0':
        return 'A-';

      default:
        return 'Não encontrado :(';
    }
  },

  datePt: function(timestamp) {
    const date = new Date(timestamp);

    // yyyy
    const year = date.getUTCFullYear();

    // mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    // dd
    const day = `0${date.getUTCDate()}`.slice(-2);

    // return yyyy-mm-dd
    return `${day}/${month}/${year}`;
  },
};
