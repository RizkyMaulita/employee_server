const convertRupiah = (price) => {
  const numberString = price.toString()
  const sisa = numberString.length % 3
  var rupiah = numberString.substr(0, sisa)
  const ribuan = numberString.substr(sisa).match(/\d{3}/g)
  if (ribuan) {
    const separator = sisa ? "." : ""
    rupiah += separator + ribuan.join(".")
  }
  return rupiah
}

module.exports = {
  convertRupiah
}