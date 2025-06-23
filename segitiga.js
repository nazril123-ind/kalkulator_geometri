export class Segitiga {
  constructor(...args) {
    if (args.length === 2) {
      const [alas, tinggi] = args;

      if (alas <= 0 || tinggi <= 0) {
        throw new Error("❌ Alas dan Tinggi harus lebih dari 0 untuk menghitung luas.");
      }

      this.alas = alas;
      this.tinggi = tinggi;

    } else if (args.length === 3) {
      const [sisiA, sisiB, sisiC] = args;

      if (sisiA <= 0 || sisiB <= 0 || sisiC <= 0) {
        throw new Error("❌ Ketiga sisi segitiga harus lebih dari 0 untuk menghitung keliling.");
      }

      this.sisiA = sisiA;
      this.sisiB = sisiB;
      this.sisiC = sisiC;

    } else {
      throw new Error("❌ Jumlah argumen tidak sesuai. Gunakan 2 untuk luas atau 3 untuk keliling.");
    }
  }

  hitungLuas() {
    return 0.5 * this.alas * this.tinggi;
  }

  hitungKeliling() {
    return this.sisiA + this.sisiB + this.sisiC;
  }
}