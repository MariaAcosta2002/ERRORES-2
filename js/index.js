const BaseDeDatos = [
    {
        id: 'a',
        nombre: "Juan",
        apellido: "Perez",
        edad: 66,
        profesion: "Ing Mecanico"
    },
    {
        id: 2,
        nombre: "Sofía",
        apellido: "Rodríguez",
        edad: 22,
        profesion: "Lic Marketing Digital"
    },
    {
        id: 3,
        nombre: "Mariana",
        apellido: "García",
        edad: 33,
        profesion: "Ing Sistemas Computacionales"
    },
    {
        id: 4,
        nombre: null,
        apellido: "Martínez",
        edad: 18,
        profesion: "Ing Industrial"
    },
    {
        id: 5,
        nombre: "Valentina",
        apellido: "Gómez",
        edad: 26,
        profesion: "Lic Derecho"
    },
    {
        id: 6,
        nombre: "Alejandro",
        apellido: "Flores",
        edad: 17,
        // Profesión faltante en este registro
    },
];

class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class PropertyNotFoundError extends CustomError {
    constructor(property) {
        super(`La propiedad '${property}' no existe.`);
        this.property = property;
    }
}

class InvalidIDError extends CustomError {
    constructor() {
        super('El ID debe ser un número.');
    }
}

class NullNameError extends CustomError {
    constructor() {
        super('El nombre no puede ser null.');
    }
}

class MissingPropertyError extends CustomError {
    constructor(property) {
        super(`El registro no tiene la propiedad '${property}'.`);
        this.property = property;
    }
}

document.getElementById('consultaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const idInput = document.getElementById('idInput').value;
    const resultadoDiv = document.getElementById('resultado');
    const errorDiv = document.getElementById('error');

    resultadoDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    try {
        try {
            if (isNaN(idInput)) {
                throw new InvalidIDError();
            }
        } catch (error) {
            throw new CustomError(error.message + ' Por favor, ingrese un ID válido.');
        }

        let registro;
        try {
            registro = BaseDeDatos.find(item => item.id === parseInt(idInput));
            if (!registro) {
                throw new PropertyNotFoundError('ID');
            }
        } catch (error) {
            throw error;
        }

        try {
            if (registro.nombre === null) {
                throw new NullNameError();
            }
        } catch (error) {
            throw error;
        }

        try {
            if (!registro.hasOwnProperty('profesion')) {
                throw new MissingPropertyError('profesion');
            }
        } catch (error) {
            throw error;
        }

        resultadoDiv.innerHTML = `
            <p>ID: ${registro.id}</p>
            <p>Nombre: ${registro.nombre}</p>
            <p>Apellido: ${registro.apellido}</p>
            <p>Edad: ${registro.edad}</p>
            <p>Profesión: ${registro.profesion || 'No especificado'}</p>
        `;
    } catch (error) {
        if (error instanceof CustomError) {
            errorDiv.innerHTML = error.message;
        } else {
            errorDiv.innerHTML = '<p>Error desconocido.</p>';
        }
    }
});
