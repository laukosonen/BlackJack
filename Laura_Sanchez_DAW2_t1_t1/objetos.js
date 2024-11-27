class carta {
  imagen;
  valor;

  constructor(representacion) {
    this.imagen = `./images/images/${representacion}.png`;
    let valorString = representacion.substring(0, representacion.length - 1);
    if (valorString == "A") {
      this.valor = Number(1);
    } else if (valorString == "J" || valorString == "Q" || valorString == "K") {
      this.valor = Number(11);
    } else {
      this.valor = Number(valorString);
    }
  }
}
