
export class Kerucut {
    constructor(jariJari, tinggi) {
        if (jariJari <= 0 || tinggi <= 0) {
            throw new Error('Jari-jari dan tinggi harus lebih besar dari 0');
        }
        this.jariJari = jariJari;
        this.tinggi = tinggi;
    }

    hitungVolume() {
        return (1/3) * Math.PI * this.jariJari * this.jariJari * this.tinggi;
    }

    hitungLuas() {
        // Luas permukaan kerucut = πr² + πrs
        // s = garis pelukis = √(r² + t²)
        const garisPelukis = Math.sqrt(this.jariJari * this.jariJari + this.tinggi * this.tinggi);
        const luasAlas = Math.PI * this.jariJari * this.jariJari;
        const luasSelimut = Math.PI * this.jariJari * garisPelukis;
        return luasAlas + luasSelimut;
    }
}