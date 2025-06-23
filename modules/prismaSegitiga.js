
export class PrismaSegitiga {
    constructor(alasSegitiga, tinggiSegitiga, tinggiPrisma) {
        if (alasSegitiga <= 0 || tinggiSegitiga <= 0 || tinggiPrisma <= 0) {
            throw new Error('Semua ukuran harus lebih besar dari 0');
        }
        this.alasSegitiga = alasSegitiga;
        this.tinggiSegitiga = tinggiSegitiga;
        this.tinggiPrisma = tinggiPrisma;
    }

    hitungVolume() {
        const luasAlas = 0.5 * this.alasSegitiga * this.tinggiSegitiga;
        return luasAlas * this.tinggiPrisma;
    }

    hitungLuas() {
        // Luas permukaan = 2 × luas alas + keliling alas × tinggi prisma
        const luasAlas = 0.5 * this.alasSegitiga * this.tinggiSegitiga;
        
        // Untuk segitiga siku-siku, hitung sisi miring
        const sisiMiring = Math.sqrt(this.alasSegitiga * this.alasSegitiga + 
                                   this.tinggiSegitiga * this.tinggiSegitiga);
        const kelilingAlas = this.alasSegitiga + this.tinggiSegitiga + sisiMiring;
        
        return 2 * luasAlas + kelilingAlas * this.tinggiPrisma;
    }
}