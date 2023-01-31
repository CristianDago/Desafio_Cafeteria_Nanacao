const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Obteniendo un 200 y un Objeto", async () => {
        const resultado = await request(server).get("/cafes").send();
        const status = resultado.statusCode;
    
        expect(status).toBe(200);
        expect(resultado.body).toBeInstanceOf(Object);
        });

    it('Obteniendo un 404, elimando un producto con un id que no existe', async () => {
        const jwt = 'token';
        const idDeProductoAEliminar = 5;
        const resultado = await request(server)
        .delete(`/cafes/${idDeProductoAEliminar}`)
        .set("Authorization", jwt)
        .send();

        expect(resultado.statusCode).toBe(404);
    });  
    
    it("Enviando un nuevo producto con status 201", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Nuevo producto" };
        const resultado = await request(server).post('/cafes').send(cafe);

        expect(resultado.statusCode).toBe(201);
        expect(resultado.body).toContainEqual(cafe);
       });


    it('Obteniendo un 400, al actualizar un producto', async () => {
        const id = 1
        const payload = {
          id: 4,
          nombre: "Cappuccino"
        }
        const resultado = await request(server).put(`/cafes/${id}`).send(payload);

        expect(resultado.statusCode).toBe(400);
      });

});



