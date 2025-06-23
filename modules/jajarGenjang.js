
export class JajarGenjang {
    constructor(alas, tinggi, sisiMiring = 0) {
        if (alas <= 0 || tinggi <= 0) {
            throw new Error('Alas dan tinggi harus lebih besar dari 0');
        }
        this.alas = alas;
        this.tinggi = tinggi;
        this.sisiMiring = sisiMiring;
    }

    hitungLuas() {
        return this.alas * this.tinggi;
    }

    hitungKeliling() {
        // Jika sisi miring tidak diberikan, hitung menggunakan Pythagoras
        const sisiMiring = this.sisiMiring > 0 ? this.sisiMiring : 
                          Math.sqrt(this.tinggi * this.tinggi + (this.alas * 0.5) * (this.alas * 0.5));
        return 2 * (this.alas + sisiMiring);
    }
}